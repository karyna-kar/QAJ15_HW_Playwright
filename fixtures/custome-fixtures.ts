import { test as baseTest } from '@playwright/test';
import { RestfulController } from '../tests/task_24/api-tests/controller-api';
import 'dotenv/config';
import { SwagLabs } from '../tests/task_25/page_object/swag_labs';

interface ExtendedFicture {
  loginStandartUser: undefined;
  addItemsToCard: number;
  swagLabs: SwagLabs;
  restfulControllerAuthorizedUser: RestfulController;
  restfulControllerNotAuthorizedUser: RestfulController;
  restfulControllerInvalidApiKey: RestfulController;
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
  },

  restfulControllerAuthorizedUser: async ({ playwright }, use) => {
    const baseURL = 'https://api.restful-api.dev';
    const authRequest = await playwright.request.newContext({ extraHTTPHeaders: { 'x-api-key': process.env.API_KEY as string } });
    const controller = new RestfulController(authRequest, baseURL);
    await use(controller);
  },

  restfulControllerNotAuthorizedUser: async ({ request }, use) => {
    const baseURL = 'https://api.restful-api.dev';
    const controller = new RestfulController(request, baseURL);
    await use(controller);
  },

  restfulControllerInvalidApiKey: async ({ playwright }, use) => {
    const baseURL = 'https://api.restful-api.dev';
    const authRequest = await playwright.request.newContext({ extraHTTPHeaders: { 'x-api-key': 'Test' } });
    const controller = new RestfulController(authRequest, baseURL);
    await use(controller);
  }
});
