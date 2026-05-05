import { expect } from '@playwright/test';
import { test } from '../../fixtures/custome-fixtures';

test.describe('Login Page Tests', async () => {
  test.beforeEach(async ({ swagLabs }) => {
    await swagLabs.loginPage.navigate();
  });

  test('Verify mandatory inputs: Username', async ({ swagLabs }) => {
    await swagLabs.loginPage.passwordInput.fill('test');
    await swagLabs.loginPage.loginButton.click();
    await expect(swagLabs.loginPage.errorMessage).toBeVisible();
    await expect(swagLabs.loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('Verify mandatory inputs: Password', async ({ swagLabs }) => {
    await swagLabs.loginPage.userNameInput.fill('test');
    await swagLabs.loginPage.loginButton.click();
    await expect(swagLabs.loginPage.errorMessage).toBeVisible();
    await expect(swagLabs.loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('Verify login with invalid credentials', async ({ swagLabs }) => {
    await swagLabs.loginPage.userNameInput.fill('test');
    await swagLabs.loginPage.passwordInput.fill('test');
    await swagLabs.loginPage.loginButton.click();
    await expect(swagLabs.loginPage.errorMessage).toBeVisible();
    await expect(swagLabs.loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
});
