import { test, expect } from '@playwright/test';

const enPages = [
  { name: 'home', path: '/en' },
  { name: 'about', path: '/en/about' },
  { name: 'services', path: '/en/services' },
  { name: 'team', path: '/en/team' },
  { name: 'contact', path: '/en/contact' },
] as const;

test.describe('Page content checks (EN locale)', () => {
  for (const { name, path } of enPages) {
    test(`${name} page has a non-empty <title>`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title.trim().length).toBeGreaterThan(0);
    });
  }

  test('home page contains trust bar text', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('text=Headquartered in Hamburg, Germany')).toBeVisible();
  });

  test('services page renders exactly 3 metal cards', async ({ page }) => {
    await page.goto('/en/services');
    // MetalCard renders <article> elements with an inline style attribute (texture background)
    // On the services page all articles are MetalCards
    const metalCards = page.locator('article[style]');
    await expect(metalCards).toHaveCount(3);
  });

  test('team page renders at least 1 team card', async ({ page }) => {
    await page.goto('/en/team');
    // TeamCard renders <article> elements without an inline style attribute
    const teamCards = page.locator('article:not([style])');
    const count = await teamCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('contact page has the contact form present', async ({ page }) => {
    await page.goto('/en/contact');
    // ContactForm renders a <form noValidate>
    const form = page.locator('form[novalidate], form[noValidate]');
    await expect(form).toBeVisible();
    // Required fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('contact page has the address section present', async ({ page }) => {
    await page.goto('/en/contact');
    // The left column contains an "Address" label
    await expect(page.locator('text=Address')).toBeVisible();
  });
});
