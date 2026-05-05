import { expect } from '@playwright/test';
import { test } from '../../fixtures/custome-fixtures';

test.describe('Inventory Page Tests', async () => {
  test.beforeEach(async ({ swagLabs, loginStandartUser }) => {
    await swagLabs.inventoryPage.navigate();
  });

  test('Verify header', async ({ swagLabs }) => {
    await expect(swagLabs.inventoryPage.header.appLogo).toHaveText('Swag Labs');
    await swagLabs.inventoryPage.header.burgerMenu.openMenu();
    expect(swagLabs.inventoryPage.header.burgerMenu.burgerMenuContainer).toBeVisible();
    await swagLabs.inventoryPage.header.burgerMenu.closeMenu();
    expect(swagLabs.inventoryPage.header.burgerMenu.burgerMenuContainer).toBeHidden();

    await swagLabs.inventoryPage.addRandomItemToTheCart();
    await expect(swagLabs.inventoryPage.header.shoppingCartCounter).toHaveText('1');
  });

  test('Verify footer', async ({ swagLabs }) => {
    await expect(swagLabs.inventoryPage.footer.socialIconLinks).toHaveCount(3);

    //have correct URls
    await expect(swagLabs.inventoryPage.footer.socialIconTwitter).toHaveAttribute('href', /twitter/);
    await expect(swagLabs.inventoryPage.footer.socialIconFacebook).toHaveAttribute('href', /facebook/);
    await expect(swagLabs.inventoryPage.footer.socialIconlinkedin).toHaveAttribute('href', /linkedin/);
  });

  test('Verify title', async ({ swagLabs }) => {
    await expect(swagLabs.inventoryPage.pageTitle).toHaveText('Products');
  });

  test('Verify number of items', async ({ swagLabs }) => {
    await expect(swagLabs.inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('Verify logout', async ({ swagLabs }) => {
    await swagLabs.inventoryPage.logOut();
    expect(swagLabs.loginPage.url).toBe('https://www.saucedemo.com/');
    await expect(swagLabs.loginPage.userNameInput).toBeEmpty();
    await expect(swagLabs.loginPage.passwordInput).toBeEmpty();
  });

  test('Verify adding item', async ({ swagLabs }) => {
    const randomItem = await swagLabs.inventoryPage.addRandomItemToTheCart();
    const removeButton = await swagLabs.inventoryPage.getItemRemoveButton(randomItem);
    await expect(removeButton).toBeVisible();
  });

  test('Verify deleting item', async ({ swagLabs }) => {
    const randomItem = await swagLabs.inventoryPage.addRandomItemToTheCart();
    const removeButton = await swagLabs.inventoryPage.getItemRemoveButton(randomItem);
    await removeButton.click();
    const addButton = await swagLabs.inventoryPage.getItemAddButton(randomItem);
    await expect(addButton).toBeVisible();
  });
});
