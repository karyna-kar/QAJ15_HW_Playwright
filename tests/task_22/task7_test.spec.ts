import { test, expect } from '@playwright/test';
import { readFileSync, rmSync } from 'node:fs';
import path from 'path';

test.describe('Test herokuapp/download page', async () => {
  const filePath = '.tests/dowloaded/test.txt';

  test.afterAll(() => {
    rmSync(path.dirname(filePath), { recursive: true, force: true });
  });

  test('Verify downloading file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('test_sample_Playwright.txt').click();
    const download = await downloadPromise;
    await download.saveAs(filePath);

    const fileData = readFileSync(filePath, 'utf-8');
    expect(fileData).toEqual('Sample file for upload test.\n');
  });
});
