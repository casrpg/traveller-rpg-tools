import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import type {
  Characteristics as RemoteCharacteristics,
  NPC as RemoteNPC,
} from "./npc-gen-client/types.gen";
import { generateNpc } from "./npc-gen-client/sdk.gen";
import { createClient, createConfig } from "@hey-api/client-fetch";

const client = createClient(
  createConfig({
    baseUrl: "http://traveller-rpg-api.sir-ragnar.workers.dev",
  })
);

interface CharacteristicValue {
  value: number;
  modifier: number;
}

type Characteristic = "STR" | "DEX" | "END" | "INT" | "EDU" | "SOC";

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type Characteristics = {
  [K in Characteristic]: CharacteristicValue;
};
interface NPC {
  name: string;
  occupation: string;
  characteristics: Characteristics;
  skills: string[];
  equipment: string[];
}
interface SuccessResult {
  data: unknown;
}
interface ErrorResult {
  error: string;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // TODO: Build better and complex equipment list, see https://github.com/Grauenwolf/TravellerTools/blob/9d2a33b990796e5afb7821d87ef6258b688956f5/TravellerTools/Grauenwolf.TravellerTools.Web/wwwroot/App_Data/Equipment.csv
  const equipment = [
    "Portable Computer/2",
    "Commdot",
    "Medkit (TL12)",
    "Laser Pistol (3D+3, Zero-G)",
    "Stunner (3D, Stun)",
    "Truncheon (2D)",
    "Armor: Poly Carapace (+16)",
    "Decryptor (TL12)",
    "Tailored Vacc Suit (+8)",
    "Ballistic Tracking Lenses (TL12)",
  ];

  const randomItem = <T>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];
  const randomItems = <T>(array: T[], count: number): T[] => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  try {
    const result = await generateNpc({
      client,
      body: {
        role: randomItem([
          "pilot",
          "navigator",
          "engineer",
          "steward",
          "medic",
          "marine",
          "gunner",
          "scout",
          "technician",
          "leader",
          "diplomat",
          "entertainer",
          "trader",
          "thug",
        ]),
        citizen_category: randomItem([
          "below_average",
          "average",
          "above_average",
          "exceptional",
        ]),
        experience: randomItem([
          "recruit",
          "rookie",
          "intermediate",
          "regular",
          "veteran",
          "elite",
        ]),
        gender: randomItem(["female", "male", "unspecified"]),
      },
    });

    const isSuccessResult = (result: unknown): result is SuccessResult => typeof result === "object" && result !== null && "data" in result;
    const isErrorResult = (result: unknown): result is ErrorResult => typeof result === "object" && result !== null && "error" in result;

    if (isSuccessResult(result)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      const generatedNPC = result.data as RemoteNPC;
      const capitalizeFirstLetter = (string: string): string =>
        string.charAt(0).toUpperCase() + string.slice(1);

      const characteristicModifier = (value: number): number => {
        /*
        Characteristic score Dice Modifier
            0 or less -3
            1-2 -2
            3-5 -1
            6-8 0
            9-11 +1
            12-14 +2
            15 or higher +3
        */
        if (value <= 0) return -3;
        if (value <= 2) return -2;
        if (value <= 5) return -1;
        if (value <= 8) return 0;
        if (value <= 11) return 1;
        if (value <= 14) return 2;
        return 3;
      };

      const formatCharacteristics = (
        characteristics: RemoteCharacteristics
      ): Characteristics => ({
          STR: {
            value: characteristics.STR,
            modifier: characteristicModifier(characteristics.STR),
          },
          DEX: {
            value: characteristics.DEX,
            modifier: characteristicModifier(characteristics.DEX),
          },
          END: {
            value: characteristics.END,
            modifier: characteristicModifier(characteristics.END),
          },
          INT: {
            value: characteristics.INT,
            modifier: characteristicModifier(characteristics.INT),
          },
          EDU: {
            value: characteristics.EDU,
            modifier: characteristicModifier(characteristics.EDU),
          },
          SOC: {
            value: characteristics.SOC,
            modifier: characteristicModifier(characteristics.SOC),
          },
        });

      const npc: NPC = {
        name: `${generatedNPC.first_name} ${generatedNPC.surname}`,
        occupation: capitalizeFirstLetter(generatedNPC.role),
        characteristics: formatCharacteristics(generatedNPC.characteristics),
        skills: generatedNPC.skills,
        equipment: randomItems(equipment, 2),
      };
      console.log(generatedNPC);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(npc),
      };
    } else {
      console.error(
        "error while calling api",
        isErrorResult(result) ? result.error : result
      );
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Internal Sever Error" }),
      };
    }
  } catch (e) {
    console.error("unexpected error while calling api", e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export { handler };
