import { createContext } from "react";
import IFirebasePriorityList, {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "./types/IFirebasePriorityList";

export interface IPriorityListActions {
  load: () => void;
  createList: () => Promise<string | undefined>;
  deleteList: (id: string) => Promise<void>;
  setHeroes: (id: string, newHeroes: IFirebasePriorityListHero[]) => Promise<void>;
  setTitle: (id: string, newTitle: string) => Promise<void>;
  setRequirementValue: (id: string, newRequirementValue: number) => Promise<void>;
  setRequirement: (id: string, newRequirement: IFirebasePriorityListRequirement) => Promise<void>;
}

export interface IPriorityListValues {
  priorityList: IFirebasePriorityList[];
  favorites: IFirebasePriorityList[];
}

export interface IPriorityListContext {
  actions: IPriorityListActions;
  values: IPriorityListValues;
}

export const defaultValues: IPriorityListValues = {
  priorityList: [],
  favorites: [],
};

export default createContext<IPriorityListContext>({
  actions: {
    load: () => undefined,
    setHeroes: () => Promise.resolve(undefined),
    setTitle: () => Promise.resolve(undefined),
    setRequirementValue: () => Promise.resolve(undefined),
    setRequirement: () => Promise.resolve(undefined),
    deleteList: () => Promise.resolve(undefined),
    createList: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
