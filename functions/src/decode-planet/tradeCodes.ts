interface TradeCode {
  abbreviation: string;
  name: string;
}

const tradeCodesByCondition: Record<string, TradeCode> = {
  As: { abbreviation: 'As', name: 'Asteroid' },
  De: { abbreviation: 'De', name: 'Desert' },
  Fl: { abbreviation: 'Fl', name: 'Fluid Hydrospheres' },
  Ga: { abbreviation: 'Ga', name: 'Garden' },
  He: { abbreviation: 'He', name: 'Hellworld' },
  Ic: { abbreviation: 'Ic', name: 'Ice-capped' },
  Oc: { abbreviation: 'Oc', name: 'Ocean World' },
  Va: { abbreviation: 'Va', name: 'Vacuum' },
  Wa: { abbreviation: 'Wa', name: 'Water World' },
  Ag: { abbreviation: 'Ag', name: 'Agricultural' },
  In: { abbreviation: 'In', name: 'Industrial' },
  Ri: { abbreviation: 'Ri', name: 'Rich' },
  Po: { abbreviation: 'Po', name: 'Poor' },
  Pr: { abbreviation: 'Pr', name: 'Pre-agricultural' },
  Mr: { abbreviation: 'Mr', name: 'Pre-industrial' },
  Hi: { abbreviation: 'Hi', name: 'High population' },
  Lo: { abbreviation: 'Lo', name: 'Low population' },
  Ht: { abbreviation: 'Ht', name: 'High tech' },
  Lt: { abbreviation: 'Lt', name: 'Low tech' },
  Fr: { abbreviation: 'Fr', name: 'Frontier' },
  Cp: { abbreviation: 'Cp', name: 'Corporate' },
  Cx: { abbreviation: 'Cx', name: 'Colony' },
  Fa: { abbreviation: 'Fa', name: 'Farm world' },
  Mi: { abbreviation: 'Mi', name: 'Mining' },
  Mu: { abbreviation: 'Mu', name: 'Multicultural' },
  Na: { abbreviation: 'Na', name: 'Non-agricultural' },
  Pe: { abbreviation: 'Pe', name: 'Penal Settlement' },
  Re: { abbreviation: 'Re', name: 'Reserve' },
  Rs: { abbreviation: 'Rs', name: 'Research Station' },
  Px: { abbreviation: 'Px', name: 'Prison Exile' },
  Tp: { abbreviation: 'Tp', name: 'Trade Paradise' },
  Tu: { abbreviation: 'Tu', name: 'Tourist' },
};

// Individual code check functions
function checkAsteroid(sizeCode: string): boolean {
  return sizeCode === '0';
}

function checkDesert(atmosphereCode: string, hydrographicsCode: string): boolean {
  const thinAtmosphere = ['0', '1', '2', '3'];
  const lowHydro = ['0', '1'];
  return thinAtmosphere.includes(atmosphereCode) && lowHydro.includes(hydrographicsCode);
}

function checkFluidHydrospheres(atmosphereCode: string): boolean {
  const exoticAtmosphere = ['A', 'B', 'C'];
  return exoticAtmosphere.includes(atmosphereCode);
}

function checkGarden(atmosphereCode: string, hydrographicsCode: string): boolean {
  const gardenAtmosphere = ['5', '6', '8'];
  const highHydro = ['4', '5', '6', '7', '8', '9'];
  return gardenAtmosphere.includes(atmosphereCode) && highHydro.includes(hydrographicsCode);
}

function checkHellworld(atmosphereCode: string): boolean {
  const hellAtmosphere = ['B', 'C'];
  return hellAtmosphere.includes(atmosphereCode);
}

function checkIceCapped(hydrographicsCode: string): boolean {
  const iceHydro = ['1', '2', '3'];
  return iceHydro.includes(hydrographicsCode);
}

function checkOceanWorld(hydrographicsCode: string, populationCode: string): boolean {
  const veryHighHydro = ['A', 'B', 'C'];
  const lowPopulation = ['0', '1', '2', '3', '4', '5', '6'];
  return veryHighHydro.includes(hydrographicsCode) && lowPopulation.includes(populationCode);
}

function checkVacuum(atmosphereCode: string): boolean {
  return atmosphereCode === '0';
}

function checkWaterWorld(hydrographicsCode: string, populationCode: string): boolean {
  const veryHighHydro = ['A', 'B', 'C'];
  const lowPopulation = ['0', '1', '2', '3', '4', '5', '6'];
  return veryHighHydro.includes(hydrographicsCode) && !lowPopulation.includes(populationCode);
}

