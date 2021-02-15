import { useCallback } from "react";
import HeroLevel from "../../../../types/HeroLevel";

interface IHeroLevels {
  inn?: number;
  si?: number;
  ascend?: number;
  link?: number;
}

interface IHeroes {
  [key: number]: IHeroLevels;
}

export default function useGetValue(levels: IHeroes) {
  return useCallback(
    (key: number, index: HeroLevel) => {
      if (levels[key] === undefined) return 0;
      if (levels[key][index] === undefined) return 0;
      if (levels[key][index] === 0) return 0;

      return levels[key][index] || 0;
    },
    [levels]
  );
}
