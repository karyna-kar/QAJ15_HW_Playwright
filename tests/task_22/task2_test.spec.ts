import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/windows page', async () => {
  test('Verify /windows/new page in a new tab', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    const pagePromise = context.waitForEvent('page');
    await page.getByText('Click Here').click();
    const newPage = await pagePromise;
    await expect(newPage).toHaveTitle('New Window');
    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
  });
});
