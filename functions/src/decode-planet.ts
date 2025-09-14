/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type { Context } from '@netlify/functions'

interface Body {
  planetCode: string
}

const Unknown = 'unknown'

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Method Not Allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  const rawBody = await req.text()
  if (!rawBody) {
    return new Response(
      JSON.stringify({ error: 'Missing planet code' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  let body: Body
  try {
    body = JSON.parse(rawBody)
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
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

  return new Response(
    JSON.stringify(decodedInfo),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
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
    return Unknown
  }
  const { quality, dockingPrice, fuel, services } = astroportByCode[code]
  return `quality: ${quality}, docking price: ${dockingPrice}, fuel: ${fuel}, services: ${services}`
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
    return Unknown
  }
  const { diameter, jumpDistance, jumpRapidDistance, gravity, example } = sizeByCode[code]
  return `diameter: ${diameter}, jump distance: ${jumpDistance}, jump rapid distance: ${jumpRapidDistance}, gravity: ${gravity}, e.g.: ${example}`
}

interface Atmosphere {
  specificDescription: string
  generalDescription: string
  pressure: string
  remarks: string
}

const AtmosphereByCode: Record<string, Atmosphere> = {
  0: { specificDescription: 'Vacuum', generalDescription: 'Vacuum', pressure: '<0.001 atm', remarks: 'Requires a vacc suit' },
  1: { specificDescription: 'Trace', generalDescription: 'Vacuum', pressure: '0.001-0.09 atm', remarks: 'Requires a vacc suit' },
  2: { specificDescription: 'Very thin / Tainted', generalDescription: 'Vacuum', pressure: '0.10-0.42 atm', remarks: 'Requires a filter respirator combination' },
  3: { specificDescription: 'Very thin', generalDescription: 'Vacuum', pressure: '0.10-0.42 atm', remarks: 'Requires a filter respirator combination' },
  4: { specificDescription: 'Thin / Tainted', generalDescription: 'Thin', pressure: '0.43-0.70 atm', remarks: 'Requires a filter mask. Poissoned or something like that' },
  5: { specificDescription: 'Thin', generalDescription: 'Thin', pressure: '0.43-0.70 atm', remarks: 'Respirable' },
  6: { specificDescription: 'Standard', generalDescription: 'Standard', pressure: '0.71-1.49 atm', remarks: 'Earthlike' },
  7: { specificDescription: 'Standard / Tainted', generalDescription: 'Standard', pressure: '0.71-1.49 atm', remarks: 'Tainted requires a filter mask' },
  8: { specificDescription: 'Dense', generalDescription: 'Dense', pressure: '	1.50-2.49 atm', remarks: 'Respirable' },
  9: { specificDescription: 'Dense / Tainted', generalDescription: 'Dense', pressure: '1.50-2.49 atm', remarks: 'Tainted requires a filter mask' },
  A: { specificDescription: 'Exotic', generalDescription: 'Exotic , Conventional', pressure: 'Varies', remarks: 'An unusual gas mix which requires oxygen tanks' },
  B: { specificDescription: 'Corrosive', generalDescription: 'Exotic , Conventional', pressure: 'Varies', remarks: 'A concentrated gas mix or unusual temperature creates a corrosive environment. Requires a Hostile environment suit or vacc suit.' },
  C: { specificDescription: 'Insidious', generalDescription: 'Exotic, Conventional', pressure: 'Varies', remarks: 'Similar to a corrosive atmosphere, but extreme conditions cause the corrosive effects to defeat any protective measures in 2 to 12 hours.' },
  D: { specificDescription: 'Dense, high', generalDescription: 'Exotic, Unusual', pressure: '2.5 atm or greater', remarks: 'Pressure at or below sea level is too great to support life but is breathable at higher altitudes.' },
  E: { specificDescription: 'Ellipsoid', generalDescription: 'Exotic, Unusual', pressure: '0.5 atm or less', remarks: 'The world’s surface is ellipsoidal, not spherical. Because the atmosphere remains spherical, surface atmospheric pressure ranges from very high at the middle to very low at the ends.' },
  F: { specificDescription: 'Thin, low', generalDescription: 'Exotic, Unusual', pressure: 'Varies', remarks: 'The atmosphere is un-breathable at most altitudes except the very low ones' }
}

function decodeAtmosphere (code: string): string {
  if (!AtmosphereByCode[code]) {
    return Unknown
  }
  const { specificDescription, generalDescription, pressure, remarks } = AtmosphereByCode[code]
  return `Specific description: ${specificDescription}, General description: ${generalDescription}, Pressure: ${pressure}, Remarks: ${remarks}`
}


function decodeTemperature (code: string): string {
  const temperatures = ['Frozen', 'Cold', 'Temperate', 'Hot', 'Boiling']
  return temperatures[parseInt(code, 16)] || Unknown
}

function decodeHydrographics (code: string): string {
  const percentage = parseInt(code, 16) * 10
  return `${percentage}% water`
}

function decodePopulation (code: string): string {
  const populations = ['None', 'Few', 'Hundreds', 'Thousands', 'Millions', 'Billions']
  return populations[parseInt(code, 16)] || Unknown
}

function decodeGovernment (code: string): string {
  const governments = ['None', 'Company/Corporation', 'Participating Democracy', 'Self-Perpetuating Oligarchy', 'Representative Democracy', 'Feudal Technocracy', 'Captive Government', 'Balkanization', 'Civil Service Bureaucracy', 'Impersonal Bureaucracy', 'Charismatic Dictatorship', 'Non-Charismatic Leader', 'Charismatic Oligarchy', 'Religious Dictatorship']
  return governments[parseInt(code, 16)] || Unknown
}

function decodeLawLevel (code: string): string {
  return `Level ${parseInt(code, 16)}`
}

function decodeTechLevel (code: string): string {
  return `TL${parseInt(code, 16)}`
}
