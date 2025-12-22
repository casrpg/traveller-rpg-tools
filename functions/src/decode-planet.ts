/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Handler, type HandlerEvent, type HandlerContext } from '@netlify/functions'
interface Body {
  planetCode: string
}

const Unknown = 'unknown'

// eslint-disable-next-line @typescript-eslint/require-await
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
    hydrographics: decodeHydrographics(planetCode[3]),
    population: decodePopulation(planetCode[4]),
    government: decodeGovernment(planetCode[5]),
    lawLevel: decodeLawLevel(planetCode[6]),
    techLevel: decodeTechLevel(planetCode[7])
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

interface Hydrographics {
  description: string
  h2oPerc: string
  remarks: string
}

const hydroByCode: Record<string, Hydrographics> = {
  0: { description: 'Desert world', h2oPerc: '0%-5%', remarks: 'It is a super arid (anhydrous) environment.'},
  1: { description: 'Dry World', h2oPerc: '6%-15%', remarks: 'It is an arid (near anhydrous) environment.' },
  2: { description: 'Dry World', h2oPerc: '16%-25%', remarks: 'It is a standard (wet) environment.' },
  3: { description: 'Wet World', h2oPerc: '26%-35%', remarks: 'It is a normative (wet) environment.' },
  4: { description: 'Wet World', h2oPerc: '36%-45%', remarks: 'It is a normative (wet) environment.' },
  5: { description: 'Average Wet World', h2oPerc: '46%-55%', remarks: 'It is a normative (wet) environment.' },
  6: { description: 'Wet World', h2oPerc: '56%-65%', remarks: 'It is a normative (wet) environment.' },
  7: { description: 'Wet World', h2oPerc: '66%-75%', remarks: 'It is a normative (wet) environment.' },
  8: { description: 'Very Wet World', h2oPerc: '76%-85%', remarks: 'It is a standard (wet) environment.' },
  9: { description: 'Very Wet World', h2oPerc: '86%-95%', remarks: 'It is a marine (near superhydrous) environment.' },
  A: { description: 'Very Wet World', h2oPerc: '96%-100%', remarks: 'It is a supermarine (superhydrous) environment.' },
}
function decodeHydrographics (code: string): string {
  if (!hydroByCode[code]) {
    return Unknown
  }
  const { description, h2oPerc, remarks } = hydroByCode[code]
  return `Description: ${description}, %H2O: ${h2oPerc}, Remarks: ${remarks}`
}

interface Population {
  description: string
  pop: string
  multiplier: string
}

const populationByCode: Record<string, Population> = {
  0: { description: 'None', pop: '0', multiplier: '0'},
  1: { description: 'Low', pop: '1 to 99', multiplier: 'P0'},
  2: { description: 'Low', pop: '100 to 999', multiplier: 'P00'},
  3: { description: 'Low', pop: '1.000 to 9.999', multiplier: 'P.000'},
  4: { description: 'Moderate', pop: '10.000 to 99.999', multiplier: 'P0.000'},
  5: { description: 'Moderate', pop: '100.000 to 999.999', multiplier: 'P00.000'},
  6: { description: 'Moderate', pop: '1 Million to just under 10 Millions', multiplier: 'P.000.000'},
  7: { description: 'Moderate', pop: '10 Million to just under 100 Millions', multiplier: 'P0.000.000'},
  8: { description: 'Pre-High', pop: '100 Millions to just under 1 Billion', multiplier: 'P00.000.000'},
  9: { description: 'High', pop: '1 Billion to just under 10 Billions', multiplier: 'P.000.000.000'},
  A: { description: 'High', pop: '10 Billions to just under 100 Billions', multiplier: 'P0.000.000.000'},
  B: { description: 'High', pop: '100 Billions to just under 1 Trillion', multiplier: 'P00.000.000.000'},
  C: { description: 'Very High', pop: '1 Trillion to just under 10 Trillions', multiplier: 'P.000.000.000.000'},

}

function decodePopulation (code: string): string {
  if (!populationByCode[code]) {
    return Unknown
  }
  const { description, pop, multiplier } = populationByCode[code]
  return `Description: ${description}, Population: ${pop}, Multiplier: ${multiplier}`
}

