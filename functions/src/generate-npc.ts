import { type Handler, type HandlerEvent, type HandlerContext } from '@netlify/functions'
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
      body: JSON.stringify({ message: 'Method Not Allowed' })
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
