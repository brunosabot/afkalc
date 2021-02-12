import firebase from "firebase";
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

export default function useSetLevel(
  levels: IHeroes,
  document: firebase.firestore.DocumentReference | undefined
) {
  return useCallback(
    (key: number, field: HeroLevel) => (value: number) => {
      if (document === undefined) return null;

      const prevHero = levels[key] || {};
      const newLevels = { ...levels };
      newLevels[key] = { ...prevHero, [field]: value };

      return document
        .update({ levels: newLevels })
        .catch(() => document.set({ levels: newLevels }));
    },
    [document, levels]
  );
}
