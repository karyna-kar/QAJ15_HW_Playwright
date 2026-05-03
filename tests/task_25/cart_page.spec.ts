import { test } from '../../fixtures/custome-fixtures';
import { expect } from '@playwright/test';

test.describe('Cart Page Tests', async () => {
  test.beforeEach(async ({ swagLabs, loginStandartUser }) => {
    await swagLabs.cartPage.navigate();
  });

  test('Verify title', async ({ swagLabs }) => {
    await expect(swagLabs.cartPage.pageTitle).toHaveText('Your Cart');
  });

  test('Verify deleting item from cart', async ({ swagLabs }) => {
    await swagLabs.cartPage.addSeveralItems();
    await expect(swagLabs.cartPage.cartList).toHaveCount(2);
    await swagLabs.cartPage.deleteButton.click();
    await expect(swagLabs.cartPage.cartList).toHaveCount(1);
  });

  test('Verify Continue Button', async ({ swagLabs, page }) => {
    await swagLabs.cartPage.continueShoppingButton.click();
    expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Verify Checkout Button - with not empty cart', async ({ swagLabs, page }) => {
    await swagLabs.cartPage.addSeveralItems();
    await swagLabs.cartPage.checkoutButton.click();
    expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('Verify Checkout Button - with empty cart', async ({ swagLabs, page }) => {
    await swagLabs.cartPage.checkoutButton.click();
    expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('Verify header', async ({ swagLabs }) => {
    await expect(swagLabs.inventoryPage.header.appLogo).toHaveText('Swag Labs');
    await swagLabs.cartPage.header.burgerMenu.openMenu();
    expect(swagLabs.cartPage.header.burgerMenu.burgerMenuContainer).toBeVisible();
    await swagLabs.cartPage.header.burgerMenu.closeMenu();
    expect(swagLabs.cartPage.header.burgerMenu.burgerMenuContainer).toBeHidden();
  });

  test('Verify footer', async ({ swagLabs }) => {
    await expect(swagLabs.cartPage.footer.socialIconLinks).toHaveCount(3);

    //have correct URls
    await expect(swagLabs.cartPage.footer.socialIconTwitter).toHaveAttribute('href', /twitter/);
    await expect(swagLabs.cartPage.footer.socialIconFacebook).toHaveAttribute('href', /facebook/);
    await expect(swagLabs.cartPage.footer.socialIconlinkedin).toHaveAttribute('href', /linkedin/);
  });
});
