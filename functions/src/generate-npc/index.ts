import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { createClient, type NormalizeOAS } from 'fets'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import openAPIDoc from './api.json'

type Client = NormalizeOAS<typeof openAPIDoc>
const client = createClient({
  endpoint: 'http://traveller-rpg-api.sir-ragnar.workers.dev',
}) as Client


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
  
  const names = ['Jean-Luc Picard', 'William Riker', 'Data', 'Geordi La Forge', 'Worf', 'Beverly Crusher', 'Deanna Troi']
  const occupations = ['Starship Captain', 'First Officer', 'Science Officer', 'Engineer', 'Security Officer', 'Medical Officer', 'Counselor']
  const skills = ['Leadership', 'Diplomacy', 'Tactics', 'Engineering', 'Combat', 'Medicine', 'Empathy', 'Navigation', 'Xenobiology']
  const equipment = ['Phaser', 'Tricorder', 'Communicator Badge', 'Medical Kit', 'Engineering Tool Kit', 'Universal Translator']
  
  const randomItem = (array: string[]): string => array[Math.floor(Math.random() * array.length)]
  const randomItems = (array: string[], count: number): string[] => {
      const shuffled = array.sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const response = await client['/api/npcs/single'].post({ 
          json: {
              role: randomItem(['diplomat', 'engineer', 'entertainer', 'gunner', 'leader', 'marine', 'medic', 'navigator', 'pilot', 'scout', 'steward', 'technician', 'thug', 'trader']),
              citizen_category: randomItem(['below_average', 'average', 'above_average', 'exceptional']),
              experiences: randomItem(['recruit', 'rookie', 'intermediate', 'regular', 'veteran', 'elite']),
              gender: randomItem(['female', 'male', 'unspecified'])
          }
        })
        const generatedNPC = await response.json()
        const npc: NPC = {
            name: generatedNPC['first_name'] + ' ' + generatedNPC['surname'],
            occupation: generatedNPC.role,
            skills: generatedNPC.skills,
            equipment: [],
        }
        console.log(generatedNPC)
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(npc)
          }
    }catch(e){
        console.error('error while calling api', e)
    }

  const npc: NPC = {
    name: randomItem(names),
    occupation: randomItem(occupations),
    skills: randomItems(skills, 3),
    equipment: randomItems(equipment, 2)
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(npc)
  }
}

export { handler }
