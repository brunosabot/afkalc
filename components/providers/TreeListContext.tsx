import { createContext } from "react";
import IFirebaseTreeList, { IFirebaseTreeListStep } from "./types/IFirebaseTreeList";

export interface ITreeListActions {
  load: () => void;
  createList: () => Promise<string | undefined>;
  deleteList: (id: string) => Promise<void>;
  setSteps: (id: string, newHeroes: IFirebaseTreeListStep[]) => Promise<void>;
  setTitle: (id: string, newTitle: string) => Promise<void>;
}

export interface ITreeListValues {
  treeList: IFirebaseTreeList[];
  favorites: IFirebaseTreeList[];
}

export interface ITreeListContext {
  actions: ITreeListActions;
  values: ITreeListValues;
}

export const defaultValues: ITreeListValues = {
  treeList: [],
  favorites: [],
};

export default createContext<ITreeListContext>({
  actions: {
    load: () => undefined,
    setTitle: () => Promise.resolve(undefined),
    deleteList: () => Promise.resolve(undefined),
    createList: () => Promise.resolve(undefined),
    setSteps: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
