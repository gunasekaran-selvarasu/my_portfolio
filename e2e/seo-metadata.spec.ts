import { test, expect } from '@playwright/test';

test.describe('SEO, Metadata, Structured Data & Robots/Sitemap', () => {
  test('Homepage has full SEO tags, Open Graph, and Structured Data', async ({ page }) => {
    await page.goto('/');

    // Title & Meta Description
    await expect(page).toHaveTitle(/Gunasekaran Selvarasu – Senior Fullstack Developer/i);
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Senior Fullstack Developer & AWS Certified Practitioner/i);

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://guna.dev/');

    // Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Gunasekaran Selvarasu/i);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.png/);

    // Twitter Card
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    // Structured Data JSON-LD
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const jsonText = await jsonLdScripts.first().textContent();
    expect(jsonText).toBeTruthy();

    const data = JSON.parse(jsonText!);
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph']).toBeDefined();

    const types = data['@graph'].map((item: any) => item['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('ProfilePage');
    expect(types).toContain('Person');
    expect(types).toContain('ItemList');
  });

  test('Blog article has per-post metadata and TechArticle schema', async ({ page }) => {
    await page.goto('/blog/achieving-sub-100ms-tbt-react-spas/');

    // Per-post Title
    await expect(page).toHaveTitle(/Achieving Sub-100ms TBT and 99\+ Lighthouse Scores/i);

    // Per-post Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/guna\.dev\/blog\/achieving-sub-100ms-tbt-react-spas/);

    // TechArticle Structured Data
    const techArticleScript = page.locator('script[type="application/ld+json"]');
    const scriptCount = await techArticleScript.count();
    let foundTechArticle = false;

    for (let i = 0; i < scriptCount; i++) {
      const text = await techArticleScript.nth(i).textContent();
      if (text) {
        try {
          const parsed = JSON.parse(text);
          if (parsed['@type'] === 'TechArticle') {
            foundTechArticle = true;
            expect(parsed.headline).toContain('Achieving Sub-100ms TBT');
            expect(parsed.author.name).toBe('Gunasekaran Selvarasu');
            expect(parsed.datePublished).toBe('2026-01-20');
            break;
          }
        } catch {
          // ignore
        }
      }
    }

    expect(foundTechArticle).toBe(true);
  });

  test('Sitemap.xml is valid XML and contains all routes', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(text).toContain('<urlset');
    expect(text).toContain('https://guna.dev/');
    expect(text).toContain('https://guna.dev/blog');
    expect(text).toContain('https://guna.dev/blog/mastering-aws-cloudfront-nextjs-caching');
    expect(text).toContain('https://guna.dev/blog/resilient-nodejs-postgresql-connection-pooling');
    expect(text).toContain('https://guna.dev/blog/achieving-sub-100ms-tbt-react-spas');
  });

  test('Robots.txt allows crawlers and specifies sitemap URL', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('User-Agent: *');
    expect(text).toContain('Allow: /');
    expect(text).toContain('Sitemap: https://guna.dev/sitemap.xml');
  });

  test('Custom 404 page displays branded error message and navigation links', async ({ page }) => {
    await page.goto('/404.html');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();

    const homeLink = page.getByRole('link', { name: /Back Home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    await expect(page).toHaveURL(/\/$/);
  });
});
