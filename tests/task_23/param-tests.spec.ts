import { test, expect } from '@playwright/test';

const pages = ['/inventory.html', '/cart.html', '/checkout-step-one.html'];

test.describe('', async () => {
  pages.forEach(element => {
    test(`Verify logo on https://www.saucedemo.com${element} page`, async ({ page }) => {
      await page.goto(`https://www.saucedemo.com${element}`);
      expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    });
  });
});
