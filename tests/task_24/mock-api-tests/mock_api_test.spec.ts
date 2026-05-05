import { test, expect } from '@playwright/test';

test.describe('Login Page', async () => {
  const buttonLocator = '#fetchBtn';
  const resultLocator = '#result';
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks');
  });

  test('Mock block request', async ({ page }) => {
    page.route('**/mocks?action=getData', route => {
      route.abort();
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText('Network error');
  });

  test('Mock custom message', async ({ page }) => {
    const mockedMessage = 'Received mocked data';
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: mockedMessage
        })
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText(mockedMessage);
  });

  test('Mock empty message', async ({ page }) => {
    const mockedMessage = '';
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: mockedMessage
        })
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText(mockedMessage);
  });

  test('Mock empty JSON object', async ({ page }) => {
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({})
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText('undefined');
  });

  test('Mock not JSON object', async ({ page }) => {
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: 'test'
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText('Network error');
  });

  test('Mock 404 response status code', async ({ page }) => {
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Not Found123'
        })
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText('Error 404: undefined');
  });

  test('Mock 500 response status code', async ({ page }) => {
    page.route('**/mocks?action=getData', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal Server Error'
        })
      });
    });

    await page.locator(buttonLocator).click();
    await expect(page.locator(resultLocator)).toHaveText('Error 500: undefined');
  });
});
