import { test, expect } from '@playwright/test';

test.describe('Visual UI Regression Snapshots', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations to guarantee stable, deterministic snapshots
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('Homepage visual snapshot matches design baseline', async ({ page, isMobile }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500); // Allow fonts and glass cards to settle

    const deviceName = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({
      path: `test-results/screenshots/homepage-${deviceName}.png`,
      fullPage: false,
    });

    await expect(page).toHaveScreenshot(`homepage-${deviceName}.png`, {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('Blog directory visual snapshot matches design baseline', async ({ page, isMobile }) => {
    await page.goto('/blog/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const deviceName = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({
      path: `test-results/screenshots/blog-list-${deviceName}.png`,
      fullPage: false,
    });

    await expect(page).toHaveScreenshot(`blog-list-${deviceName}.png`, {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('Blog article visual snapshot matches design baseline', async ({ page, isMobile }) => {
    await page.goto('/blog/achieving-sub-100ms-tbt-react-spas/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const deviceName = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({
      path: `test-results/screenshots/blog-article-${deviceName}.png`,
      fullPage: false,
    });

    await expect(page).toHaveScreenshot(`blog-article-${deviceName}.png`, {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('404 error page visual snapshot matches design baseline', async ({ page, isMobile }) => {
    await page.goto('/404.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const deviceName = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({
      path: `test-results/screenshots/404-${deviceName}.png`,
      fullPage: false,
    });

    await expect(page).toHaveScreenshot(`404-${deviceName}.png`, {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });
});
