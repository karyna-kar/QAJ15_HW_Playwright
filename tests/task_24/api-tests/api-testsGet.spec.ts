import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custome-fixtures';
import { APIResponse } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let originalPayload: any;
let response: APIResponse;
let createdIds: string[] = [];

test.describe('Test Get /objects', () => {
  test.describe('Test with empty list of objects', () => {
    test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
      const responseForDeleting = await restfulControllerAuthorizedUser.getObjects();
      const body = await responseForDeleting.json();
      const requests = body.map((el: any) => restfulControllerAuthorizedUser.deleteObjectById(el.id));
      await Promise.all(requests);
    });

    test('Get /objects: check failed Authorization - no api-key header', async ({ restfulControllerNotAuthorizedUser }) => {
      const response = await restfulControllerNotAuthorizedUser.getObjects();
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual(
        "API key is missing. To use this API, include your API key in the 'x-api-key' header. If you don’t have one, create an account and get your API key here: https://restful-api.dev/dashboard"
      );
    });

    test('Get /objects: check failed Authorization - invalid api-key header', async ({ restfulControllerInvalidApiKey }) => {
      const response = await restfulControllerInvalidApiKey.getObjects();
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual('Invalid API key. Please check your API key on the dashboard: https://restful-api.dev/dashboard');
    });

    test('Get /objects: check that request returns empty list when there are no objects', async ({ restfulControllerAuthorizedUser }) => {
      const response = await restfulControllerAuthorizedUser.getObjects();
      expect(response.status()).toBe(200);
      expect(await response.json()).toHaveLength(0);
    });
  });

  test.describe('Tests with not empty list of objects', () => {
    test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
      originalPayload = [
        {
          name: 'Test Karyna1',
          data: {
            year: 2013,
            price: 1049.99
          }
        },
        {
          name: 'Test Karyna2',
          data: {
            year: 2019,
            price: 1849.99
          }
        }
      ];

      for (const element of originalPayload) {
        await restfulControllerAuthorizedUser.createObject(element);
      }
      response = await restfulControllerAuthorizedUser.getObjects();
      const body = await response.json();
      createdIds = body.map((value: any) => value.id);
    });

    test.afterAll(async ({ restfulControllerAuthorizedUser }) => {
      const responseForDeleting = await restfulControllerAuthorizedUser.getObjects();
      const body = await responseForDeleting.json();
      const requests = body.map((el: any) => restfulControllerAuthorizedUser.deleteObjectById(el.id));
      await Promise.all(requests);
      createdIds.length = 0;
    });

    test('Get /objects: check that request returns the list of objects equal created ones', async ({ restfulControllerAuthorizedUser }) => {
      const response = await restfulControllerAuthorizedUser.getObjects();
      const body = await response.json();
      expect(response.status()).toBe(200);
      expect(body.length).toBeGreaterThan(0);
      const actualIds = body.map((value: any) => value.id);
      expect(actualIds).toEqual(createdIds);
    });

    test('GET /objects: check request with several ids parameters', async ({ restfulControllerAuthorizedUser }) => {
      response = await restfulControllerAuthorizedUser.getObjects(createdIds);
      expect(response.status()).toEqual(200);
      const body = await response.json();
      const actualIds = body.map((value: any) => value.id);
      expect(actualIds).toEqual(createdIds);
    });
  });
});

test.describe('Test Get /objects/{id}', () => {
  test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
    originalPayload = {
      name: 'Test Karyna1',
      data: {
        year: 2013,
        price: 1049.99
      }
    };
    await restfulControllerAuthorizedUser.createObject(originalPayload);
    response = await restfulControllerAuthorizedUser.getObjects();
  });

  test.afterAll(async ({ restfulControllerAuthorizedUser }) => {
    const responseForDeleting = await restfulControllerAuthorizedUser.getObjects();
    const body = await responseForDeleting.json();
    const requests = body.map((el: any) => restfulControllerAuthorizedUser.deleteObjectById(el.id));
    await Promise.all(requests);
  });

  test('GET /objects/{id}: check by existing id', async ({ restfulControllerAuthorizedUser }) => {
    // response = await restfulController.getAllObjects();//option 2
    const body = await response.json();
    const existingId = body[0].id;
    const responseByID = await restfulControllerAuthorizedUser.getObjectById(existingId);
    const bodyResponseByID = await responseByID.json();
    expect(responseByID.status()).toBe(200);
    expect(bodyResponseByID.id).toEqual(existingId);
    expect(bodyResponseByID).toMatchObject(originalPayload);
  });

  test('GET /objects/{id}: check by not existing id', async ({ restfulControllerAuthorizedUser }) => {
    const notExistingId = 'TestDog';
    const responseByID = await restfulControllerAuthorizedUser.getObjectById(notExistingId);
    const bodyResponseByID = await responseByID.json();
    expect(responseByID.status()).toBe(404);
    expect(bodyResponseByID).toMatchObject({
      error: `Object with id=${notExistingId} was not found.`
    });
  });
});
