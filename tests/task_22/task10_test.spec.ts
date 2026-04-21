import { test, expect } from '@playwright/test';

test.describe('Test herokuapp/iframe page', async () => {
  test('Verify iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    //verifying menu buttons
    const menuButtons = page.locator('[role="menubar"] button');
    const expectedButtons = ['File', 'Edit', 'View', 'Format'];
    await expect(menuButtons).toHaveText(expectedButtons);
    //verifying iframe
    const frame = page.frameLocator('#mce_0_ifr');
    const editor = frame.locator('#tinymce p');
    await expect(editor).toHaveText('Your content goes here.');

    //additional task
    await editor.evaluate(el => {
      el.setAttribute('contenteditable', 'true');
    });
    const inputText = 'Karina';
    await editor.fill(inputText);
    await expect(editor).toHaveText(inputText);
  });
});
