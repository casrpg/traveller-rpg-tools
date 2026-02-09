interface TradeCode {
  abbreviation: string;
  name: string;
}

const tradeCodesByCondition: Record<string, TradeCode> = {
  As: { abbreviation: 'As', name: 'Asteroid' },
  Ba: { abbreviation: 'Ba', name: 'Barren' },
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
  Ni: { abbreviation: 'Ni', name: 'Non-industrial' },
  Pe: { abbreviation: 'Pe', name: 'Penal Settlement' },
  Re: { abbreviation: 'Re', name: 'Reserve' },
  Rs: { abbreviation: 'Rs', name: 'Research Station' },
  Px: { abbreviation: 'Px', name: 'Prison Exile' },
  Tp: { abbreviation: 'Tp', name: 'Trade Paradise' },
  Tu: { abbreviation: 'Tu', name: 'Tourist' },
};

// Individual code check functions
function checkAsteroid(sizeCode: string, atmosphereCode: string, hydrographicsCode: string): boolean {
  return sizeCode === '0' && atmosphereCode === '0' && hydrographicsCode === '0';
}

function checkDesert(atmosphereCode: string, hydrographicsCode: string): boolean {
  const aridAtmosphere = ['2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  return aridAtmosphere.includes(atmosphereCode) && hydrographicsCode === '0';
}

function checkFluidHydrospheres(atmosphereCode: string, hydrographicsCode: string): boolean {
  const veryHighAtmosphere = ['A', 'B', 'C', 'D', 'E', 'F'];
  const nonZeroHydro = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  return veryHighAtmosphere.includes(atmosphereCode) && nonZeroHydro.includes(hydrographicsCode);
}

function checkGarden(sizeCode: string, atmosphereCode: string, hydrographicsCode: string): boolean {
  const validSize = ['6', '7', '8'];
  const gardenAtmosphere = ['5', '6', '8'];
  const validHydro = ['5', '6', '7'];
  return validSize.includes(sizeCode) && gardenAtmosphere.includes(atmosphereCode) && validHydro.includes(hydrographicsCode);
}

function checkHellworld(atmosphereCode: string): boolean {
  const hellAtmosphere = ['B', 'C'];
  return hellAtmosphere.includes(atmosphereCode);
}

function checkIceCapped(atmosphereCode: string, hydrographicsCode: string): boolean {
  const coldAtmosphere = ['0', '1'];
  const nonZeroHydro = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  return coldAtmosphere.includes(atmosphereCode) && nonZeroHydro.includes(hydrographicsCode);
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
  const veryHighHydro = ['A', 'B', 'C', 'D', 'E', 'F'];
  return veryHighHydro.includes(hydrographicsCode);
}

function checkNonAgricultural(atmosphereCode: string, hydrographicsCode: string, populationCode: string): boolean {
  const lowAtmosphere = ['0', '1', '2', '3'];
  const lowHydro = ['0', '1', '2', '3'];
  const highPopulation = ['6', '7', '8', '9', 'A', 'B', 'C'];
  return lowAtmosphere.includes(atmosphereCode) && lowHydro.includes(hydrographicsCode) && highPopulation.includes(populationCode);
}

function checkAgricultural(sizeCode: string, atmosphereCode: string, hydrographicsCode: string): boolean {
  const validSize = ['4', '5', '6', '7', '8', '9'];
  const validAtmosphere = ['4', '5', '6', '7', '8'];
  const validHydro = ['5', '6', '7'];
  return validSize.includes(sizeCode) && validAtmosphere.includes(atmosphereCode) && validHydro.includes(hydrographicsCode);
}

function checkIndustrial(atmosphereCode: string, populationCode: string): boolean {
  const validAtmosphere = ['0', '1', '2', '4', '7', '9'];
  const highPopulation = ['9', 'A', 'B', 'C'];
  return validAtmosphere.includes(atmosphereCode) && highPopulation.includes(populationCode);
}

function checkRich(atmosphereCode: string, hydrographicsCode: string, governmentCode: string): boolean {
  const allowedAtmosphere = ['6', '8'];
  const highHydro = ['6', '7', '8'];
  const governmentRange = ['4', '5', '6', '7', '8', '9'];
  return allowedAtmosphere.includes(atmosphereCode) && highHydro.includes(hydrographicsCode) && governmentRange.includes(governmentCode);
}

function checkPoor(atmosphereCode: string, hydrographicsCode: string): boolean {
  const aridToThinAtmosphere = ['2', '3', '4', '5'];
  const lowHydro = ['0', '1', '2', '3'];
  return aridToThinAtmosphere.includes(atmosphereCode) && lowHydro.includes(hydrographicsCode);
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
  const lowPopulation = ['0', '1', '2', '3'];
  return lowPopulation.includes(populationCode);
}

function checkNonIndustrial(populationCode: string): boolean {
  const midPopulation = ['4', '5', '6'];
  return midPopulation.includes(populationCode);
}

function checkHighTech(techLevelCode: string): boolean {
  const highTech = ['C', 'D', 'E', 'F'];
  return highTech.includes(techLevelCode);
}

function checkLowTech(techLevelCode: string): boolean {
  const lowTech = ['0', '1', '2', '3', '4', '5'];
  return lowTech.includes(techLevelCode);
}

function checkBarren(populationCode: string, governmentCode: string, lawLevelCode: string): boolean {
  return populationCode === '0' && governmentCode === '0' && lawLevelCode === '0';
}

interface TradeCodeRule {
  code: string;
  check: (...args: string[]) => boolean;
  getArgs: (codes: Record<string, string>) => string[];
}

const tradeCodeRules: TradeCodeRule[] = [
  { code: 'As', check: checkAsteroid, getArgs: (c) => [c.size, c.atmosphere, c.hydrographics] },
  { code: 'Ba', check: checkBarren, getArgs: (c) => [c.population, c.government, c.lawLevel] },
  { code: 'De', check: checkDesert, getArgs: (c) => [c.atmosphere, c.hydrographics] },
  { code: 'Fl', check: checkFluidHydrospheres, getArgs: (c) => [c.atmosphere, c.hydrographics] },
  { code: 'Ga', check: checkGarden, getArgs: (c) => [c.size, c.atmosphere, c.hydrographics] },
  { code: 'He', check: checkHellworld, getArgs: (c) => [c.atmosphere] },
  { code: 'Ic', check: checkIceCapped, getArgs: (c) => [c.atmosphere, c.hydrographics] },
  { code: 'Oc', check: checkOceanWorld, getArgs: (c) => [c.hydrographics, c.population] },
  { code: 'Va', check: checkVacuum, getArgs: (c) => [c.atmosphere] },
  { code: 'Wa', check: checkWaterWorld, getArgs: (c) => [c.hydrographics] },
  { code: 'Na', check: checkNonAgricultural, getArgs: (c) => [c.atmosphere, c.hydrographics, c.population] },
  { code: 'Ni', check: checkNonIndustrial, getArgs: (c) => [c.population] },
  { code: 'Ag', check: checkAgricultural, getArgs: (c) => [c.size, c.atmosphere, c.hydrographics] },
  { code: 'In', check: checkIndustrial, getArgs: (c) => [c.atmosphere, c.population] },
  { code: 'Ri', check: checkRich, getArgs: (c) => [c.atmosphere, c.hydrographics, c.government] },
  { code: 'Po', check: checkPoor, getArgs: (c) => [c.atmosphere, c.hydrographics] },
  { code: 'Pr', check: checkPreAgricultural, getArgs: (c) => [c.population, c.techLevel] },
  { code: 'Mr', check: checkPreIndustrial, getArgs: (c) => [c.population, c.techLevel] },
  { code: 'Hi', check: checkHighPopulation, getArgs: (c) => [c.population] },
  { code: 'Lo', check: checkLowPopulation, getArgs: (c) => [c.population] },
  { code: 'Ht', check: checkHighTech, getArgs: (c) => [c.techLevel] },
  { code: 'Lt', check: checkLowTech, getArgs: (c) => [c.techLevel] },
];

function generateTradeCodes(planetCode: string): string[] {
  const planetCodes = {
    size: planetCode[1],
    atmosphere: planetCode[2],
    hydrographics: planetCode[3],
    population: planetCode[4],
    government: planetCode[5],
    lawLevel: planetCode[6],
    techLevel: planetCode[7],
  };

  const codes = tradeCodeRules
    .filter((rule) => rule.check(...rule.getArgs(planetCodes)))
    .map((rule) => rule.code);

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
