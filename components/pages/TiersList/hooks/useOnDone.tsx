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
  hasSelfRequirements: boolean = false
): () => Promise<any> {
  return async () => {
    let levelSet = setLevel(hero.hero, "", 0);

    if (requirement === "SI") {
      levelSet = levelSet.again(hero.hero, "SI", requirementValue);
    }
    if (requirement === "FI") {
      levelSet = levelSet.again(hero.hero, "FI", requirementValue);
    }
    if (requirement === "ASCEND") {
      levelSet = levelSet.again(hero.hero, "ASCEND", requirementValue);
    }
    if (requirement === "ENGRAVE") {
      levelSet = levelSet.again(hero.hero, "ENGRAVE", requirementValue);
    }

    if (hasSelfRequirements) {
      if (hero.si) {
        levelSet = levelSet.again(hero.hero, "SI", hero.si);
      }

      if (hero.fi) {
        levelSet = levelSet.again(hero.hero, "FI", hero.fi);
      }

      if (hero.ascend) {
        levelSet = levelSet.again(hero.hero, "ASCEND", hero.ascend);
      }

      if (hero.engrave) {
        levelSet = levelSet.again(hero.hero, "ENGRAVE", hero.engrave);
      }
    }

    await levelSet.commit();
  };
}