function checkAgricultural(atmosphereCode: string, hydrographicsCode: string, populationCode: string): boolean {
  const respirableAtmosphere = ['4', '5', '6', '8', '9'];
  const highHydro = ['4', '5', '6', '7', '8', '9'];
  const modPopulation = ['5', '6', '7', '8', '9'];
  return respirableAtmosphere.includes(atmosphereCode) && highHydro.includes(hydrographicsCode) && modPopulation.includes(populationCode);
}

function checkIndustrial(populationCode: string, techLevelCode: string): boolean {
  const highPopulation = ['9', 'A', 'B', 'C'];
  const highTech = ['4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  return highPopulation.includes(populationCode) && highTech.includes(techLevelCode);
}

function checkRich(populationCode: string, governmentCode: string): boolean {
  const highPopulation = ['9', 'A', 'B', 'C'];
  const richGovernment = ['4', '6', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  return highPopulation.includes(populationCode) && richGovernment.includes(governmentCode);
}

function checkPoor(populationCode: string, governmentCode: string): boolean {
  const lowPopulation = ['0', '1', '2', '3', '4', '5'];
  const poorGovernment = ['2', '3', '4', '7', '9'];
  return lowPopulation.includes(populationCode) && poorGovernment.includes(governmentCode);
}

function checkPreAgricultural(populationCode: string, techLevelCode: string): boolean {
  const lowPopulation = ['0', '1', '2', '3', '4', '5'];
  const lowTech = ['0', '1', '2', '3'];
  return lowPopulation.includes(populationCode) && lowTech.includes(techLevelCode);
}

function checkPreIndustrial(populationCode: string, techLevelCode: string): boolean {
  const modPopulation = ['4', '5', '6', '7'];
  const preTech = ['0', '1', '2', '3', '4', '5'];
  return modPopulation.includes(populationCode) && preTech.includes(techLevelCode);
}

function checkHighPopulation(populationCode: string): boolean {
  const highPopulation = ['9', 'A', 'B', 'C'];
  return highPopulation.includes(populationCode);
}

function checkLowPopulation(populationCode: string): boolean {
  const lowPopulation = ['0', '1'];
  return lowPopulation.includes(populationCode);
}

function checkHighTech(techLevelCode: string): boolean {
  const highTech = ['C', 'D', 'E', 'F'];
  return highTech.includes(techLevelCode);
}

function checkLowTech(techLevelCode: string): boolean {
  const lowTech = ['0', '1', '2', '3'];
  return lowTech.includes(techLevelCode);
}

function generateTradeCodes(planetCode: string): string[] {
  const sizeCode = planetCode[1];
  const atmosphereCode = planetCode[2];
  const hydrographicsCode = planetCode[3];
  const populationCode = planetCode[4];
  const governmentCode = planetCode[5];
  const techLevelCode = planetCode[7];

  const codes: string[] = [];

  if (checkAsteroid(sizeCode)) codes.push('As');
  if (checkDesert(atmosphereCode, hydrographicsCode)) codes.push('De');
  if (checkFluidHydrospheres(atmosphereCode)) codes.push('Fl');
  if (checkGarden(atmosphereCode, hydrographicsCode)) codes.push('Ga');
  if (checkHellworld(atmosphereCode)) codes.push('He');
  if (checkIceCapped(hydrographicsCode)) codes.push('Ic');
  if (checkOceanWorld(hydrographicsCode, populationCode)) codes.push('Oc');
  if (checkVacuum(atmosphereCode)) codes.push('Va');
  if (checkWaterWorld(hydrographicsCode, populationCode)) codes.push('Wa');
  if (checkAgricultural(atmosphereCode, hydrographicsCode, populationCode)) codes.push('Ag');
  if (checkIndustrial(populationCode, techLevelCode)) codes.push('In');
  if (checkRich(populationCode, governmentCode)) codes.push('Ri');
  if (checkPoor(populationCode, governmentCode)) codes.push('Po');
  if (checkPreAgricultural(populationCode, techLevelCode)) codes.push('Pr');
  if (checkPreIndustrial(populationCode, techLevelCode)) codes.push('Mr');
  if (checkHighPopulation(populationCode)) codes.push('Hi');
  if (checkLowPopulation(populationCode)) codes.push('Lo');
  if (checkHighTech(techLevelCode)) codes.push('Ht');
  if (checkLowTech(techLevelCode)) codes.push('Lt');

  // Remove duplicates
  const uniqueCodes = Array.from(new Set(codes));

  return uniqueCodes;
}

export function decodeTradeCode(planetCode: string): string {
  const codes = generateTradeCodes(planetCode);

  if (codes.length === 0) {
    return 'Non-aligned';
  }

  const fullNames = codes.map(code => tradeCodesByCondition[code]?.name ?? code);

  const abbreviations = codes.join('');

  return `${fullNames.join(', ')} (${abbreviations})`;
}
