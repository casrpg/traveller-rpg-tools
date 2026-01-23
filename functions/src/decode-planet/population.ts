/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
};

export function decodePopulation(code: string): string {
  const Unknown = 'unknown';
  if (!populationByCode[code]) {
    return Unknown
  }
  const { description, pop, multiplier } = populationByCode[code]
  return `${description}, Population: ${pop}, Multiplier: ${multiplier}`
}
