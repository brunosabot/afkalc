import { useCallback } from "react";
import { IFirebaseHeroesHero, IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";

export default function useGetValue(levels: IFirebaseHeroList) {
  return useCallback(
    (key: number, index: keyof IFirebaseHeroesHero) => {
      const defaultValue = index === "si" ? -1 : 0;

      if (levels[key] === undefined) return defaultValue;
      if (levels[key][index] === undefined) return defaultValue;
      if (levels[key][index] === 0) return 0;

      return levels[key][index] || 0;
    },
    [levels]
  );
}
