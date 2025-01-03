// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from '@hey-api/client-fetch';
import type { GenerateNpcData, GenerateNpcError, GenerateNpcResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Generate a new NPC
 */
export const generateNpc = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GenerateNpcData, ThrowOnError>) => {
    return (options?.client ?? client).post<GenerateNpcResponse, GenerateNpcError, ThrowOnError>({
        ...options,
        url: '/api/npcs/single'
    });
};