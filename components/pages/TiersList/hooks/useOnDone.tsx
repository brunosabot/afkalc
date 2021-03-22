import {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "../../../providers/types/IFirebasePriorityList";

export default function useOnDone(
  requirement: IFirebasePriorityListRequirement,
  requirementValue: number,
  hero: IFirebasePriorityListHero,
  setLevel: any,
  hasSelfRequirements: boolean = false
): () => Promise<any> {
  if (requirement === "SI") {
    return () => setLevel("SI", requirementValue).commit();
  }
  if (requirement === "FI") {
    return () => setLevel("FI", requirementValue).commit();
  }
  if (requirement === "ASCEND") {
    return () => setLevel("ASCEND", requirementValue).commit();
  }
  if (hasSelfRequirements) {
    return async () => {
      let levelSet = setLevel("", 0);

      if (hero.si) {
        levelSet = levelSet.again("SI", hero.si);
      }

      if (hero.fi) {
        levelSet = levelSet.again("FI", hero.fi);
      }

      if (hero.ascend) {
        levelSet = levelSet.again("ASCEND", hero.ascend);
      }

      await levelSet.commit();
    };
  }

  return () => Promise.resolve(undefined);
}
