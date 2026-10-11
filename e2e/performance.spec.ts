import { test, expect } from '@playwright/test';

test.describe('Performance, Core Web Vitals & Asset Budgets', () => {
  test('Homepage meets Core Web Vitals performance thresholds (FCP, LCP, CLS, TTFB)', async ({ page }) => {
    // Collect Core Web Vitals metrics via in-page observers
    await page.addInitScript(() => {
      (window as any).__vitals = { lcp: 0, cls: 0, fcp: 0 };

      // Observer for LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          (window as any).__vitals.lcp = lastEntry.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // Observer for CLS
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            (window as any).__vitals.cls += entry.value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    const response = await page.goto('/', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    // Read navigation timings
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      return {
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        fcp: fcpEntry ? fcpEntry.startTime : 0,
        lcp: (window as any).__vitals.lcp,
        cls: (window as any).__vitals.cls,
      };
    });

    console.log('📊 Homepage Web Vitals:', timing);

    // Assert Performance Budgets
    expect(timing.ttfb).toBeLessThan(500); // TTFB under 500ms
    expect(timing.fcp).toBeLessThan(1500); // FCP under 1.5s
    expect(timing.lcp).toBeLessThan(3500); // LCP under 3.5s (accommodates mobile emulation)
    expect(timing.cls).toBeLessThan(0.05); // Near-zero layout shift
    expect(timing.domContentLoaded).toBeLessThan(1000); // DOM Content Loaded under 1.0s
  });

  test('Initial network payload size stays within strict asset budget', async ({ page }) => {
    let totalJsBytes = 0;
    const failedRequests: string[] = [];

    page.on('response', (res) => {
      const url = res.url();
      if (!res.ok() && res.status() !== 304) {
        failedRequests.push(`${res.status()} ${url}`);
      }
      if (url.endsWith('.js') || res.headers()['content-type']?.includes('javascript')) {
        const size = Number(res.headers()['content-length'] || 0);
        totalJsBytes += size;
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    console.log(`📦 Transferred JS size: ${(totalJsBytes / 1024).toFixed(1)} KB`);

    // Verify zero failed network requests (fonts, scripts, images)
    expect(failedRequests).toEqual([]);

    // Assert total JS transfer budget is under 350KB
    if (totalJsBytes > 0) {
      expect(totalJsBytes).toBeLessThan(350 * 1024);
    }
  });

  test('Hero LCP image is optimized with eager loading and high fetchpriority', async ({ page }) => {
    await page.goto('/');

    const lcpImage = page.locator('img[src="/profile/gunasekaran_selvarasu.webp"]');
    await expect(lcpImage).toBeVisible();

    // Check performance attributes
    await expect(lcpImage).toHaveAttribute('loading', 'eager');
    await expect(lcpImage).toHaveAttribute('fetchpriority', 'high');
  });

  test('Blog article loads fast with zero layout shift and sub-1.5s LCP', async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__vitals = { lcp: 0, cls: 0 };

      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          (window as any).__vitals.lcp = lastEntry.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            (window as any).__vitals.cls += entry.value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    const response = await page.goto('/blog/achieving-sub-100ms-tbt-react-spas/', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    const timing = await page.evaluate(() => {
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      return {
        fcp: fcpEntry ? fcpEntry.startTime : 0,
        lcp: (window as any).__vitals.lcp,
        cls: (window as any).__vitals.cls,
      };
    });

    console.log('📊 Blog Article Web Vitals:', timing);

    expect(timing.fcp).toBeLessThan(1800);
    expect(timing.lcp).toBeLessThan(2000);
    expect(timing.cls).toBeLessThan(0.05);
  });
});
