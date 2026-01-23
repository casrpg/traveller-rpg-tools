/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
};

export function decodeGovernment(code: string): string {
  const Unknown = 'unknown';
  if (!governmentByCode[code]) {
    return Unknown
  }
  const { name, description, powerSource, structure } = governmentByCode[code.toUpperCase()];
  
  return `${name}, Description: ${description}, Power Source: ${powerSource}, Structure: ${structure}`
}
