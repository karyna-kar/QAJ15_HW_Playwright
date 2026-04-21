import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/hovers page', async () => {
  test('Verify hover method', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.locator('.figure').first().hover();
    const image = page.locator('.figcaption').first();
    expect(image).toBeVisible();
    expect(image).toHaveText(/name: user1/, /View profile/);
  });
});
