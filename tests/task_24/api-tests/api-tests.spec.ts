import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custome-fixtures';

test.describe.configure({ mode: 'parallel' });

let originalPayload: any;
let createdIds: string[] = [];

test.describe('Test RESTful API', () => {
  test.afterAll(async ({ restfulControllerAuthorizedUser }) => {
    const responseForDeleting = await restfulControllerAuthorizedUser.getObjects();
    const body = await responseForDeleting.json();

    await Promise.all(body.map((el: any) => restfulControllerAuthorizedUser.deleteObjectById(el.id)));
  });

  test.describe('Test POST /objects', () => {
    test('POST /objects: check failed Authorization - no api-key header', async ({ restfulControllerNotAuthorizedUser }) => {
      const originalPayload = {
        name: 'Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };

      const response = await restfulControllerNotAuthorizedUser.createObject(originalPayload);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual(
        "API key is missing. To use this API, include your API key in the 'x-api-key' header. If you don’t have one, create an account and get your API key here: https://restful-api.dev/dashboard"
      );
    });

    test('POST /objects: check failed Authorization - invalid api-key header', async ({ restfulControllerInvalidApiKey }) => {
      const originalPayload = {
        name: 'Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };

      const response = await restfulControllerInvalidApiKey.createObject(originalPayload);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual('Invalid API key. Please check your API key on the dashboard: https://restful-api.dev/dashboard');
    });

    test('POST /objects: create a new valid object', async ({ restfulControllerAuthorizedUser }) => {
      const originalPayload = {
        name: 'Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };
      const postResponse = await restfulControllerAuthorizedUser.createObject(originalPayload);
      const bodyPostResponse = await postResponse.json();
      expect(postResponse.status()).toBe(200);
      expect(bodyPostResponse).toMatchObject(originalPayload);
      //get a new created object and verify it
      const createdId = bodyPostResponse.id;
      const responseByID = await restfulControllerAuthorizedUser.getObjectById(createdId);
      const bodyResponseByID = await responseByID.json();
      expect(responseByID.status()).toBe(200);
      expect(bodyResponseByID.id).toEqual(createdId);
      expect(bodyResponseByID).toMatchObject(originalPayload);
    });

    test('POST /objects: create an object with invalid body format', async ({ restfulControllerAuthorizedUser }) => {
      const invalidPayload = [
        {
          name: 'Test Karyna Failed1',
          data: {
            year: 2019,
            price: 1849.99
          }
        },
        {
          name: 'Test Karyna Failed1',
          data: {
            year: 2019,
            price: 1849.99
          }
        }
      ];
      const responseCreateObject = await restfulControllerAuthorizedUser.createObject(invalidPayload);
      const bodyPostResponse = await responseCreateObject.json();
      expect(responseCreateObject.status()).toBe(400);
      expect(bodyPostResponse).toMatchObject({
        error: `Invalid request body`
      });
    });
  });
  test.describe('Test PUT /objects/{id}', () => {
    test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
      originalPayload = {
        name: 'Test Karyna - Pending Update',
        data: {
          year: 2013,
          price: 1049.99
        }
      };
      const response = await restfulControllerAuthorizedUser.createObject(originalPayload);
      const body = await response.json();
      createdIds.push(body.id);
    });

    test.afterAll(async () => {
      createdIds.length = 0;
    });

    test('PUT /objects: check failed Authorization - no api-key header', async ({ restfulControllerNotAuthorizedUser }) => {
      const originalPayload = {
        name: 'Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };

      const response = await restfulControllerNotAuthorizedUser.createObject(originalPayload);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual(
        "API key is missing. To use this API, include your API key in the 'x-api-key' header. If you don’t have one, create an account and get your API key here: https://restful-api.dev/dashboard"
      );
    });

    test('PUT /objects/{id}: check failed Authorization - invalid api-key header', async ({ restfulControllerInvalidApiKey }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const updatedID = createdIds[0];
      const response = await restfulControllerInvalidApiKey.fullyUpdateObject(updatingPayload, updatedID);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual('Invalid API key. Please check your API key on the dashboard: https://restful-api.dev/dashboard');
    });

    test('PUT /objects/{id}: check that existing object is fully updated', async ({ restfulControllerAuthorizedUser }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const updatedID = createdIds[0];
      const responseFullyUpdateObject = await restfulControllerAuthorizedUser.fullyUpdateObject(updatingPayload, updatedID);
      const bodyFullyUpdateObject = await responseFullyUpdateObject.json();
      expect(responseFullyUpdateObject.status()).toBe(200);
      expect(bodyFullyUpdateObject.id).toEqual(updatedID);
      expect(bodyFullyUpdateObject).toMatchObject(updatingPayload);
      //get updated object and verify it
      const responseGetObjectById = await restfulControllerAuthorizedUser.getObjectById(updatedID);
      const bodyGetObjectById = await responseGetObjectById.json();
      expect(responseGetObjectById.status()).toBe(200);
      expect(bodyGetObjectById.id).toEqual(updatedID);
      expect(bodyGetObjectById).toMatchObject(updatingPayload);
    });

    test('PUT /objects/{id}: check by not existing id', async ({ restfulControllerAuthorizedUser }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const invalidID = 'TestObject';
      const responseFullyUpdateObject = await restfulControllerAuthorizedUser.fullyUpdateObject(updatingPayload, invalidID);
      const bodyFullyUpdateObject = await responseFullyUpdateObject.json();
      expect(responseFullyUpdateObject.status()).toBe(404);
      expect(bodyFullyUpdateObject).toMatchObject({
        error: `Object with id=${invalidID} was not found.`
      });
    });
  });

  test.describe('Test PATCH /objects/{id}', () => {
    test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
      originalPayload = {
        name: 'Test Karyna - Pending Update',
        data: {
          year: 2013,
          price: 1049.99
        }
      };
      const response = await restfulControllerAuthorizedUser.createObject(originalPayload);
      const body = await response.json();
      createdIds.push(body.id);
    });

    test.afterAll(async () => {
      createdIds.length = 0;
    });

    test('PATH /objects/{id}: check failed Authorization - no api-key header', async ({ restfulControllerNotAuthorizedUser }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const updatedID = createdIds[0];
      const response = await restfulControllerNotAuthorizedUser.fullyUpdateObject(updatingPayload, updatedID);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual(
        "API key is missing. To use this API, include your API key in the 'x-api-key' header. If you don’t have one, create an account and get your API key here: https://restful-api.dev/dashboard"
      );
    });

    test('PATH /objects/{id}: check failed Authorization - invalid api-key header', async ({ restfulControllerInvalidApiKey }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const updatedID = createdIds[0];
      const response = await restfulControllerInvalidApiKey.fullyUpdateObject(updatingPayload, updatedID);
      const body = await response.text();
      expect(response.status()).toBe(403);
      expect(body).toEqual('Invalid API key. Please check your API key on the dashboard: https://restful-api.dev/dashboard');
    });

    test('PATCH /objects/{id}: check that existing object is partially updated', async ({ restfulControllerAuthorizedUser }) => {
      const updatingPayload = {
        name: 'Test Karyna - Updated'
      };

      const updatedID = createdIds[0];
      const responsePartialUpdateObject = await restfulControllerAuthorizedUser.partialUpdateObject(updatingPayload, updatedID);
      const bodyPartialUpdateObject = await responsePartialUpdateObject.json();
      expect(responsePartialUpdateObject.status()).toBe(200);
      expect(bodyPartialUpdateObject.id).toEqual(updatedID);
      expect(bodyPartialUpdateObject.name).toEqual(updatingPayload.name);
      expect(bodyPartialUpdateObject.data).toMatchObject(originalPayload.data);
      //get updated object and verify it
      const responseGetObjectById = await restfulControllerAuthorizedUser.getObjectById(updatedID);
      const bodyGetObjectById = await responseGetObjectById.json();
      expect(responseGetObjectById.status()).toBe(200);
      expect(bodyGetObjectById.id).toEqual(updatedID);
      expect(bodyGetObjectById.name).toEqual(updatingPayload.name);
      expect(bodyGetObjectById.data).toMatchObject(originalPayload.data);
    });

    test('PATCH /objects/{id}: check by not existing id', async ({ restfulControllerAuthorizedUser }) => {
      const updatingPayload = {
        name: 'Updated Test Karyna'
      };

      const invalidID = 'TestObject';
      const responsePartialUpdateObject = await restfulControllerAuthorizedUser.partialUpdateObject(updatingPayload, invalidID);
      const bodyPartialUpdateObject = await responsePartialUpdateObject.json();
      expect(responsePartialUpdateObject.status()).toBe(404);
      expect(bodyPartialUpdateObject).toMatchObject({
        error: `Object with id=${invalidID} was not found.`
      });
    });
  });

  test.describe('Test DELETE /objects/{id}', () => {
    test.beforeAll(async ({ restfulControllerAuthorizedUser }) => {
      originalPayload = {
        name: 'Test Karyna - Pending Update',
        data: {
          year: 2013,
          price: 1049.99
        }
      };
      const response = await restfulControllerAuthorizedUser.createObject(originalPayload);
      const body = await response.json();
      createdIds.push(body.id);
    });

    test.afterAll(async () => {
      createdIds.length = 0;
    });

    test('DELETE /objects/{id}: check failed Authorization - no api-key header', async ({ restfulControllerNotAuthorizedUser }) => {
      const deleteID = createdIds[0];
      const responseDeleteObject = await restfulControllerNotAuthorizedUser.deleteObjectById(deleteID);
      const bodyDeleteObject = await responseDeleteObject.text();
      expect(responseDeleteObject.status()).toBe(403);
      expect(bodyDeleteObject).toEqual(
        "API key is missing. To use this API, include your API key in the 'x-api-key' header. If you don’t have one, create an account and get your API key here: https://restful-api.dev/dashboard"
      );
    });

    test('DELETE /objects/{id}: check failed Authorization - invalid api-key header', async ({ restfulControllerInvalidApiKey }) => {
      const deleteID = createdIds[0];
      const responseDeleteObject = await restfulControllerInvalidApiKey.deleteObjectById(deleteID);
      const bodyDeleteObject = await responseDeleteObject.text();
      expect(responseDeleteObject.status()).toBe(403);
      expect(bodyDeleteObject).toEqual('Invalid API key. Please check your API key on the dashboard: https://restful-api.dev/dashboard');
    });

    test('DELETE /objects/{id}: check by existing id', async ({ restfulControllerAuthorizedUser }) => {
      const deleteID = createdIds[0];
      const responseDeleteObject = await restfulControllerAuthorizedUser.deleteObjectById(deleteID);
      const bodyDeleteObject = await responseDeleteObject.json();
      expect(responseDeleteObject.status()).toBe(200);
      expect(bodyDeleteObject).toMatchObject({
        message: `Object with id = ${deleteID} has been deleted.`
      });

      const responseAfterDeletion = await restfulControllerAuthorizedUser.getObjectById(deleteID);
      expect(responseAfterDeletion.status()).toBe(404);
    });

    test('DELETE /objects/{id}: check by not existing id', async ({ restfulControllerAuthorizedUser }) => {
      const invalidID = 'TestObject';
      const responseDeleteObject = await restfulControllerAuthorizedUser.deleteObjectById(invalidID);
      const bodyDeleteObject = await responseDeleteObject.json();
      expect(responseDeleteObject.status()).toBe(404);
      expect(bodyDeleteObject).toMatchObject({
        error: `Object with id=${invalidID} was not found.`
      });
    });
  });
});
