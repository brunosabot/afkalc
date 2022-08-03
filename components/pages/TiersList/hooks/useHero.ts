import { useTranslation } from "next-i18next";
import heroes from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

function getHero(t: any, hero?: number) {
  const foundHero = typedHeroes.find((character) => character.id === hero);

  if (foundHero) {
    return { ...foundHero, name: t(`heroesName.${foundHero.slug}`) };
  }

  return undefined;
}

export default function useHero() {
  return { getHero };
}

export function useHeroById(id: number) {
  const { t } = useTranslation();
  return getHero(t, id);
}
