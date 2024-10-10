import { type Handler } from '@netlify/functions'

const generateNPC: Handler = async (event, context) => {
  // This is a mock implementation. In a real scenario, you'd have more complex logic here.
  const names = ['Jean-Luc Picard', 'William Riker', 'Data', 'Geordi La Forge', 'Worf', 'Beverly Crusher', 'Deanna Troi']
  const occupations = ['Starship Captain', 'First Officer', 'Science Officer', 'Engineer', 'Security Officer', 'Medical Officer', 'Counselor']
  const skills = ['Leadership', 'Diplomacy', 'Tactics', 'Engineering', 'Combat', 'Medicine', 'Empathy', 'Navigation', 'Xenobiology']
  const equipment = ['Phaser', 'Tricorder', 'Communicator Badge', 'Medical Kit', 'Engineering Tool Kit', 'Universal Translator']

  const randomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)]
  const randomItems = (array: string[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const npc = {
    name: randomItem(names),
    occupation: randomItem(occupations),
    skills: randomItems(skills, 3),
    equipment: randomItems(equipment, 2),
  }

  return {
    statusCode: 200,
    body: JSON.stringify(npc),
  }
}

export { generateNPC }
