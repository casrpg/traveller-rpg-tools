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
    size: decodeSize(planetCode[0]),
    atmosphere: decodeAtmosphere(planetCode[1]),
    temperature: decodeTemperature(planetCode[2]),
    hydrographics: decodeHydrographics(planetCode[3]),
    population: decodePopulation(planetCode[4]),
    government: decodeGovernment(planetCode[5]),
    lawLevel: decodeLawLevel(planetCode[6]),
    techLevel: decodeTechLevel(planetCode[8])
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(decodedInfo)
  }
}

function decodeSize (code: string): string {
  const sizes = ['Asteroid/Planetoid', 'Small', 'Medium', 'Large', 'Huge']
  return sizes[parseInt(code, 16)] || 'Unknown'
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
