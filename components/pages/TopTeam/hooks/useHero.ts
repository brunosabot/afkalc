import heroes from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

function getHero(t: any, hero?: number) {
  const foundHero = typedHeroes.find((character) => character.id === hero);

  if (foundHero) {
    return { ...foundHero, name: t(`common:heroesName.${foundHero.slug}`) };
  }

  return undefined;
}

export default function useHero() {
  return { getHero };
}
