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

export function decodeTechLevel(code: string): string {
  const Unknown = 'unknown';
  const normalizedCode = code.toUpperCase();

  if (techLevelByCode[normalizedCode]===undefined) {
    return Unknown;
  }

  const { name, description, capabilities } = techLevelByCode[normalizedCode];

  return `${name}, Description: ${description}, Capabilities: ${capabilities}`;
}
