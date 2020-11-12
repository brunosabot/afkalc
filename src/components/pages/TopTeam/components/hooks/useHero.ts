import factions from "../../../../../data/heroes.json";

interface Hero {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
}

interface Faction {
  faction: string;
  characters: Hero[];
}

const factionJson = factions as Faction[];

const defaultHeroes: Hero[] = [];
const heroes: Hero[] = factionJson.reduce((acc, faction: Faction) => {
  return [...acc, ...faction.characters];
}, defaultHeroes);

function getHero(hero?: number) {
  return heroes.find((character) => {
    return character.id === hero;
  });
}

export default function useHero() {
  return { getHero };
}
