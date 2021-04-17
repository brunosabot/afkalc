import { createContext } from "react";
import HeroClass from "../../types/HeroClass";
import {
  IFirebaseAbyssalExpeditionClassRelics,
  IFirebaseAbyssalExpeditionInventory,
  IFirebaseAbyssalExpeditionTilesList,
} from "./types/IFirebaseAbyssalExpedition";
import { IFirebaseHeroList } from "./types/IFirebaseHeroes";

interface IProfileActions {
  setCampaignLevel: (newCampaignLevel: string) => void;
  setCampaignSuccessDate: (newCampaignSuccessDate: string) => void;
  setPlayerLevel: (newPlayerLevel: number) => void;
  setPlayerVipLevel: (newPlayerVipLevel: number) => void;
  setPlayerName: (newPlayerName: string) => void;
  setFavoritePriorityList: (newFavoritePriorityList: string[]) => void;
  deleteUser: () => void;
  downloadData: () => void;
  setAbexCurrentRelics: (newCurrentRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setAbexGoalRelics: (newGoalRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setAbexRelicInventory: (newRelicInventory: IFirebaseAbyssalExpeditionInventory) => Promise<void>;
  setAbexTiles: (newTiles: IFirebaseAbyssalExpeditionTilesList) => Promise<void>;
  resetAbexTilesTimers: () => Promise<void>;
  resetAbexTiles: () => Promise<void>;
  resetAbexRelicsAndInventory: () => Promise<void>;
}

interface IProfileValues {
  isAuth: boolean;
  isAnonymous: boolean;
  isGoogle: boolean;
  isFacebook: boolean;
  isTwitter: boolean;
  isPassword: boolean;
  userId: string;
  ownerId?: string;
  campaignLevel: string;
  campaignSuccessDate: string;
  playerLevel: number;
  playerVipLevel: number;
  playerName: string;
  shareId?: string;
  favoritePriorityList: string[];
  abexGoalRelics: IFirebaseAbyssalExpeditionClassRelics;
  abexCurrentRelics: IFirebaseAbyssalExpeditionClassRelics;
  abexRelicInventory: IFirebaseAbyssalExpeditionInventory;
  abexTiles: IFirebaseAbyssalExpeditionTilesList;
  heroes: IFirebaseHeroList;
  heroesLastUpdate: string;
}

export interface IProfileContext {
  actions: IProfileActions;
  values: IProfileValues;
}

export const defaultValues: IProfileValues = {
  isAuth: false,
  isAnonymous: false,
  isGoogle: false,
  isFacebook: false,
  isTwitter: false,
  isPassword: false,
  userId: "",
  ownerId: undefined,
  campaignLevel: "1-1",
  campaignSuccessDate: new Date().toISOString(),
  playerLevel: 1,
  playerVipLevel: 1,
  playerName: "",
  shareId: undefined,
  abexGoalRelics: {
    [HeroClass.ranger]: [5205, 5104, 5204, 5304, 5305, 5306],
    [HeroClass.mage]: [5405, 5404, 5202, 5304, 5305, 5406],
    [HeroClass.tank]: [5205, 5202, 5204, 5201, 5203, 5206],
    [HeroClass.warrior]: [5205, 5104, 5204, 5105, 5203, 5106],
    [HeroClass.support]: [5205, 5505, 5202, 5504, 5404, 5506],
  },
  abexCurrentRelics: {
    [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
    [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
    [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
    [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
    [HeroClass.support]: [0, 0, 0, 0, 0, 0],
  },
  abexRelicInventory: {},
  abexTiles: {},
  favoritePriorityList: [],
  heroes: {},
  heroesLastUpdate: "",
};

export default createContext<IProfileContext>({
  actions: {
    setCampaignLevel: () => undefined,
    setCampaignSuccessDate: () => undefined,
    setPlayerLevel: () => undefined,
    setPlayerVipLevel: () => undefined,
    setPlayerName: () => undefined,
    setFavoritePriorityList: () => undefined,
    deleteUser: () => undefined,
    downloadData: () => undefined,
    // Abyssal Expedition
    setAbexCurrentRelics: () => Promise.resolve(undefined),
    setAbexGoalRelics: () => Promise.resolve(undefined),
    setAbexRelicInventory: () => Promise.resolve(undefined),
    setAbexTiles: () => Promise.resolve(undefined),
    resetAbexTilesTimers: () => Promise.resolve(undefined),
    resetAbexTiles: () => Promise.resolve(undefined),
    resetAbexRelicsAndInventory: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
