import { test, expect } from '@playwright/test';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'path';

test.describe('Test herokuapp/upload page', async () => {
  const filePath = '.tests/upload/test_upload.txt';

  test.beforeAll(() => {
    mkdirSync(path.dirname(filePath));
    writeFileSync(filePath, 'Sample file for upload test', 'utf-8');
  });

  test.afterAll(() => {
    rmSync(path.dirname(filePath), { recursive: true, force: true });
  });

  test('Verify uploading file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles(filePath);
    await page.locator('#file-submit').click();

    expect(page.locator('.example h3')).toHaveText('File Uploaded!');
    expect(page.locator('#uploaded-files')).toHaveText('test_upload.txt');
  });
});
