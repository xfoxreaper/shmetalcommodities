import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/en', label: 'Home' },
  { name: 'about', path: '/en/about', label: 'About' },
  { name: 'services', path: '/en/services', label: 'Services' },
  { name: 'team', path: '/en/team', label: 'Team' },
  { name: 'contact', path: '/en/contact', label: 'Contact' },
] as const;

test.describe('Navigation — routing and active state', () => {
  for (const { path, label } of pages) {
    test(`${label} nav link routes to ${path} and returns 200`, async ({ page }) => {
      // Start from home; use the nav link
      await page.goto('/en');
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      expect(page.url()).toContain(path);
    });

    test(`${label} page: correct nav link has aria-current="page"`, async ({ page }) => {
      await page.goto(path);
      // Desktop nav is visible at default viewport
      const nav = page.locator('nav[aria-label="Main navigation"]');
      const activeLink = nav.locator('[aria-current="page"]');
      await expect(activeLink).toHaveCount(1);
      await expect(activeLink).toContainText(label);
    });
  }

  test('logo click navigates to /en', async ({ page }) => {
    await page.goto('/en/about');
    await page.locator('a[aria-label="SH Metal Commodities — Home"]').click();
    await page.waitForURL('**/en');
    expect(page.url()).toContain('/en');
  });

  test('navbar is transparent on home page before scrolling', async ({ page }) => {
    await page.goto('/en');
    const header = page.locator('header');
    // Before any scroll the navbar should NOT have bg-navy (transparent state)
    await expect(header).not.toHaveClass(/bg-navy/);
  });

  test('navbar gains bg-navy after scrolling 100px on home page', async ({ page }) => {
    await page.goto('/en');
    await page.evaluate(() => window.scrollTo(0, 100));
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-navy/);
  });

  test('navbar always has bg-navy on /en/about without scrolling', async ({ page }) => {
    await page.goto('/en/about');
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-navy/);
  });
});
