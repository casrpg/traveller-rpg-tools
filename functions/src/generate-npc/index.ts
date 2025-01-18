import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import type { NPC as RemoteNPC } from './npc-gen-client/types.gen'
import { generateNpc } from './npc-gen-client/sdk.gen'
import { createClient, createConfig } from '@hey-api/client-fetch'
import { type Equipment, generateEquipment } from './npc-gear-client/generateEquipment'

const client = createClient(createConfig({
  baseUrl: 'http://traveller-rpg-api.sir-ragnar.workers.dev'
}))
interface NPC {
  name: string
  occupation: string
  skills: string[]
  equipment: string[]
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

    try {
        const result = await generateNpc({
            client,
            body: {
              role: randomItem(['pilot', 'navigator', 'engineer', 'steward', 'medic', 'marine', 'gunner', 'scout', 'technician', 'leader', 'diplomat', 'entertainer', 'trader', 'thug']),
              citizen_category: randomItem(['below_average', 'average', 'above_average', 'exceptional']),
              experience: randomItem(['recruit', 'rookie', 'intermediate', 'regular', 'veteran', 'elite']),
              gender: randomItem(['female', 'male', 'unspecified'])
          }
        })
        
        if (result.error == null) {
          const generatedNPC = result.data

          const equipment = await getEquipment(generatedNPC)

          const capitalizeFirstLetter = (string: string):string => string.charAt(0).toUpperCase() + string.slice(1)

          const npc: NPC = {
            name: generatedNPC.first_name + ' ' + generatedNPC.surname,
            occupation: capitalizeFirstLetter(generatedNPC.role),
            skills: generatedNPC.skills,
            equipment,
          }
          console.log(generatedNPC)
          return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(npc)
            }
        } else {
          console.error('error while calling api', result.error)
          return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Sever Error' })
          }
        }
    } catch(e) {
        console.error('unexpected error while calling api', e)
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Internal Server Error' })
        }
    }
}

function randomItem<T>(array: T[]): T { return array[Math.floor(Math.random() * array.length)] }
function randomItems<T>(array: T[], count: number): T[]  {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

async function getEquipment(npc: RemoteNPC): Promise<string[]> {
 
  let equipmentDetail: Equipment;
  try{
    equipmentDetail = await generateEquipment(npc);
  } catch(e) {
    console.error('error while getting equipment', e);
    const fallbackEquipment = [
      'Portable Computer/2', 
      'Commdot', 
      'Medkit (TL12)',
      'Laser Pistol (3D+3, Zero-G)', 
      'Stunner (3D, Stun)', 
      'Truncheon (2D)', 
      'Armor: Poly Carapace (+16)', 
      'Decryptor (TL12)',
      'Tailored Vacc Suit (+8)',
      'Ballistic Tracking Lenses (TL12)',
    ];
    return randomItems(fallbackEquipment, 2)
  }
  return [equipmentDetail.armour, equipmentDetail.weapons, equipmentDetail.tools, equipmentDetail.commodities].filter(e => e != null);
}

export { handler }
