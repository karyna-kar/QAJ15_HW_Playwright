import { type APIRequestContext } from '@playwright/test';
import { PostObjectPayload } from './types';

export class RestfulController {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl + '/collections/products/objects';
  }

  async getObjects(ids?: string[]) {
    if (ids && ids.length > 0) {
      const params = new URLSearchParams({ id: ids.join(',') });
      return this.request.get(`${this.baseUrl}?${params}`);
    } else {
      return this.request.get(this.baseUrl);
    }
  }

  async getObjectById(id: string) {
    return this.request.get(`${this.baseUrl}/${id}`);
  }

  async createObject(objectPayload: PostObjectPayload | {}) {
    return this.request.post(this.baseUrl, { data: objectPayload });
  }

  async fullyUpdateObject(objectPayload: PostObjectPayload | {}, id: string) {
    return this.request.put(`${this.baseUrl}/${id}`, { data: objectPayload });
  }

  async partialUpdateObject(objectPayload: PostObjectPayload | {}, id: string) {
    return this.request.patch(`${this.baseUrl}/${id}`, { data: objectPayload });
  }

  async deleteObjectById(id: string) {
    return this.request.delete(`${this.baseUrl}/${id}`);
  }
}