interface Government {
  name: string
  description: string
  powerSource: string
  structure: string
}

const governmentByCode: Record<string, Government> = {
  0: { name: 'None', description: 'In many cases, tribal, clan or family bonds predominate', powerSource: 'Democracy', structure: 'Anarchy or Confederation'},
  1: { name: 'Company/Corporation', description: 'Government by a company managerial elite, citizens are company employees.', powerSource: 'Oligarchy', structure: 'Unitary State'},
  2: { name: 'Participating Democracy', description: 'Government by advice and consent of the citizen.', powerSource: 'Democracy', structure: 'Confederation or Federation'},
  3: { name: 'Self-Perpetuating Oligarchy', description: 'Government by a restricted group, with little or no input from citizens.', powerSource: 'Oligarchy', structure: 'Unitary State' },
  4: { name: 'Representative Democracy', description: 'Government by elected representatives.', powerSource: 'Democracy', structure: 'Federation' },
  5: { name: 'Feudal Technocracy', description: 'Government by specific individuals for those who can access technology.', powerSource: 'Oligarchy', structure: 'Unitary State' },
  6: { name: 'Captive Government', description: 'Government by a leadership answerable to an outside power.', powerSource: 'Autocracy', structure: 'Unitary State' },
  7: { name: 'Balkanisation', description: 'No central government; many small warring states or factions.', powerSource: 'Variable', structure: 'Anarchy' },
  8: { name: 'Civil Service Bureaucracy', description: 'Government by agencies which are managed by civil servants.', powerSource: 'Oligarchy', structure: 'Unitary State' },
  9: { name: 'Impersonal Bureaucracy', description: 'Government by rigid, established rules and regulations.', powerSource: 'Oligarchy', structure: 'Unitary State' },
  A: { name: 'Charismatic Dictator', description: 'Government by a single leader enjoying the confidence of the citizens.', powerSource: 'Autocracy', structure: 'Unitary State' },
  B: { name: 'Non-Charismatic Leader', description: 'Government by a single leader who has little or no public support.', powerSource: 'Autocracy', structure: 'Unitary State' },
  C: { name: 'Charismatic Oligarchy', description: 'Government by a group which has the confidence of the citizens.', powerSource: 'Oligarchy', structure: 'Unitary State' },
  D: { name: 'Religious Dictatorship', description: 'Government by a religious leader or organization.', powerSource: 'Autocracy', structure: 'Unitary State' },
  E: { name: 'Religious Autocracy', description: 'Government by a single religious leader.', powerSource: 'Autocracy', structure: 'Unitary State' },
  F: { name: 'Totalitarian Oligarchy', description: 'Government by an all-powerful group, restricting all individual freedom.', powerSource: 'Oligarchy', structure: 'Unitary State' },

}
function decodeGovernment (code: string): string {
  if (!governmentByCode[code]) {
    return Unknown
  }
  const { name, description, powerSource, structure } = governmentByCode[code.toUpperCase()];
  
  return `Name: ${name}, Description: ${description}, Power Source: ${powerSource}, Structure: ${structure}`
}

interface LawLevel {
  name: string;
  description: string;
  prohibitions: string;
}

