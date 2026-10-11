import { test, expect } from '@playwright/test';

test.describe('Homepage Functionality & Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero section renders complete branding, avatar, and metrics', async ({ page }) => {
    // Check main headline
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Senior Fullstack Developer');

    // Check Metrics (exact match inside #about)
    const heroSection = page.locator('#about');
    await expect(heroSection.getByText('5+ Years', { exact: true })).toBeVisible();
    await expect(heroSection.getByText('15+ Projects', { exact: true })).toBeVisible();
    await expect(heroSection.getByText('Cloud Practitioner', { exact: true })).toBeVisible();

    // Check Avatar Profile Image
    const profileImg = page.locator('img[src="/profile/gunasekaran_selvarasu.webp"]');
    await expect(profileImg).toBeVisible();
  });

  test('Hero CTA buttons scroll to proper page anchors', async ({ page }) => {
    // Click View Featured Work
    const viewWorkBtn = page.getByRole('button', { name: /View Featured Work/i });
    await expect(viewWorkBtn).toBeVisible();
    await viewWorkBtn.click();
    await page.waitForTimeout(1000);

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();

    // Click Get in Touch
    const contactBtn = page.getByRole('button', { name: /Get in Touch with Gunasekaran/i });
    await expect(contactBtn).toBeVisible();
    await contactBtn.click();
    await page.waitForTimeout(1000);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('Skills section displays key competencies', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();

    await expect(skillsSection.getByText('React.js', { exact: true }).first()).toBeVisible();
    await expect(skillsSection.getByText('Next.js (SSR)', { exact: true }).first()).toBeVisible();
    await expect(skillsSection.getByText('TypeScript', { exact: true }).first()).toBeVisible();
    await expect(skillsSection.getByText('MongoDB', { exact: true }).first()).toBeVisible();
  });

  test('Experience section expands and collapses position details', async ({ page }) => {
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();

    // The first item (Doodleblue) is expanded by default
    await expect(page.getByText('Doodleblue Innovations')).toBeVisible();
    await expect(page.getByText('Headed full-stack squads')).toBeVisible();

    // Click second item (W2S Solutions) to expand
    const w2sButton = page.getByRole('button', { name: /Software Developer at W2S Solutions/i });
    if (await w2sButton.isVisible()) {
      await w2sButton.click();
      await expect(page.getByText('Architected full-featured cloud SaaS applications')).toBeVisible();
    }
  });

  test('Projects section filters projects dynamically by category', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Initially all projects are shown
    await expect(projectsSection.getByText('Asian School of Business (ASB)')).toBeVisible();

    // Filter by E-Commerce button
    const ecommerceBtn = projectsSection.getByRole('button', { name: 'E-Commerce', exact: true });
    await ecommerceBtn.click();
    await page.waitForTimeout(300);

    await expect(projectsSection.getByText('Sofa33 Customizer')).toBeVisible();
    await expect(projectsSection.getByText('Asian School of Business (ASB)')).not.toBeVisible();

    // Filter back to All
    const allBtn = projectsSection.getByRole('button', { name: 'All', exact: true });
    await allBtn.click();
    await page.waitForTimeout(300);

    await expect(projectsSection.getByText('Asian School of Business (ASB)')).toBeVisible();
  });

  test('Contact section handles email copying and form input interactions', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Test Copy Email Card
    const copyEmailCard = contactSection.locator('[aria-label*="Click to copy email address"]');
    await expect(copyEmailCard).toBeVisible();
    await copyEmailCard.click();

    // Verify copy state triggers checkmark feedback icon
    await expect(copyEmailCard.locator('svg.text-emerald-400')).toBeVisible();

    // Test Form Inputs
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');

    await nameInput.fill('Alex Johnson');
    await emailInput.fill('alex@example.com');
    await messageInput.fill('Looking forward to discussing a fullstack Next.js project.');

    await expect(nameInput).toHaveValue('Alex Johnson');
    await expect(emailInput).toHaveValue('alex@example.com');

    // Click security verification button to trigger reCAPTCHA container
    const secButton = contactSection.getByRole('button', { name: /Click to activate reCAPTCHA security verification/i });
    if (await secButton.isVisible()) {
      await secButton.click();
      await expect(page.locator('.g-recaptcha, iframe[src*="recaptcha"], [class*="recaptcha"]')).toBeAttached();
    }
  });
});
