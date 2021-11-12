import firebase from "firebase/app";
import { useCallback } from "react";
import HeroLevel from "../../../../types/HeroLevel";

interface IHeroLevels {
  fi?: number;
  si?: number;
  ascend?: number;
}

interface IHeroes {
  [key: number]: IHeroLevels;
}

function cleanRequirements(levels: IHeroes, key: number) {
  const cleanedLevels = { ...levels };
  const theHeroLevels = cleanedLevels[key];
  const theHeroLevelSi = theHeroLevels.si ?? 0;
  const theHeroLevelAscend = theHeroLevels.ascend ?? 0;

  if (theHeroLevels !== undefined && theHeroLevelSi > 0 && theHeroLevelAscend < 5) {
    cleanedLevels[key].si = 0;
  }

  return cleanedLevels;
}

export default function useSetLevel(
  levels: IHeroes,
  document: firebase.firestore.DocumentReference | undefined
) {
  return useCallback(
    (key: number, field: HeroLevel | HeroLevel[]) =>
      function useSetLevelCallback(value: number | number[]) {
        if (document === undefined) return null;

        const newLevels = { ...levels, [key]: levels[key] || {} };

        if (field instanceof Array && value instanceof Array) {
          field.forEach((f, i) => {
            newLevels[key] = { ...newLevels[key], [f]: value[i] };
          });
        } else if (!(field instanceof Array) && !(value instanceof Array)) {
          newLevels[key] = { ...newLevels[key], [field]: value };
        }

        const cleanedLevels = cleanRequirements(newLevels, key);

        return document
          .update({ levels: cleanedLevels })
          .catch(() => document.set({ levels: newLevels }));
      },
    [document, levels]
  );
}
