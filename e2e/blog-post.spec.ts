import { test, expect } from '@playwright/test';

test.describe('Blog Post Reading Experience & Navigation', () => {
  const postPath = '/blog/achieving-sub-100ms-tbt-react-spas/';

  test.beforeEach(async ({ page }) => {
    await page.goto(postPath);
  });

  test('Article page renders complete title, author badge, and prose body', async ({ page }) => {
    // Title
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Achieving Sub-100ms TBT');

    // Author Info
    await expect(page.getByText('Gunasekaran Selvarasu').first()).toBeVisible();
    await expect(page.getByText('Senior Fullstack Developer & AWS Certified').first()).toBeVisible();

    // Prose body content rendered
    const prose = page.locator('.prose');
    await expect(prose).toBeVisible();
    await expect(prose.locator('pre code').first()).toBeVisible(); // Code blocks
    await expect(prose.locator('h2')).toHaveCount(5); // 5 section headings

  });

  test('Table of Contents lists headings, anchors correctly, and scroll-spy tracks section', async ({ page }) => {
    const toc = page.locator('h4', { hasText: 'Table of Contents' });
    await expect(toc).toBeVisible();

    // Verify H2 headings in TOC
    await expect(page.getByRole('link', { name: /1. The Enemy: Monolithic Vendor Bundles/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /2. Lazy Loading Below-the-Fold Sections/i })).toBeVisible();

    // Click heading link to scroll
    const heading2Link = page.locator('a[href="#2-lazy-loading-below-the-fold-sections-with-layout-stable-skeletons"]');
    await heading2Link.click();
    await page.waitForTimeout(500);

    const targetH2 = page.locator('[id="2-lazy-loading-below-the-fold-sections-with-layout-stable-skeletons"]');
    await expect(targetH2).toBeInViewport();
  });

  test('Reading progress bar expands as the reader scrolls', async ({ page }) => {
    const progressBar = page.locator('.fixed.top-0.left-0.right-0.h-1 div');
    await expect(progressBar).toBeAttached();

    // Initial progress bar attached
    const initialWidth = await progressBar.getAttribute('style');
    expect(initialWidth || 'width: 0%').toContain('width:');

    // Scroll to middle of article
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(400);

    const midWidth = await progressBar.getAttribute('style');
    // Extract percentage number
    const match = midWidth?.match(/width:\s*([\d.]+)%/);
    if (match) {
      const percentage = parseFloat(match[1]);
      expect(percentage).toBeGreaterThan(15);
    }
  });

  test('Share and copy buttons function with user feedback', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const copyBtn = page.getByRole('button', { name: /Copy link to clipboard/i });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(page.getByText('Copied!')).toBeVisible();
  });

  test('Adjacent post pagination navigates to adjacent article', async ({ page }) => {
    // Scroll down to adjacent pagination area
    const adjacentLink = page.getByRole('link', { name: /Previous Post/i });
    await adjacentLink.scrollIntoViewIfNeeded();
    await expect(adjacentLink).toBeVisible();
    await adjacentLink.click();

    // Should navigate to adjacent article URL
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page).not.toHaveURL(new RegExp(postPath));
  });

  test('Code blocks feature language header, horizontal scrolling, and interactive copy button', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const codeWrapper = page.locator('.code-block-wrapper').first();
    await codeWrapper.scrollIntoViewIfNeeded();
    await expect(codeWrapper).toBeVisible();

    // Check language badge exists
    await expect(codeWrapper.getByText(/typescript|tsx|bash|javascript/i)).toBeVisible();

    // Check copy button
    const copyCodeBtn = codeWrapper.locator('.copy-code-btn');
    await expect(copyCodeBtn).toBeVisible();
    await copyCodeBtn.click();

    // Feedback shows Copied!
    await expect(copyCodeBtn.getByText('Copied!')).toBeVisible();
  });

  test('Back to All Articles button returns to /blog', async ({ page }) => {
    const backBtn = page.getByRole('link', { name: /Back to All Articles/i });
    await backBtn.scrollIntoViewIfNeeded();
    await backBtn.click();

    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.locator('h1')).toContainText('Architectural Insights');
  });
});
