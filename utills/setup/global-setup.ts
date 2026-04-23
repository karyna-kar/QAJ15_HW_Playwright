import { test as setup } from '@playwright/test';
import { loginPageSelectors } from '../../helpers/selectors';
import 'dotenv/config';
import { existsSync, readFile, readFileSync, readSync, Utf8Stream } from 'node:fs';

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;
const filePath = '.auth/standard-user-state.json';

setup('Verify successful login with standard_user', async ({ page }) => {
  if (existsSync(filePath)) {
    const fileData = readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileData);
    const expiresTime = parsedData.cookies[0].expires;
    const nowTime = new Date().getTime();

    if (expiresTime > nowTime) return;
  }
  await page.goto('https://www.saucedemo.com/');
  await page.locator(loginPageSelectors.username).fill(username);
  await page.locator(loginPageSelectors.password).fill(password);
  await page.locator(loginPageSelectors.loginButton).click();

  await page.context().storageState({ path: filePath });
});
