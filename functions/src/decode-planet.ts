/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Handler, type HandlerEvent, type HandlerContext } from '@netlify/functions'
interface Body {
  planetCode: string
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    }
  }

  if (event.body == null) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing planet code' })
    }
  }

  let body: Body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    }
  }

  const { planetCode } = body

  const decodedInfo = {
    name: `Planet ${planetCode}`,
    astroport: decodeAstroport(planetCode[0]),
    size: decodeSize(planetCode[1]),
    atmosphere: decodeAtmosphere(planetCode[2]),
    temperature: decodeTemperature(planetCode[3]),
    hydrographics: decodeHydrographics(planetCode[4]),
    population: decodePopulation(planetCode[5]),
    government: decodeGovernment(planetCode[6]),
    lawLevel: decodeLawLevel(planetCode[7]),
    techLevel: decodeTechLevel(planetCode[8])
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(decodedInfo)
  }
}

interface Astroport {
  quality: string
  dockingPrice: string
  fuel: string
  services: string
}

const astroportByCode: Record<string, Astroport> = {
  A: { quality: 'Excelent', dockingPrice: '1D x 1.000 Cr', fuel: 'Refined', services: 'Repairs and all shipyard' },
  B: { quality: 'Good', dockingPrice: '1D x 500 Cr', fuel: 'Refined', services: 'Repairs and spacecraft shipyard' },
  C: { quality: 'Routine', dockingPrice: '1D x 1000 Cr', fuel: 'Raw', services: 'Repairs and all shuttle' },
  D: { quality: 'Poor', dockingPrice: '1D x 10 Cr', fuel: 'Raw', services: 'Limited repairs' },
  E: { quality: 'Frontier', dockingPrice: 'None', fuel: 'None', services: 'None' },
  X: { quality: 'No astroport', dockingPrice: 'None', fuel: 'None', services: 'None' }

}

function decodeAstroport (code: string): string {
  if (!astroportByCode[code]) {
    return 'Unknown'
  }
  const { quality, dockingPrice, fuel, services } = astroportByCode[code]
  return `Quality: ${quality}, dockingPrice: ${dockingPrice}, fuel: ${fuel}, services: ${services}}`
}

interface PlanetSize {
  diameter: string
  jumpDistance: string
  jumpRapidDistance: string
  gravity: string
  example?: string
}

const sizeByCode: Record<string, PlanetSize> = {
  0: { diameter: '<1000 Km', jumpDistance: '100.000 Km', jumpRapidDistance: '90.000', gravity: 'microgravity', example: 'Asteroid' },
  1: { diameter: '1.600 Km', jumpDistance: '160.000 Km', jumpRapidDistance: '144.000', gravity: '0,05g', example: 'Triton' },
  2: { diameter: '3.200 Km', jumpDistance: '320.000 Km', jumpRapidDistance: '288.000', gravity: '0,15g', example: 'Moon' },
  3: { diameter: '4.800 Km', jumpDistance: '480.000 Km', jumpRapidDistance: '432.000', gravity: '0,25g', example: 'Mercury' },
  4: { diameter: '6.400 Km', jumpDistance: '640.000 Km', jumpRapidDistance: '576.000', gravity: '0,35g', example: 'Less than Mars' },
  5: { diameter: '8.000 Km', jumpDistance: '800.000 Km', jumpRapidDistance: '720.000', gravity: '0,45g', example: 'Mars' },
  6: { diameter: '9.600 Km', jumpDistance: '960.000 Km', jumpRapidDistance: '864.000', gravity: '0,7g', example: 'More than Mars' },
  7: { diameter: '11.200 Km', jumpDistance: '1.120.000 Km', jumpRapidDistance: '1.008.000', gravity: '0,9g', example: 'Less than Earth' },
  8: { diameter: '12.800 Km', jumpDistance: '1.280.000 Km', jumpRapidDistance: '1.152.000', gravity: '1g', example: 'Earth' },
  9: { diameter: '14.400 Km', jumpDistance: '1.440.000 Km', jumpRapidDistance: '1.296.000', gravity: '1,25g', example: 'More than Earth' },
  A: { diameter: '16.000 Km', jumpDistance: '1.600.000 Km', jumpRapidDistance: '1.440.000', gravity: '1,4g', example: 'Much more than Earth' }
}

function decodeSize (code: string): string {
  if (!sizeByCode[code]) {
    return 'Unknown'
  }
  const { diameter, jumpDistance, jumpRapidDistance, gravity, example } = sizeByCode[code]
  return `diameter: ${diameter}, jump distance: ${jumpDistance}, jump rapid distance: ${jumpRapidDistance}, gravity: ${gravity} ${example ? `, e.g.: ${example}` : ''}`
}

function decodeAtmosphere (code: string): string {
  const atmospheres = ['None', 'Trace', 'Very Thin', 'Thin', 'Standard', 'Dense', 'Very Dense', 'Exotic']
  return atmospheres[parseInt(code, 16)] || 'Unknown'
}

function decodeTemperature (code: string): string {
  const temperatures = ['Frozen', 'Cold', 'Temperate', 'Hot', 'Boiling']
  return temperatures[parseInt(code, 16)] || 'Unknown'
}

function decodeHydrographics (code: string): string {
  const percentage = parseInt(code, 16) * 10
  return `${percentage}% water`
}

function decodePopulation (code: string): string {
  const populations = ['None', 'Few', 'Hundreds', 'Thousands', 'Millions', 'Billions']
  return populations[parseInt(code, 16)] || 'Unknown'
}

function decodeGovernment (code: string): string {
  const governments = ['None', 'Company/Corporation', 'Participating Democracy', 'Self-Perpetuating Oligarchy', 'Representative Democracy', 'Feudal Technocracy', 'Captive Government', 'Balkanization', 'Civil Service Bureaucracy', 'Impersonal Bureaucracy', 'Charismatic Dictatorship', 'Non-Charismatic Leader', 'Charismatic Oligarchy', 'Religious Dictatorship']
  return governments[parseInt(code, 16)] || 'Unknown'
}

function decodeLawLevel (code: string): string {
  return `Level ${parseInt(code, 16)}`
}

function decodeTechLevel (code: string): string {
  return `TL${parseInt(code, 16)}`
}

export { handler }
