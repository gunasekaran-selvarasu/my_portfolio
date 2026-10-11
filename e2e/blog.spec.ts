import { test, expect } from '@playwright/test';

test.describe('Blog Directory & Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/');
  });

  test('Blog listing page renders header, breadcrumbs, and featured post', async ({ page }) => {
    // Header & Subtitle
    await expect(page.locator('h1')).toContainText('Architectural Insights & Technical Deep Dives');

    // Breadcrumb
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();

    // Featured Post Card
    await expect(page.getByText('Featured Post')).toBeVisible();

    // Articles grid has posts
    const articles = page.locator('article');
    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('Breadcrumb navigation returns to homepage', async ({ page }) => {
    const homeBreadcrumb = page.locator('nav[aria-label="Breadcrumb"]').getByRole('link', { name: 'Home' });
    await homeBreadcrumb.click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toContainText('Senior Fullstack Developer');
  });

  test('Category filter pills dynamically filter posts', async ({ page }) => {
    // Check Frontend Performance category
    const frontendPill = page.getByRole('button', { name: 'Frontend Performance' });
    await frontendPill.click();
    await page.waitForTimeout(300);

    await expect(page.getByText('Achieving Sub-100ms TBT and 99+ Lighthouse Scores')).toBeVisible();
    await expect(page.getByText('Architecting Resilient PostgreSQL')).not.toBeVisible();

    // Reset back to All
    const allPill = page.getByRole('button', { name: 'All' });
    await allPill.click();
    await page.waitForTimeout(300);

    await expect(page.getByText('Architecting Resilient PostgreSQL')).toBeVisible();
  });

  test('Search input filters posts dynamically and handles empty results', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search articles or tags...');
    await expect(searchInput).toBeVisible();

    // Search for PostgreSQL
    await searchInput.fill('PostgreSQL');
    await page.waitForTimeout(400);

    await expect(page.getByText('Architecting Resilient PostgreSQL Connection Pools')).toBeVisible();
    await expect(page.getByText('Achieving Sub-100ms TBT')).not.toBeVisible();

    // Search for non-existent keyword
    await searchInput.fill('xyzUnmatchedSearchTerm999');
    await page.waitForTimeout(300);

    await expect(page.getByText('No articles found')).toBeVisible();

    // Click Reset filters
    const resetBtn = page.getByRole('button', { name: 'Reset filters' });
    await resetBtn.click();
    await page.waitForTimeout(300);

    await expect(searchInput).toHaveValue('');
    await expect(page.getByText('Architecting Resilient PostgreSQL')).toBeVisible();
  });

  test('Clicking a blog post card navigates to the article', async ({ page }) => {
    const postLink = page.getByRole('link', { name: /Achieving Sub-100ms TBT/i }).first();
    await postLink.click();

    await expect(page).toHaveURL(/\/blog\/achieving-sub-100ms-tbt-react-spas\/?$/);
    await expect(page.locator('h1')).toContainText('Achieving Sub-100ms TBT');
  });
});
