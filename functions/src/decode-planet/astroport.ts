/* eslint-disable @typescript-eslint/strict-boolean-expressions */

interface Astroport {
  quality: string;
  dockingPrice: string;
  fuel: string;
  services: string;
}

const astroportByCode: Record<string, Astroport> = {
  A: {
    quality: 'Excelent',
    dockingPrice: '1D x 1.000 Cr',
    fuel: 'Refined',
    services: 'Repairs and all shipyard',
  },
  B: {
    quality: 'Good',
    dockingPrice: '1D x 500 Cr',
    fuel: 'Refined',
    services: 'Repairs and spacecraft shipyard',
  },
  C: {
    quality: 'Routine',
    dockingPrice: '1D x 1000 Cr',
    fuel: 'Raw',
    services: 'Repairs and all shuttle',
  },
  D: {
    quality: 'Poor',
    dockingPrice: '1D x 10 Cr',
    fuel: 'Raw',
    services: 'Limited repairs',
  },
  E: {
    quality: 'Frontier',
    dockingPrice: 'None',
    fuel: 'None',
    services: 'None',
  },
  X: {
    quality: 'No astroport',
    dockingPrice: 'None',
    fuel: 'None',
    services: 'None',
  },
};

export function decodeAstroport(code: string): string {
  const Unknown = 'unknown';
  if (!astroportByCode[code]) {
    return Unknown;
  }
  const { quality, dockingPrice, fuel, services } = astroportByCode[code];
  return `quality: ${quality}, docking price: ${dockingPrice}, fuel: ${fuel}, services: ${services}`;
}
