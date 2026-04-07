import { test, expect } from '@playwright/test';
import { loginPageSelectors } from '../helpers/selectors';
import { inventoryPageSelectors } from '../helpers/selectors';
import { cartPageSelectors } from '../helpers/selectors';
import 'dotenv/config';

test.describe('Playwright UI Tests', async () => {
  test.describe('Login Page', async () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
    });

    test('Verify mandatory inputs', async ({ page }) => {
      //using Codegen
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.locator('[data-test="error"]')).toContainText(
        'Epic sadface: Username is required',
      );
    });

    test('Verify login with invalid credentials', async ({ page }) => {
      //using Codegen
      await page.locator('[data-test="username"]').fill('test');
      await page.locator('[data-test="password"]').fill('test');
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.locator('[data-test="error"]')).toContainText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    test('Verify successful login with standard_user', async ({ page }) => {
      await page.locator(loginPageSelectors.username).fill(process.env.TEST_USERNAME as string);
      await page.locator(loginPageSelectors.password).fill(process.env.TEST_PASSWORD as string);
      await page.locator(loginPageSelectors.loginButton).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });
  
  test.describe('Inventory Page', async () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator(loginPageSelectors.username).fill(process.env.TEST_USERNAME as string);
      await page.locator(loginPageSelectors.password).fill(process.env.TEST_PASSWORD as string);
      await page.locator(loginPageSelectors.loginButton).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify adding item to cart', async ({ page }) => {
      const selectedItem = page.locator(inventoryPageSelectors.firstItemName).textContent();
      await page.locator(inventoryPageSelectors.firstItemButton).click();
      await expect(page.locator(inventoryPageSelectors.shoppingCart)).toHaveText('1');
      await page.locator(inventoryPageSelectors.shoppingCart).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
      await expect(page.locator(cartPageSelectors.cartList)).toHaveCount(1);
      const cartItem = page.locator(cartPageSelectors.firstItemName).textContent();
      expect(selectedItem).toStrictEqual(cartItem);
    });

    test('Verify deleting item from cart', async ({ page }) => {
      //precondition
      await page.locator(inventoryPageSelectors.firstItemButton).click();
      await page.locator(inventoryPageSelectors.shoppingCart).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
      await expect(page.locator(cartPageSelectors.cartList)).toHaveCount(1);

      await page.locator(cartPageSelectors.firstItemButton).click();
      await expect(page.locator(cartPageSelectors.cartList)).toHaveCount(0);
      await expect(page.locator(cartPageSelectors.shoppingCart)).toHaveText('');
      
    });

    test('Verify logout', async ({ page }) => {
      await page.locator(inventoryPageSelectors.burgerMenu).click();
      await expect(page.locator(inventoryPageSelectors.burgerMenuWrap)).toBeVisible();
      await page.locator(inventoryPageSelectors.logout).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator(loginPageSelectors.username)).toBeEmpty();
      await expect(page.locator(loginPageSelectors.password)).toBeEmpty();
    });
  });
});
