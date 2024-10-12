import { describe, it, expect } from 'vitest'
import { type HandlerEvent, type HandlerContext, type HandlerResponse } from '@netlify/functions'

import { handler } from './generate-npc'

describe('generate-npc handler', () => {
  it('should return generated NPC data for a valid GET request', async () => {
    const event = initializeHandlerEvent('GET')
    const context = initializeHandlerContext()

    const response  = await handler(event, context) as HandlerResponse
    expect(response.statusCode).toBe(200)
    expect(response.headers).toBeDefined()
    expect(response.headers).toHaveProperty('Content-Type')
    expect(response.headers!['Content-Type']).toBe('application/json')
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body!)
    expect(body).toHaveProperty('name')
    expect(body).toHaveProperty('occupation')
    expect(body).toHaveProperty('skills')
    expect(body).toHaveProperty('equipment')
  })

  it('should return 405 for non-GET requests', async () => {
    const event = initializeHandlerEvent('POST')
    const context = initializeHandlerContext()

    const response = await handler(event, context) as HandlerResponse

    expect(response.statusCode).toBe(405)
    expect(response.headers).toBeDefined()
    expect(response.headers).toHaveProperty('Content-Type')
    expect(response.headers!['Content-Type']).toBe('application/json')
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body!)
    expect(body.message).toBe('Method Not Allowed')
  })
})

function initializeHandlerContext(): HandlerContext {
    return {
        callbackWaitsForEmptyEventLoop: false,
        functionName: '',
        functionVersion: '',
        invokedFunctionArn: '',
        memoryLimitInMB: '',
        awsRequestId: '',
        logGroupName: '',
        logStreamName: '',
        getRemainingTimeInMillis: function (): number {
            throw new Error('Function not implemented.')
        },
        done: function (error?: Error, result?: any): void {
            throw new Error('Function not implemented.')
        },
        fail: function (error: Error | string): void {
            throw new Error('Function not implemented.')
        },
        succeed: function (messageOrObject: any): void {
            throw new Error('Function not implemented.')
        }
    }
}

function initializeHandlerEvent(method: string): HandlerEvent {
    return {
        httpMethod: method,
        body: null,
        rawUrl: '/api/generate-npc',
        rawQuery: '',
        path: '/api/generate-npc',
        headers: {},
        multiValueHeaders: {},
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        isBase64Encoded: false
    }
}
