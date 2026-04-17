import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/drag_and_drop page', async () => {
  test('Verify drag_and_drop method', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const elementA = '#column-a';
    const elementB = '#column-b';
    await page.dragAndDrop(elementA, elementB);
    expect(page.locator(elementA)).toHaveText('B');
    expect(page.locator(elementB)).toHaveText('A');
  });
});
