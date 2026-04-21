import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/javascript_alerts page', async () => {
  test('Verify opening alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Confirm');
      await dialog.dismiss();
    });
    await page.locator('button[onclick="jsConfirm()"]').click();
    expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });
});
