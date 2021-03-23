import {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement
} from "../../../providers/types/IFirebasePriorityList";
import { UseSetLevelReturn } from "./useSetLevel";

export default function useOnDone(
  requirement: IFirebasePriorityListRequirement,
  requirementValue: number,
  hero: IFirebasePriorityListHero,
  setLevel: UseSetLevelReturn,
  hasSelfRequirements: boolean = false
): () => Promise<any> {
  if (requirement === "SI") {
    return () => setLevel(hero.hero, "SI", requirementValue).commit();
  }
  if (requirement === "FI") {
    return () => setLevel(hero.hero, "FI", requirementValue).commit();
  }
  if (requirement === "ASCEND") {
    return () => setLevel(hero.hero, "ASCEND", requirementValue).commit();
  }
  if (hasSelfRequirements) {
    return async () => {
      let levelSet = setLevel(hero.hero, "", 0);

      if (hero.si) {
        levelSet = levelSet.again(hero.hero, "SI", hero.si);
      }

      if (hero.fi) {
        levelSet = levelSet.again(hero.hero, "FI", hero.fi);
      }

      if (hero.ascend) {
        levelSet = levelSet.again(hero.hero, "ASCEND", hero.ascend);
      }

      await levelSet.commit();
    };
  }

  return () => Promise.resolve(undefined);
}
