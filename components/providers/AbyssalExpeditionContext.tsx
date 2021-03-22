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
    [HeroClass.ranger]: [5205, 5104, 5204, 5304, 5305, 5306],
    [HeroClass.mage]: [5405, 5404, 5202, 5304, 5305, 5406],
    [HeroClass.tank]: [5205, 5202, 5204, 5201, 5203, 5206],
    [HeroClass.warrior]: [5205, 5104, 5204, 5105, 5203, 5106],
    [HeroClass.support]: [5205, 5505, 5202, 5504, 5404, 5506],
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
  },
  values: defaultValues,
});
