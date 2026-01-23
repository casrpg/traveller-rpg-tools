/* eslint-disable @typescript-eslint/strict-boolean-expressions */

interface PlanetSize {
  diameter: string;
  jumpDistance: string;
  jumpRapidDistance: string;
  gravity: string;
  example?: string;
}

const sizeByCode: Record<string, PlanetSize> = {
  0: {
    diameter: '<1000 Km',
    jumpDistance: '100.000 Km',
    jumpRapidDistance: '90.000',
    gravity: 'microgravity',
    example: 'Asteroid',
  },
  1: {
    diameter: '1.600 Km',
    jumpDistance: '160.000 Km',
    jumpRapidDistance: '144.000',
    gravity: '0,05g',
    example: 'Triton',
  },
  2: {
    diameter: '3.200 Km',
    jumpDistance: '320.000 Km',
    jumpRapidDistance: '288.000',
    gravity: '0,15g',
    example: 'Moon',
  },
  3: {
    diameter: '4.800 Km',
    jumpDistance: '480.000 Km',
    jumpRapidDistance: '432.000',
    gravity: '0,25g',
    example: 'Mercury',
  },
  4: {
    diameter: '6.400 Km',
    jumpDistance: '640.000 Km',
    jumpRapidDistance: '576.000',
    gravity: '0,35g',
    example: 'Less than Mars',
  },
  5: {
    diameter: '8.000 Km',
    jumpDistance: '800.000 Km',
    jumpRapidDistance: '720.000',
    gravity: '0,45g',
    example: 'Mars',
  },
  6: {
    diameter: '9.600 Km',
    jumpDistance: '960.000 Km',
    jumpRapidDistance: '864.000',
    gravity: '0,7g',
    example: 'More than Mars',
  },
  7: {
    diameter: '11.200 Km',
    jumpDistance: '1.120.000 Km',
    jumpRapidDistance: '1.008.000',
    gravity: '0,9g',
    example: 'Less than Earth',
  },
  8: {
    diameter: '12.800 Km',
    jumpDistance: '1.280.000 Km',
    jumpRapidDistance: '1.152.000',
    gravity: '1g',
    example: 'Earth',
  },
  9: {
    diameter: '14.400 Km',
    jumpDistance: '1.440.000 Km',
    jumpRapidDistance: '1.296.000',
    gravity: '1,25g',
    example: 'More than Earth',
  },
  A: {
    diameter: '16.000 Km',
    jumpDistance: '1.600.000 Km',
    jumpRapidDistance: '1.440.000',
    gravity: '1,4g',
    example: 'Much more than Earth',
  },
};

export function decodeSize(code: string): string {
  const Unknown = 'unknown';
  if (!sizeByCode[code]) {
    return Unknown;
  }
  const { diameter, jumpDistance, jumpRapidDistance, gravity, example } =
    sizeByCode[code];
  return `diameter: ${diameter}, jump distance: ${jumpDistance}, jump rapid distance: ${jumpRapidDistance}, gravity: ${gravity}, e.g.: ${example}`;
}
