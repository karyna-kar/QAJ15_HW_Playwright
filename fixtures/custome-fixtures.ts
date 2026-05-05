import { test as baseTest } from '@playwright/test';
import 'dotenv/config';
import { SwagLabs } from '../tests/task_25/page_object/swag_labs';

interface ExtendedFicture {
  loginStandartUser: undefined;
  addItemsToCard: number;
  swagLabs: SwagLabs;
}

export const test = baseTest.extend<ExtendedFicture>({
  loginStandartUser: async ({ context }, use) => {
    const username = process.env.TEST_USERNAME as string;

    await context.addCookies([
      {
        name: 'session-username',
        value: username,
        domain: 'www.saucedemo.com',
        path: '/'
      }
    ]);

    await use(undefined);
  },

  addItemsToCard: async ({ page }, use) => {
    const addingItemsIds = [4, 0];
    await page.addInitScript(items => {
      localStorage.setItem('cart-contents', JSON.stringify(items));
    }, addingItemsIds);
    await use(addingItemsIds.length);
  },

  swagLabs: async ({ page }, use) => {
    const myFactory = new SwagLabs(page);
    await use(myFactory);
  }
});
