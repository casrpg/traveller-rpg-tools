import { type Handler } from '@netlify/functions'

const decodePlanet: Handler = async (event, context) => {
  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing planet code' }) }
  }

  const { planetCode } = JSON.parse(event.body)

  // This is a simplified decoder. In a real scenario, you'd have more complex logic here.
  const decodedInfo = {
    name: `Planet ${planetCode}`,
    size: decodeSize(planetCode[0]),
    atmosphere: decodeAtmosphere(planetCode[1]),
    temperature: decodeTemperature(planetCode[2]),
    hydrographics: decodeHydrographics(planetCode[3]),
    population: decodePopulation(planetCode[4]),
    government: decodeGovernment(planetCode[5]),
    lawLevel: decodeLawLevel(planetCode[6]),
    techLevel: decodeTechLevel(planetCode[8]),
  }

  return {
    statusCode: 200,
    body: JSON.stringify(decodedInfo),
  }
}

// Helper functions to decode each characteristic
function decodeSize(code: string): string {
  const sizes = ['Asteroid/Planetoid', 'Small', 'Medium', 'Large', 'Huge']
  return sizes[parseInt(code, 16)] || 'Unknown'
}

function decodeAtmosphere(code: string): string {
  const atmospheres = ['None', 'Trace', 'Very Thin', 'Thin', 'Standard', 'Dense', 'Very Dense', 'Exotic']
  return atmospheres[parseInt(code, 16)] || 'Unknown'
}

function decodeTemperature(code: string): string {
  const temperatures = ['Frozen', 'Cold', 'Temperate', 'Hot', 'Boiling']
  return temperatures[parseInt(code, 16)] || 'Unknown'
}

function decodeHydrographics(code: string): string {
  const percentage = parseInt(code, 16) * 10
  return `${percentage}% water`
}

function decodePopulation(code: string): string {
  const populations = ['None', 'Few', 'Hundreds', 'Thousands', 'Millions', 'Billions']
  return populations[parseInt(code, 16)] || 'Unknown'
}

function decodeGovernment(code: string): string {
  const governments = ['None', 'Company/Corporation', 'Participating Democracy', 'Self-Perpetuating Oligarchy', 'Representative Democracy', 'Feudal Technocracy', 'Captive Government', 'Balkanization', 'Civil Service Bureaucracy', 'Impersonal Bureaucracy', 'Charismatic Dictatorship', 'Non-Charismatic Leader', 'Charismatic Oligarchy', 'Religious Dictatorship']
  return governments[parseInt(code, 16)] || 'Unknown'
}

function decodeLawLevel(code: string): string {
  return `Level ${parseInt(code, 16)}`
}

function decodeTechLevel(code: string): string {
  return `TL${parseInt(code, 16)}`
}

export { decodePlanet }
