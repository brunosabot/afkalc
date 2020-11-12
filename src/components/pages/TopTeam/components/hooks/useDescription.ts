import { useMemo } from "react";
import useHero from "./useHero";

export default function useDescription(
  hero1: number,
  hero2: number,
  hero3: number,
  hero4: number,
  hero5: number
) {
  const { getHero } = useHero();

  return useMemo(() => {
    const hero1Data = getHero(hero1);
    const hero2Data = getHero(hero2);
    const hero3Data = getHero(hero3);
    const hero4Data = getHero(hero4);
    const hero5Data = getHero(hero5);

    const description = [];
    if (hero1Data !== undefined) {
      description.push(hero1Data.name);
    }
    if (hero2Data !== undefined) {
      description.push(hero2Data.name);
    }
    if (hero3Data !== undefined) {
      description.push(hero3Data.name);
    }
    if (hero4Data !== undefined) {
      description.push(hero4Data.name);
    }
    if (hero5Data !== undefined) {
      description.push(hero5Data.name);
    }

    return description.join(" - ");
  }, [getHero, hero1, hero2, hero3, hero4, hero5]);
}
