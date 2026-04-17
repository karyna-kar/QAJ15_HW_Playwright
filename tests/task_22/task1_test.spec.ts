import { test, expect } from '@playwright/test';

test.describe('Test books-pwakit page', async () => {
  test("Verify Search field's text", async ({ page }) => {
    await page.goto('https://books-pwakit.appspot.com/ ');
    expect(page.locator('.books-desc')).toHaveText("Search the world's most comprehensive index of full-text books.");
  });
});
