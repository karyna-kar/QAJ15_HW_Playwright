import { test, expect } from '@playwright/test';
import { cartPageSelectors } from '../../helpers/selectors';

test.describe('', async () => {
  test.skip('Verify cart count logo for authorized user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator(cartPageSelectors.cartList)).toHaveCount(0);
  });

  test('Verify empty cart for authorized user @standard', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const cartContent = await page.evaluate(() => {
      const value = localStorage.getItem('cart-contents');
      return value ? JSON.parse(value) : [];
    });
    expect(cartContent).toHaveLength(0);
  });
});
