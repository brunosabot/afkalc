import HeroClass from "../../../types/HeroClass";

export interface IFirebaseTreeListStep {
  heroClass: HeroClass;
  level: number;
}

export default interface IFirebaseTreeList {
  id?: string;
  ownerId: string;
  title: string;
  steps: IFirebaseTreeListStep[];
  treeListLastUpdate: string;
}
