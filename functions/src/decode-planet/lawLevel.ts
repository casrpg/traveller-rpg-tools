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

export function decodeLawLevel(code: string): string {
  const Unknown = 'unknown';
  const normalizedCode = code.toUpperCase();
  
  if (lawLevelByCode[normalizedCode]===undefined) {
    return Unknown;
  }
  
  const { name, description, prohibitions } = lawLevelByCode[normalizedCode];
  
  return `${name}, Description: ${description}, Prohibitions: ${prohibitions}`;
}
