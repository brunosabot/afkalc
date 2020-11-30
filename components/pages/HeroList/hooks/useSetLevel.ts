import { useCallback } from "react";
import HeroLevel from "../../../../types/HeroLevel";

interface IHeroLevels {
  inn?: number;
  si?: number;
  ascend?: number;
}

interface IHeroes {
  [key: number]: IHeroLevels;
}

export default function useSetLevel(levels: IHeroes, setLevels: (value: IHeroes) => void) {
  return useCallback(
    (key: number, field: HeroLevel) => {
      return (value: number) => {
        const data = levels[key] || {};
        const newLevels = {
          ...levels,
          [key]: { ...data, [field]: value },
        };

        setLevels(newLevels);
      };
    },
    [levels, setLevels]
  );
}
