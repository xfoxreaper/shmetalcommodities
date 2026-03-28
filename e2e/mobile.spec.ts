import { test, expect } from '@playwright/test';

// All tests run at a 375px mobile viewport
test.use({ viewport: { width: 375, height: 812 } });

test.describe('Mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('hamburger button is visible at mobile width', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Open navigation menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('desktop nav links are hidden at mobile width', async ({ page }) => {
    const desktopNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(desktopNav).toBeHidden();
  });

  test('clicking hamburger opens the mobile menu overlay', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Open navigation menu"]');
    await hamburger.click();
    const overlay = page.locator('[role="dialog"]#mobile-menu');
    await expect(overlay).toBeVisible();
  });

  test('clicking close button hides the mobile menu overlay', async ({ page }) => {
    // Open
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('[role="dialog"]#mobile-menu')).toBeVisible();
    // Close
    await page.locator('button[aria-label="Close navigation menu"]').click();
    await expect(page.locator('[role="dialog"]#mobile-menu')).toBeHidden();
  });

  test('pressing Escape closes the mobile menu overlay', async ({ page }) => {
    await page.locator('button[aria-label="Open navigation menu"]').click();
    const overlay = page.locator('[role="dialog"]#mobile-menu');
    await expect(overlay).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(overlay).toBeHidden();
  });

  test('Tab key cycles focus within overlay without leaving it', async ({ page }) => {
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await expect(page.locator('[role="dialog"]#mobile-menu')).toBeVisible();

    // Tab through all focusable elements; none should be outside the overlay
    const overlay = page.locator('[role="dialog"]#mobile-menu');
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focusedOutsideOverlay = await page.evaluate(() => {
        const focused = document.activeElement;
        const menu = document.getElementById('mobile-menu');
        return focused && menu ? !menu.contains(focused) : false;
      });
      expect(focusedOutsideOverlay).toBe(false);
    }
    // Overlay still visible — focus didn't escape
    await expect(overlay).toBeVisible();
  });
});
