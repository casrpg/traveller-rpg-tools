/* eslint-disable @typescript-eslint/no-empty-function */

import { describe, it, expect } from 'vitest';
import type { Context } from '@netlify/functions';

import handler from '../src/generate-npc';

describe('generate-npc handler', () => {
  it('should return generated NPC data for a valid POST request', async () => {
    const request = createRequest('POST');
    const context = createContext();

    const response = await handler(request, context);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const body = await response.json();
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('occupation');
    expect(body).toHaveProperty('skills');
    expect(body).toHaveProperty('equipment');
  });

  it('should return 405 for non-POST requests', async () => {
    const request = createRequest('GET');
    const context = createContext();

    const response = await handler(request, context);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(405);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const body = await response.json();
    expect(body).toHaveProperty('error', 'Method Not Allowed');
  });
});

function createContext(): Context {
  return {
    account: { id: 'test-account' },
    cookies: {
      get: () => undefined,
      set: () => {},
      delete: () => {},
    },
    deploy: {
      context: 'production',
      id: 'test-deploy',
      published: true,
    },
    geo: {
      city: 'Test City',
      country: { code: 'US', name: 'United States' },
      latitude: 37.7749,
      longitude: -122.4194,
      subdivision: { code: 'CA', name: 'California' },
      timezone: 'America/Los_Angeles',
      postalCode: '94102',
    },
    ip: '127.0.0.1',
    params: {},
    requestId: 'test-request-id',
    server: { region: 'us-east-1' },
    site: {
      id: 'test-site-id',
      name: 'test-site',
      url: 'https://test-site.netlify.app',
    },
    waitUntil: () => {},
  };
}

function createRequest(method: string): Request {
  return new Request('https://example.com/api/generate-npc', {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
