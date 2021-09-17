export type IFirebasePriorityListRequirement =
  | ""
  | "SI"
  | "FI"
  | "ASCEND"
  | "ENGRAVE"
  | "LINK"
  | "LINKKEY";

export interface IFirebasePriorityListHero {
  fi: number;
  si: number;
  ascend: number;
  engrave: number;
  hero: number;
}

export default interface IFirebasePriorityList {
  id?: string;
  ownerId: string;
  title: string;
  heroes: IFirebasePriorityListHero[];
  requirement: IFirebasePriorityListRequirement;
  requirementValue: number;
  legacyId?: string;
  priorityListLastUpdate: string;
}
