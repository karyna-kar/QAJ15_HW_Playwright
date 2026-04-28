import { expect } from '@playwright/test';
import { test } from '../../fixtures/custome-fixtures';
import { inventoryPageSelectors } from '../../helpers/selectors';
import { cartPageSelectors } from '../../helpers/selectors';
import { checkoutStepOnePageSelectors } from '../../helpers/selectors';

test.describe('', async () => {
  test('Verify header schreeshot ', async ({ page, loginStandartUser }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.header_label')).toHaveScreenshot();
  });

  test('Verify number of items in cart ', async ({ page, loginStandartUser, addItemsToCard }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator(inventoryPageSelectors.shoppingCart)).toHaveText('2');
  });

  test('Verify number of checkout items ', async ({ page, loginStandartUser, addItemsToCard }) => {
    const numberOfAddedItems = addItemsToCard;
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator(cartPageSelectors.checkoutButton).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator(checkoutStepOnePageSelectors.firstName).fill('Test');
    await page.locator(checkoutStepOnePageSelectors.lastName).fill('Test');
    await page.locator(checkoutStepOnePageSelectors.zipCode).fill('123');
    await page.locator(checkoutStepOnePageSelectors.continueButton).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect((await page.locator('.cart_list .cart_item').all()).length).toEqual(numberOfAddedItems);
  });
});