const lawLevelByCode: Record<string, LawLevel> = {
  0: { name: 'None', description: 'No prohibitions', prohibitions: 'None' },
  1: { name: 'Low Law', description: 'Highly restrictive weapons banned', prohibitions: 'Body pistols, explosives, poison gas' },
  2: { name: 'Low Law', description: 'Portable energy weapons banned', prohibitions: 'Laser weapons, flamethrowers' },
  3: { name: 'Low Law', description: 'Military weapons banned', prohibitions: 'Heavy weapons, machine guns' },
  4: { name: 'Moderate Law', description: 'Light assault weapons banned', prohibitions: 'Submachine guns, assault rifles' },
  5: { name: 'Moderate Law', description: 'Personal concealable weapons banned', prohibitions: 'Concealable firearms' },
  6: { name: 'Moderate Law', description: 'Most firearms banned', prohibitions: 'All firearms except shotguns' },
  7: { name: 'Moderate Law', description: 'Shotguns banned', prohibitions: 'All firearms' },
  8: { name: 'High Law', description: 'Long blades banned', prohibitions: 'All firearms, blades over 10cm' },
  9: { name: 'High Law', description: 'All weapons banned', prohibitions: 'Anything that can be used as a weapon' },
  A: { name: 'Extreme Law', description: 'Everything is regulated', prohibitions: 'All weapons, personal surveillance common' },
  B: { name: 'Extreme Law', description: 'Rigid control of movement', prohibitions: 'Severe restrictions on all items and travel' },
  C: { name: 'Extreme Law', description: 'Totalitarian control', prohibitions: 'Possession of any unauthorized item is a crime' },
  D: { name: 'Extreme Law', description: 'Restricted Information', prohibitions: 'Censorship, rigid control of data and media' },
  E: { name: 'Extreme Law', description: 'Restricted Culture', prohibitions: 'Totalitarian control of behavior and customs' },
  F: { name: 'Extreme Law', description: 'Total Prison State', prohibitions: 'Every action is monitored and controlled' }
};

function decodeLawLevel(code: string): string {
  const normalizedCode = code.toUpperCase();
  
  if (!lawLevelByCode[normalizedCode]) {
    return "Unknown";
  }
  
  const { name, description, prohibitions } = lawLevelByCode[normalizedCode];
  
  return `Name: ${name}, Description: ${description}, Prohibitions: ${prohibitions}`;
}

interface TechLevel {
  name: string;
  description: string;
  capabilities: string;
}

const techLevelByCode: Record<string, TechLevel> = {
  0: { name: 'Primitive', description: 'Stone Age tech', capabilities: 'Fire, primitive tools' },
  1: { name: 'Primitive', description: 'Bronze/Iron Age tech', capabilities: 'Basic writing, sailing' },
  2: { name: 'Primitive', description: 'Renaissance tech', capabilities: 'Printing press, early firearms' },
  3: { name: 'Early Industrial', description: 'Steam power', capabilities: 'Mass production, trains' },
  4: { name: 'Industrial', description: 'Internal combustion', capabilities: 'Early aircraft, radio' },
  5: { name: 'Pre-Stellar', description: 'Electronic Age', capabilities: 'Computers, television, jet engines' },
  6: { name: 'Pre-Stellar', description: 'Nuclear Age', capabilities: 'Atomic power, early spaceflight' },
  7: { name: 'Pre-Stellar', description: 'Digital Age', capabilities: 'Personal computers, orbital satellites' },
  8: { name: 'Pre-Stellar', description: 'Early Space Age', capabilities: 'Permanent orbital bases, moon landings' },
  9: { name: 'Early Stellar', description: 'Early Jump Age', capabilities: 'Jump Drive-1, Gravity manipulators' },
  A: { name: 'Early Stellar', description: 'Gravitic Age', capabilities: 'Jump Drive-2, Grav vehicles' },
  B: { name: 'Average Stellar', description: 'High-Tech Age', capabilities: 'Jump Drive-3, Large starships' },
  C: { name: 'Average Stellar', description: 'Advanced Gravitics', capabilities: 'Jump Drive-4, Meson guns' },
  D: { name: 'High Stellar', description: 'High-Tech Stellar', capabilities: 'Jump Drive-5, Advanced AI' },
  E: { name: 'High Stellar', description: 'Extreme Stellar', capabilities: 'Jump Drive-6, Anti-matter' },
  F: { name: 'High Stellar', description: 'Miraculous Tech', capabilities: 'Anagathics, Dyson spheres' },
  G: { name: 'Galactic', description: 'God-like Tech', capabilities: 'Matter transport, planet engineering' }
};

function decodeTechLevel(code: string): string {
  const normalizedCode = code.toUpperCase();

  if (!techLevelByCode[normalizedCode]) {
    return "Unknown";
  }

  const { name, description, capabilities } = techLevelByCode[normalizedCode];

  return `Name: ${name}, Description: ${description}, Capabilities: ${capabilities}`;
}
export { handler }
