import { createContext } from "react";
import IFirebasePetList, { IFirebasePetListStep } from "./types/IFirebasePetList";

export interface IPetListActions {
  load: () => void;
  createList: () => Promise<string | undefined>;
  deleteList: (id: string) => Promise<void>;
  setSteps: (id: string, newHeroes: IFirebasePetListStep[]) => Promise<void>;
  setTitle: (id: string, newTitle: string) => Promise<void>;
}

export interface IPetListValues {
  petList: IFirebasePetList[];
  favorites: IFirebasePetList[];
}

export interface IPetListContext {
  actions: IPetListActions;
  values: IPetListValues;
}

export const defaultValues: IPetListValues = {
  petList: [],
  favorites: [],
};

export default createContext<IPetListContext>({
  actions: {
    load: () => undefined,
    setTitle: () => Promise.resolve(undefined),
    deleteList: () => Promise.resolve(undefined),
    createList: () => Promise.resolve(undefined),
    setSteps: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
