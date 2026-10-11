import { test, expect } from '@playwright/test';

test.describe('Global Navigation & Menu Interactions', () => {
  test('Header transitions styling upon page scroll', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');

    // Initially transparent or un-scrolled
    await expect(header).toBeVisible();

    // Scroll down 200px
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);

    // Verify scrolled header backdrop blur style applied
    await expect(header).toHaveClass(/backdrop-blur/);
  });

  test('Desktop navigation routes to Blog and cross-page anchor scrolling', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation only');

    await page.goto('/');

    // Click Blog in header
    const blogNav = page.locator('nav[aria-label="Desktop Main Navigation"]').getByRole('link', { name: 'Blog' });
    await blogNav.click();

    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.locator('h1')).toContainText('Architectural Insights');

    // Click Contact while on /blog to test cross-page anchor routing
    const contactNav = page.locator('nav[aria-label="Desktop Main Navigation"]').getByRole('link', { name: 'Contact' });
    await contactNav.click();

    await expect(page).toHaveURL(/\/#contact$/);
    await page.waitForTimeout(600);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('Logo click scrolls to top on homepage and routes home from subpages', async ({ page }) => {
    // 1. On homepage: scroll down and click logo -> scrolls top
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
    await page.waitForTimeout(300);

    const logo = page.locator('a[aria-label="Gunasekaran Selvarasu Portfolio Homepage"]');
    await logo.click();

    // Smooth scroll can take a few frames
    await expect.poll(async () => page.evaluate(() => window.scrollY), {
      timeout: 3000,
      intervals: [100, 200, 300],
    }).toBeLessThan(100);

    // 2. On /blog: click logo -> navigates to /
    await page.goto('/blog');
    await logo.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('Mobile drawer menu opens, navigates, and responds to Escape key', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile drawer menu only');

    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Toggle navigation menu"]');
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    const mobileNav = page.locator('#mobile-menu');
    await expect(mobileNav).toBeVisible();

    // Close on Escape key
    await page.keyboard.press('Escape');
    await expect(mobileNav).not.toBeVisible();

    // Reopen and navigate to Blog
    await menuButton.click();
    await expect(mobileNav).toBeVisible();

    const blogLink = mobileNav.getByRole('link', { name: 'Blog' });
    await blogLink.click();

    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(mobileNav).not.toBeVisible();
  });
});
