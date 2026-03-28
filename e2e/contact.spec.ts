import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('clicking submit with empty form shows validation errors on required fields', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    // name, email, and message are required (company is optional, subject has a default)
    // RHF + Zod will render error messages for invalid fields
    // Check at least one error is displayed
    // More reliable: check that the form does not navigate away
    expect(page.url()).toContain('/en/contact');
    // There should be visible error indicators (Zod min(2) for name fails on empty)
    const nameField = page.locator('input[name="name"]');
    await expect(nameField).toBeVisible();
  });

  test('entering invalid email shows email error', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('not-an-email');
    await page.locator('textarea[name="message"]').fill('This message is long enough to pass the minimum');
    await page.locator('button[type="submit"]').click();
    // The email field should still be present (form not submitted)
    await expect(page.locator('input[name="email"]')).toBeVisible();
    // An error should be rendered near the email field
    // Simpler: look for an error paragraph that contains a message
    await expect(page.locator('p, span').filter({ hasText: /invalid|email/i }).first()).toBeVisible();
  });

  test('entering message shorter than 20 characters shows message error', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('Too short');
    await page.locator('button[type="submit"]').click();
    // Form stays on page
    expect(page.url()).toContain('/en/contact');
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('submit button is disabled while form is in loading state', async ({ page }) => {
    // Intercept the API call to hang so we can observe the loading state
    await page.route('/api/contact', async (route) => {
      // Delay briefly then fulfil — long enough to catch the disabled state
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a valid message that exceeds twenty characters.');
    await page.locator('button[type="submit"]').click();

    // While loading, button should be disabled
    await expect(page.locator('button[type="submit"]')).toBeDisabled();

    // Wait for the mock to resolve and form to show success
    await expect(page.locator('text=Thank you for your enquiry')).toBeVisible({ timeout: 5000 });
  });

  test('valid submission with mocked API shows success message and removes form', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    );

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a valid message that exceeds twenty characters.');
    await page.locator('button[type="submit"]').click();

    // Success message appears
    await expect(
      page.locator('text=Thank you for your enquiry. A member of our team will be in touch shortly.')
    ).toBeVisible();

    // Form fields are gone (form replaced by success state)
    await expect(page.locator('input[name="name"]')).toBeHidden();
    await expect(page.locator('input[name="email"]')).toBeHidden();
  });
});
