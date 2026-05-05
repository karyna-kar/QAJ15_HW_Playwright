import { expect } from '@playwright/test';
import { test } from '../../fixtures/custome-fixtures';

test.describe('Checkout Step One Page', async () => {
  test.beforeEach(async ({ swagLabs, loginStandartUser }) => {
    await swagLabs.checkoutStepOne.navigate();
  });

  test('Verify title', async ({ swagLabs }) => {
    await expect(swagLabs.checkoutStepOne.pageTitle).toHaveText('Checkout: Your Information');
  });

  test('Verify Cancel Button', async ({ swagLabs, page }) => {
    await swagLabs.checkoutStepOne.cancelButton.click();
    expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('Verify mandatory inputs: FirstName', async ({ swagLabs }) => {
    await swagLabs.checkoutStepOne.lastNameInput.fill('Test');
    await swagLabs.checkoutStepOne.postalCodeInput.fill('Test');
    await swagLabs.checkoutStepOne.continueButton.click();
    await expect(swagLabs.checkoutStepOne.errorMessage).toBeVisible();
    await expect(swagLabs.checkoutStepOne.errorMessage).toHaveText('Error: First Name is required');
  });

  test('Verify mandatory inputs: LastName', async ({ swagLabs }) => {
    await swagLabs.checkoutStepOne.firstNameInput.fill('Test');
    await swagLabs.checkoutStepOne.postalCodeInput.fill('Test');
    await swagLabs.checkoutStepOne.continueButton.click();
    await expect(swagLabs.checkoutStepOne.errorMessage).toBeVisible();
    await expect(swagLabs.checkoutStepOne.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('Verify mandatory inputs: Postal Code', async ({ swagLabs }) => {
    await swagLabs.checkoutStepOne.firstNameInput.fill('Test');
    await swagLabs.checkoutStepOne.lastNameInput.fill('Test');
    await swagLabs.checkoutStepOne.continueButton.click();
    await expect(swagLabs.checkoutStepOne.errorMessage).toBeVisible();
    await expect(swagLabs.checkoutStepOne.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('Verify succesfull checkout', async ({ swagLabs, page }) => {
    await swagLabs.checkoutStepOne.firstNameInput.fill('Test');
    await swagLabs.checkoutStepOne.lastNameInput.fill('Test');
    await swagLabs.checkoutStepOne.postalCodeInput.fill('Test');
    await swagLabs.checkoutStepOne.continueButton.click();
    expect(page).toHaveURL(' https://www.saucedemo.com/checkout-step-two.html');
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
