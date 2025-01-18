import type { NPC } from '../npc-gen-client/types.gen';
// Make a fetch POST request to https://traveller-gear-api.sir-ragnar.workers.dev/api/v1/characters/equipment with application/json body of NPC

export interface Equipment {
    armour: string | null;
    weapons: string | null;
    tools: string | null;
    commodities: string | null;
    budget: {
        amour: number;
        weapons: number;
        tools: number;
        commodities: number;
        reasoning?: string;
    }
}

export const generateEquipment = async (npc: NPC): Promise<Equipment> => {
    const response = await fetch('https://traveller-gear-api.sir-ragnar.workers.dev/api/v1/characters/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(npc),
    });

    if (!response.ok) {
        throw new Error('Failed to generate equipment');
    }

    const equipment = await response.json() as Equipment;
    return equipment;
};
