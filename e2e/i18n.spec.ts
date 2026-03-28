import { test, expect } from '@playwright/test';

const locales = ['en', 'de', 'zh', 'ar'] as const;
const paths = ['', '/about', '/services', '/team', '/contact'] as const;

test.describe('i18n — language switching and locale attributes', () => {
  test('language switcher on /en/about navigates to /de/about when DE is clicked', async ({ page }) => {
    await page.goto('/en/about');
    // Click the "DE" button in the nav-variant language switcher
    await page.locator('button[aria-label="Switch to Deutsch"]').first().click();
    await page.waitForURL('**/de/about');
    expect(page.url()).toContain('/de/about');
  });

  test('Arabic locale sets dir="rtl" on html element', async ({ page }) => {
    await page.goto('/ar');
    const dir = await page.locator('html').getAttribute('dir');
    expect(dir).toBe('rtl');
  });

  test('Chinese locale sets lang="zh" on html element', async ({ page }) => {
    await page.goto('/zh');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('zh');
  });

  for (const locale of locales) {
    for (const path of paths) {
      const url = `/${locale}${path || ''}`;
      test(`${url} returns HTTP 200`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
      });
    }
  }
});
