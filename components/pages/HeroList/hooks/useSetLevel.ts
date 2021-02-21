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
    (key: number, field: HeroLevel|HeroLevel[]) => (value: number|number[]) => {
      if (document === undefined) return null;

      const newLevels = { ...levels, [key]: levels[key]||{} };

      if (field instanceof Array && value instanceof Array) {
        field.forEach((f, i) => {
          newLevels[key] = { ...newLevels[key], [f]: value[i] };
        });
      } else if (!(field instanceof Array) && !(value instanceof Array)) {
        newLevels[key] = { ...newLevels[key], [field]: value };
      }

      return document
        .update({ levels: newLevels })
        .catch(() => document.set({ levels: newLevels }));
    },
    [document, levels]
  );
}
