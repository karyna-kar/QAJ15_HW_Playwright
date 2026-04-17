import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/hovers page', async () => {
  test('Verify hover method', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.locator('.figure').first().hover();
    expect(page.locator('.figcaption').first()).toBeVisible();
    expect(page.locator('.figcaption').first()).toHaveText(/name: user1/, /View profile/);
  });
});
