/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions'

// Mock the SDK client
vi.mock('../src/generate-npc/npc-gen-client/sdk.gen', () => ({
  generateNpc: vi.fn(),
}));

import { handler } from '../src/generate-npc'
import { generateNpc as mockGenerateNpcSdk } from '../src/generate-npc/npc-gen-client/sdk.gen';

const validRoles = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];

const mockSuccessfulRemoteNpc = {
  first_name: "Testy",
  surname: "McTestFace",
  role: "pilot",
  characteristics: { STR: 10, DEX: 10, END: 10, INT: 10, EDU: 10, SOC: 10 },
  skills: ["Testing", "Mocking"],
};

describe('generate-npc handler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Default mock implementation for successful calls
    (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockSuccessfulRemoteNpc,
    });
  });

  it('should return generated NPC data for a valid POST request without a role', async () => {
    const event = initializeHandlerEvent('POST', null)
    const context = initializeHandlerContext()

    const response = await handler(event, context) as HandlerResponse

    expect(response.statusCode).toBe(200);
    expect(response.headers).toBeDefined();
    expect(response.headers).toHaveProperty('Content-Type');
    expect(response.headers!['Content-Type']).toBe('application/json');
    expect(response.body).toBeDefined();
    const body = JSON.parse(response.body!);
    expect(body).toHaveProperty('name', 'Testy McTestFace');
    expect(body).toHaveProperty('occupation', 'Pilot'); // Capitalized
    expect(body).toHaveProperty('skills', ["Testing", "Mocking"]);
    expect(body).toHaveProperty('equipment'); // Equipment is locally generated

    // Check that the SDK was called with a valid role
    expect(mockGenerateNpcSdk).toHaveBeenCalledOnce();
    const sdkCallArgs = (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(sdkCallArgs.body).toBeDefined();
    expect(validRoles).toContain(sdkCallArgs.body.role);
  });

  it('should use the provided role if valid', async () => {
    const specificRole = "engineer";
    const event = initializeHandlerEvent('POST', { role: specificRole });
    const context = initializeHandlerContext();

    // Adjust mock for this specific role if necessary
    (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { ...mockSuccessfulRemoteNpc, role: specificRole },
    });

    const response = await handler(event, context) as HandlerResponse;
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body!);
    expect(body.occupation).toBe('Engineer'); // Capitalized

    expect(mockGenerateNpcSdk).toHaveBeenCalledOnce();
    const sdkCallArgs = (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(sdkCallArgs.body.role).toBe(specificRole);
  });

  it('should use a random valid role if provided role is invalid', async () => {
    const event = initializeHandlerEvent('POST', { role: "invalid_role_123" });
    const context = initializeHandlerContext();

    await handler(event, context);

    expect(mockGenerateNpcSdk).toHaveBeenCalledOnce();
    const sdkCallArgs = (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(validRoles).toContain(sdkCallArgs.body.role);
  });


  it('should return 405 for non-POST requests', async () => {
    const event = initializeHandlerEvent('GET', null)
    const context = initializeHandlerContext()

    const response = await handler(event, context) as HandlerResponse

    expect(response.statusCode).toBe(405);
    expect(response.headers).toBeDefined();
    expect(response.headers).toHaveProperty('Content-Type');
    expect(response.headers!['Content-Type']).toBe('application/json');
    expect(response.body).toBeDefined();
    const body = JSON.parse(response.body!);
    expect(body).toHaveProperty('error', 'Method Not Allowed'); // Error message from handler
  });

  it('should return 400 for invalid JSON in request body', async () => {
    const event = initializeHandlerEvent('POST', '{"role": "pilot",'); // Invalid JSON string
    const context = initializeHandlerContext();

    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(400);
    expect(response.headers!['Content-Type']).toBe('application/json');
    const body = JSON.parse(response.body!);
    expect(body).toHaveProperty('error', 'Bad Request: Invalid JSON');
    expect(mockGenerateNpcSdk).not.toHaveBeenCalled();
  });

  it('should return 500 if the SDK call fails', async () => {
    (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mockResolvedValue({
       error: "SDK Error"
    });
    const event = initializeHandlerEvent('POST', { role: "pilot" });
    const context = initializeHandlerContext();

    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body!);
    expect(body).toHaveProperty('error', 'Internal Sever Error');
  });

  it('should return 500 if the SDK call throws an unexpected error', async () => {
    (mockGenerateNpcSdk as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("Unexpected SDK failure"));
    const event = initializeHandlerEvent('POST', { role: "pilot" });
    const context = initializeHandlerContext();

    const response = await handler(event, context) as HandlerResponse;

    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body!);
    expect(body).toHaveProperty('error', 'Internal Server Error');
  });
})

function initializeHandlerContext (): HandlerContext {
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'generate-npc-test',
    functionVersion: '1.0',
    invokedFunctionArn: 'arn:aws:lambda:us-east-1:test:function:generate-npc-test',
    memoryLimitInMB: '128',
    awsRequestId: 'test-request-id',
    logGroupName: '/aws/lambda/generate-npc-test',
    logStreamName: 'test-log-stream',
    getRemainingTimeInMillis (): number { return 1000 }, // Example value
    done (error?: Error, result?: any): void {},
    fail (error: Error | string): void {},
    succeed (messageOrObject: any): void {}
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initializeHandlerEvent (method: string, body: any): HandlerEvent {
  return {
    httpMethod: method,
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null,
    rawUrl: 'https://test-url.netlify.app/.netlify/functions/generate-npc',
    rawQuery: '',
    path: '/.netlify/functions/generate-npc',
    headers: {
      'content-type': body && typeof body !== 'string' ? 'application/json' : 'text/plain',
    },
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    isBase64Encoded: false,
  }
}
