/* eslint-disable @typescript-eslint/strict-boolean-expressions */

interface Atmosphere {
  specificDescription: string;
  generalDescription: string;
  pressure: string;
  remarks: string;
}

const atmosphereByCode: Record<string, Atmosphere> = {
  0: { specificDescription: 'Vacuum', generalDescription: 'Vacuum', pressure: '<0.001 atm', remarks: 'Requires a vacc suit' },
  1: { specificDescription: 'Trace', generalDescription: 'Vacuum', pressure: '0.001-0.09 atm', remarks: 'Requires a vacc suit' },
  2: { specificDescription: 'Very thin / Tainted', generalDescription: 'Vacuum', pressure: '0.10-0.42 atm', remarks: 'Requires a filter respirator combination' },
  3: { specificDescription: 'Very thin', generalDescription: 'Vacuum', pressure: '0.10-0.42 atm', remarks: 'Requires a filter respirator combination' },
  4: { specificDescription: 'Thin / Tainted', generalDescription: 'Thin', pressure: '0.43-0.70 atm', remarks: 'Requires a filter mask. Poisoned or similar' },
  5: { specificDescription: 'Thin', generalDescription: 'Thin', pressure: '0.43-0.70 atm', remarks: 'Respirable' },
  6: { specificDescription: 'Standard', generalDescription: 'Standard', pressure: '0.71-1.49 atm', remarks: 'Earthlike' },
  7: { specificDescription: 'Standard / Tainted', generalDescription: 'Standard', pressure: '0.71-1.49 atm', remarks: 'Tainted requires a filter mask' },
  8: { specificDescription: 'Dense', generalDescription: 'Dense', pressure: '1.50-2.49 atm', remarks: 'Respirable' },
  9: { specificDescription: 'Dense / Tainted', generalDescription: 'Dense', pressure: '1.50-2.49 atm', remarks: 'Tainted requires a filter mask' },
  A: { specificDescription: 'Exotic', generalDescription: 'Exotic, Conventional', pressure: 'Varies', remarks: 'Unusual gas mix, requires oxygen tanks' },
  B: { specificDescription: 'Corrosive', generalDescription: 'Exotic, Conventional', pressure: 'Varies', remarks: 'Corrosive environment. Requires Hostile env or vacc suit' },
  C: { specificDescription: 'Insidious', generalDescription: 'Exotic, Conventional', pressure: 'Varies', remarks: 'Corrosive; defeats protection in 2-12 hours' },
  D: { specificDescription: 'Dense, high', generalDescription: 'Exotic, Unusual', pressure: '2.5 atm or greater', remarks: 'Too great at sea level; breathable at high altitudes' },
  E: { specificDescription: 'Ellipsoid', generalDescription: 'Exotic, Unusual', pressure: '0.5 atm or less', remarks: 'Pressure varies from very high at middle to low at ends' },
  F: { specificDescription: 'Thin, low', generalDescription: 'Exotic, Unusual', pressure: 'Varies', remarks: 'Unbreathable except at very low altitudes' }
};

export function decodeAtmosphere(code: string): string {
  const Unknown = 'unknown';
  if (!atmosphereByCode[code]) {
    return Unknown;
  }
  const { specificDescription, generalDescription, pressure, remarks } =
    atmosphereByCode[code];
  return `Specific description: ${specificDescription}, General description: ${generalDescription}, Pressure: ${pressure}, Remarks: ${remarks}`;
}
