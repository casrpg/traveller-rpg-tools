import type { Context } from '@netlify/functions';
import { decodeAstroport } from './astroport';
import { decodeSize } from './size';
import { decodeAtmosphere } from './atmosphere';
import { decodeHydrographics } from './hydrographics';
import { decodePopulation } from './population';
import { decodeGovernment } from './government';
import { decodeLawLevel } from './lawLevel';
import { decodeTechLevel } from './techLevel';

interface Body {
  planetCode: string;
}

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawBody = await req.text();
  if (rawBody === '') {
    return new Response(JSON.stringify({ error: 'Missing planet code' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Body;
  try {
    body = JSON.parse(rawBody);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { planetCode } = body;

  const decodedInfo = {
    name: `Planet ${planetCode}`,
    astroport: decodeAstroport(planetCode[0]),
    size: decodeSize(planetCode[1]),
    atmosphere: decodeAtmosphere(planetCode[2]),
    hydrographics: decodeHydrographics(planetCode[3]),
    population: decodePopulation(planetCode[4]),
    government: decodeGovernment(planetCode[5]),
    lawLevel: decodeLawLevel(planetCode[6]),
    techLevel: decodeTechLevel(planetCode[7])
  }

  return new Response(JSON.stringify(decodedInfo), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
