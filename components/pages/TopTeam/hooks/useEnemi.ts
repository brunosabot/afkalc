import factions from "../../../../data/enemies.json";

interface Enemi {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
  image?: string;
}

interface Faction {
  faction: string;
  characters: Enemi[];
}

const factionJson = factions as Faction[];

const defaultEnemies: Enemi[] = [];
const enemies: Enemi[] = factionJson.reduce(
  (acc, faction: Faction) => [...acc, ...faction.characters],
  defaultEnemies
);

function getEnemi(enemi?: number) {
  return enemies.find((character) => character.id === enemi);
}

export default function useEnemi() {
  return { getEnemi };
}
