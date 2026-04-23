import { test, expect } from '@playwright/test';

test.describe('', async () => {
  test('Verify logo with global setup', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    expect(page.locator('.app_logo')).toHaveText('Swag Labs');
  });
});
