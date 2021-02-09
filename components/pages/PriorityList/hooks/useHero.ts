import heroes from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

function getHero(hero?: number) {
  return typedHeroes.find((character) => character.id === hero);
}

export default function useHero() {
  return { getHero };
}
