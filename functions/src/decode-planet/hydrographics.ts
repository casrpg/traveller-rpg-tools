/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
};

export function decodeHydrographics(code: string): string {
  const Unknown = 'unknown';
  if (!hydroByCode[code]) {
    return Unknown
  }
  const { description, h2oPerc, remarks } = hydroByCode[code]
  return `${description}, %H2O: ${h2oPerc}, Remarks: ${remarks}`
}
