import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "../../../providers/types/IFirebasePriorityList";
import { UseSetLevelReturn } from "./useSetLevel";

export default function useOnDone(
  requirement: IFirebasePriorityListRequirement,
  requirementValue: number,
  hero: IFirebasePriorityListHero,
  setLevel: UseSetLevelReturn,
  heroLevels?: IFirebaseHeroesHero,
  hasSelfRequirements: boolean = false
): () => Promise<any> {
  return async () => {
    const levelSet = setLevel(hero.hero, "", 0);

    let heroSi = heroLevels?.si ?? -1;
    let heroFi = heroLevels?.fi ?? 0;
    let heroAscend = heroLevels?.ascend ?? 0;
    let heroEngrave = heroLevels?.engrave ?? 0;

    if (requirement === "SI") {
      heroSi = Math.max(heroSi, requirementValue);
    }
    if (requirement === "FI") {
      heroFi = Math.max(heroFi, requirementValue);
    }
    if (requirement === "ASCEND") {
      heroAscend = Math.max(heroAscend, requirementValue);
    }
    if (requirement === "ENGRAVE") {
      heroEngrave = Math.max(heroEngrave, requirementValue);
    }

    if (hasSelfRequirements) {
      if (hero.si) {
        heroSi = Math.max(heroSi, hero.si);
      }

      if (hero.fi) {
        heroFi = Math.max(heroFi, hero.fi);
      }

      if (hero.ascend) {
        heroAscend = Math.max(heroAscend, hero.ascend);
      }

      if (hero.engrave) {
        heroEngrave = Math.max(heroEngrave, hero.engrave);
      }
    }

    levelSet
      .again(hero.hero, "SI", heroSi)
      .again(hero.hero, "FI", heroFi)
      .again(hero.hero, "ASCEND", heroAscend)
      .again(hero.hero, "ENGRAVE", heroEngrave)
      .commit();
  };
}
