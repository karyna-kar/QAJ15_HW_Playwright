import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/key_presses', async () => {
  test('Verify pressed key', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.keyboard.press('Control');
    expect(page.locator('#result')).toHaveText('You entered: CONTROL');

    await page.locator('input#target').click();
    await page.keyboard.type('Karina');
    expect(page.locator('#result')).toHaveText('You entered: A');
  });
});
