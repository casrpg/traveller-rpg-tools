/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { describe, it, expect } from 'vitest'
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions'

import { handler } from '../src/generate-npc'

const VALID_ROLES = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];
const CAPITALIZED_VALID_ROLES = VALID_ROLES.map(role => role.charAt(0).toUpperCase() + role.slice(1));


describe('generate-npc handler', () => {
  it('should return generated NPC data for a POST request without a body (random role)', async () => {
    const event = initializeHandlerEvent('POST', null) // Explicitly pass null for body
    const context = initializeHandlerContext()

    const response = await handler(event, context) as HandlerResponse

    expect(response.statusCode).toBe(200)
    expect(response.headers).toBeDefined()
    expect(response.headers).toHaveProperty('Content-Type')
    expect(response.headers!['Content-Type']).toBe('application/json')
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body!)
    expect(body).toHaveProperty('name')
    expect(body).toHaveProperty('occupation')
    expect(CAPITALIZED_VALID_ROLES).toContain(body.occupation); // Check if occupation is one of the valid roles
    expect(body).toHaveProperty('skills')
    expect(body).toHaveProperty('equipment')
  })

  it('should return 405 for non-POST requests', async () => {
    const event = initializeHandlerEvent('GET', null)
    const context = initializeHandlerContext()

    const response = await handler(event, context) as HandlerResponse

    expect(response.statusCode).toBe(405)
    expect(response.headers).toBeDefined()
    expect(response.headers).toHaveProperty('Content-Type')
    expect(response.headers!['Content-Type']).toBe('application/json')
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body!)
    expect(body).toHaveProperty('error', 'Method Not Allowed') // Corrected assertion based on actual error message in handler
  })
})

describe('generate-npc handler with role parameter', () => {
  it('should use the provided valid role in the request body', async () => {
    const specificRole = "pilot";
    const event = initializeHandlerEvent('POST', JSON.stringify({ role: specificRole }));
    const context = initializeHandlerContext();
    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body!);
    expect(body.occupation).toBe(specificRole.charAt(0).toUpperCase() + specificRole.slice(1));
  });

  it('should fallback to a random role if an invalid role is provided', async () => {
    const event = initializeHandlerEvent('POST', JSON.stringify({ role: "space-pirate" }));
    const context = initializeHandlerContext();
    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body!);
    expect(CAPITALIZED_VALID_ROLES).toContain(body.occupation);
  });

  it('should fallback to a random role if no role is provided in the body object', async () => {
    const event = initializeHandlerEvent('POST', JSON.stringify({})); // Empty JSON object
    const context = initializeHandlerContext();
    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body!);
    expect(CAPITALIZED_VALID_ROLES).toContain(body.occupation);
  });

  it('should fallback to a random role if the request body is malformed JSON', async () => {
    const event = initializeHandlerEvent('POST', "{'role': 'pilot'"); // Malformed JSON
    const context = initializeHandlerContext();
    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body!);
    expect(CAPITALIZED_VALID_ROLES).toContain(body.occupation);
  });
});

function initializeHandlerContext (): HandlerContext {
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis (): number { return 0 },
    done (_error?: Error, _result?: any): void {},
    fail (_error: Error | string): void {},
    succeed (_messageOrObject: any): void {}
  }
}

function initializeHandlerEvent (method: string, requestBody: string | null): HandlerEvent {
  return {
    httpMethod: method,
    body: requestBody,
    rawUrl: '/api/generate-npc',
    rawQuery: '',
    path: '/api/generate-npc',
    headers: { 'Content-Type': 'application/json' }, // Default content type for POST
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    isBase64Encoded: false
  }
}
