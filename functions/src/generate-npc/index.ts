import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { generateNpc } from './npc-gen-client/sdk.gen'
import { createClient, createConfig } from '@hey-api/client-fetch'

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
  
  const names = ['Jean-Luc Picard', 'William Riker', 'Data', 'Geordi La Forge', 'Worf', 'Beverly Crusher', 'Deanna Troi']
  const occupations = ['Starship Captain', 'First Officer', 'Science Officer', 'Engineer', 'Security Officer', 'Medical Officer', 'Counselor']
  const skills = ['Leadership', 'Diplomacy', 'Tactics', 'Engineering', 'Combat', 'Medicine', 'Empathy', 'Navigation', 'Xenobiology']
  // TODO: Build better and complex equipment list, see https://github.com/Grauenwolf/TravellerTools/blob/9d2a33b990796e5afb7821d87ef6258b688956f5/TravellerTools/Grauenwolf.TravellerTools.Web/wwwroot/App_Data/Equipment.csv
  const equipment = [
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
  ]
  
  const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]
  const randomItems = <T>(array: T[], count: number): T[] => {
      const shuffled = array.sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
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
          const capitalizeFirstLetter = (string: string):string => string.charAt(0).toUpperCase() + string.slice(1)

          const npc: NPC = {
            name: generatedNPC.first_name + ' ' + generatedNPC.surname,
            occupation: capitalizeFirstLetter(generatedNPC.role),
            skills: generatedNPC.skills,
            equipment: randomItems(equipment, 2),
          }
          console.log(generatedNPC)
          return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(npc)
            }
        } else {
          console.error('error while calling api', result.error)
        }
    }catch(e){
        console.error('unexpected error while calling api', e)
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
