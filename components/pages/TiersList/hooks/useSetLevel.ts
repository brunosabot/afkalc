import firebase from "../../../providers/firebase";
import { IFirebaseHeroesHero, IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";
import { IFirebasePriorityListRequirement } from "../../../providers/types/IFirebasePriorityList";

export type UseSetLevelReturn = (
  hero: number,
  key: IFirebasePriorityListRequirement,
  value: number
) => {
  again: UseSetLevelReturn;
  commit: () => Promise<void>;
};

function cleanRequirements(levels: IFirebaseHeroList, heroId: number) {
  const cleanedLevels = { ...levels };
  const theHeroLevels = cleanedLevels[heroId];
  const theHeroLevelSi = theHeroLevels.si ?? 0;
  const theHeroLevelAscend = theHeroLevels.ascend ?? 0;

  if (theHeroLevels !== undefined && theHeroLevelSi > 0 && theHeroLevelAscend < 5) {
    cleanedLevels[heroId].si = 0;
  }

  return cleanedLevels;
}

export default function useSetLevel(
  document: firebase.firestore.DocumentReference | undefined,
  heroes: IFirebaseHeroList
): UseSetLevelReturn {
  const newHeroes: IFirebaseHeroList = { ...heroes };

  function setLevel(hero: number, key: IFirebasePriorityListRequirement, value: number) {
    if (document === undefined || hero === 0)
      return {
        again: () => setLevel,
        commit: () => Promise.resolve(undefined),
      };

    const lowercaseKey = key.toLowerCase() as keyof IFirebaseHeroesHero;

    if (key !== "") {
      newHeroes[hero] = newHeroes[hero] || {};
      newHeroes[hero][lowercaseKey] = value || 0;
    }

    return {
      again: setLevel,
      commit() {
        if (document === undefined) return Promise.resolve(undefined);

        return document.set(
          {
            heroesLastUpdate: new Date().toISOString(),
            heroes: cleanRequirements(newHeroes, hero),
          },
          { merge: true }
        );
      },
    };
  }

  return setLevel;
}
