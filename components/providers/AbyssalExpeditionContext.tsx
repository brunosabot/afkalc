import { createContext } from "react";
import HeroClass from "../../types/HeroClass";
import {
  IFirebaseAbyssalExpeditionClassRelics,
  IFirebaseAbyssalExpeditionInventory,
  IFirebaseAbyssalExpeditionTilesList,
} from "./types/IFirebaseAbyssalExpedition";

export interface IAbyssalExpeditionActions {
  load: () => void;
  setCurrentRelics: (newCurrentRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setGoalRelics: (newGoalRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setRelicInventory: (newRelicInventory: IFirebaseAbyssalExpeditionInventory) => Promise<void>;
  setTiles: (newTiles: IFirebaseAbyssalExpeditionTilesList) => Promise<void>;
  resetTilesTimers: () => Promise<void>;
  resetTiles: () => Promise<void>;
  resetRelicsAndInventory: () => Promise<void>;
}

export interface IAbyssalExpeditionValues {
  goalRelics: IFirebaseAbyssalExpeditionClassRelics;
  currentRelics: IFirebaseAbyssalExpeditionClassRelics;
  relicInventory: IFirebaseAbyssalExpeditionInventory;
  tiles: IFirebaseAbyssalExpeditionTilesList;
}

export interface IAbyssalExpeditionContext {
  actions: IAbyssalExpeditionActions;
  values: IAbyssalExpeditionValues;
}

export const defaultValues: IAbyssalExpeditionValues = {
  goalRelics: {
    [HeroClass.ranger]: [5305, 5204, 5205, 5104, 5304, 5306],
    [HeroClass.mage]: [5405, 5304, 5305, 5202, 5404, 5406],
    [HeroClass.tank]: [5205, 5203, 5201, 5202, 5204, 5206],
    [HeroClass.warrior]: [5105, 5204, 5203, 5205, 5104, 5106],
    [HeroClass.support]: [5505, 5202, 5305, 5404, 5504, 5506],
  },
  currentRelics: {
    [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
    [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
    [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
    [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
    [HeroClass.support]: [0, 0, 0, 0, 0, 0],
  },
  relicInventory: {},
  tiles: {},
};

export default createContext<IAbyssalExpeditionContext>({
  actions: {
    load: () => undefined,
    setCurrentRelics: () => Promise.resolve(undefined),
    setGoalRelics: () => Promise.resolve(undefined),
    setRelicInventory: () => Promise.resolve(undefined),
    setTiles: () => Promise.resolve(undefined),
    resetTilesTimers: () => Promise.resolve(undefined),
    resetTiles: () => Promise.resolve(undefined),
    resetRelicsAndInventory: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
