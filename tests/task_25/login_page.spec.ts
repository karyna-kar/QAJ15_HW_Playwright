import { test, expect } from '@playwright/test';
import { LoginPage } from './page_object/login_page';

test.describe('Login Page Tests', async () => {
  let loginPage : LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginPage.navigate();
  });

  test('Verify mandatory inputs', async ({}) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });
});
