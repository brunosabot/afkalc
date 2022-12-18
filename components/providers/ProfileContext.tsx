import { createContext } from "react";
import HeroClass from "../../types/HeroClass";
import {
  IFirebaseAbyssalExpeditionClassRelics,
  IFirebaseAbyssalExpeditionInventory,
  IFirebaseAbyssalExpeditionTilesList,
} from "./types/IFirebaseAbyssalExpedition";
import { IFirebaseElderTree } from "./types/IFirebaseElderTree";
import { IFirebaseHeroList } from "./types/IFirebaseHeroes";
import { IFirebasePetList } from "./types/IFirebasePets";
import { IFirebasePve } from "./types/IFirebasePve";

export interface IProfileActions {
  setCampaignLevel: (newCampaignLevel: string) => void;
  setCampaignSuccessDate: (newCampaignSuccessDate: string) => void;
  setPlayerLevel: (newPlayerLevel: number) => void;
  setPlayerVipLevel: (newPlayerVipLevel: number) => void;
  setPlayerName: (newPlayerName: string) => void;
  setFavoritePriorityList: (newFavoritePriorityList: string[]) => void;
  setFavoriteTreeList: (newTreePriorityList: string[]) => void;
  setFavoritePetList: (newTreePriorityList: string[]) => void;
  setPetAgilityBuff: (petId: string, petAgilityBuff: number) => Promise<void>;
  setPetIntelligenceBuff: (petId: string, petIntelligenceBuff: number) => Promise<void>;
  setPetStrengthBuff: (petId: string, petStrengthBuff: number) => Promise<void>;
  deleteUser: () => void;
  downloadData: () => void;
  setAbexCurrentRelics: (newCurrentRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setAbexGoalRelics: (newGoalRelics: IFirebaseAbyssalExpeditionClassRelics) => Promise<void>;
  setAbexRelicInventory: (newRelicInventory: IFirebaseAbyssalExpeditionInventory) => Promise<void>;
  setAbexTiles: (newTiles: IFirebaseAbyssalExpeditionTilesList) => Promise<void>;
  setAbexBox: (newBox: number[]) => Promise<void>;
  resetAbexTilesTimers: () => Promise<void>;
  resetAbexTiles: () => Promise<void>;
  resetAbexRelicsAndInventory: () => Promise<void>;
  setWarriorElderTree: (value: number) => Promise<void>;
  setTankElderTree: (value: number) => Promise<void>;
  setRangerElderTree: (value: number) => Promise<void>;
  setMageElderTree: (value: number) => Promise<void>;
  setSupportElderTree: (value: number) => Promise<void>;
  setMainElderTree: (value: number) => Promise<void>;
  setPVECampaign: (value: string) => Promise<void>;
  setPVEKingTower: (value: number) => Promise<void>;
  setPVELightbearerTower: (value: number) => Promise<void>;
  setPVEMaulerTower: (value: number) => Promise<void>;
  setPVEWilderTower: (value: number) => Promise<void>;
  setPVEGravebornTower: (value: number) => Promise<void>;
  setPVECelestialTower: (value: number) => Promise<void>;
  setPVEHypogeanTower: (value: number) => Promise<void>;
  setPVECrystal: (value: number) => Promise<void>;
  setPVECrystalMax: (value: number) => Promise<void>;
}

export interface IProfileValues {
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
  favoriteTreeList: string[];
  favoritePetList: string[];
  abexGoalRelics: IFirebaseAbyssalExpeditionClassRelics;
  abexCurrentRelics: IFirebaseAbyssalExpeditionClassRelics;
  abexRelicInventory: IFirebaseAbyssalExpeditionInventory;
  abexTiles: IFirebaseAbyssalExpeditionTilesList;
  abexBox: number[];
  heroes: IFirebaseHeroList;
  pets: IFirebasePetList;
  heroesLastUpdate: string;
  elderTree: IFirebaseElderTree;
  pve: IFirebasePve;
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
  abexBox: [...new Array(25)].map(() => 0),
  abexGoalRelics: {
    [HeroClass.ranger]: [5305, 5204, 5205, 5104, 5304, 5306],
    [HeroClass.mage]: [5405, 5304, 5305, 5202, 5404, 5406],
    [HeroClass.tank]: [5205, 5203, 5201, 5202, 5204, 5206],
    [HeroClass.warrior]: [5105, 5204, 5203, 5205, 5104, 5106],
    [HeroClass.support]: [5505, 5202, 5305, 5404, 5504, 5506],
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
  favoriteTreeList: [],
  favoritePetList: [],
  heroes: {},
  heroesLastUpdate: "",
  pets: {},
  elderTree: {
    main: 0,
    warrior: 0,
    tank: 0,
    ranger: 0,
    mage: 0,
    support: 0,
  },
  pve: {
    kingTower: 0,
    lightbearerTower: 0,
    maulerTower: 0,
    wilderTower: 0,
    gravebornTower: 0,
    celestialTower: 0,
    hypogeanTower: 0,
    campaign: "1-1",
    crystal: 1,
    crystalMax: 1,
  },
};

export default createContext<IProfileContext>({
  actions: {
    setCampaignLevel: () => undefined,
    setCampaignSuccessDate: () => undefined,
    setPlayerLevel: () => undefined,
    setPlayerVipLevel: () => undefined,
    setPlayerName: () => undefined,
    setFavoritePriorityList: () => undefined,
    setFavoriteTreeList: () => undefined,
    setFavoritePetList: () => undefined,
    deleteUser: () => undefined,
    downloadData: () => undefined,
    setPetAgilityBuff: () => Promise.resolve(undefined),
    setPetIntelligenceBuff: () => Promise.resolve(undefined),
    setPetStrengthBuff: () => Promise.resolve(undefined),
    // Abyssal Expedition
    setAbexCurrentRelics: () => Promise.resolve(undefined),
    setAbexGoalRelics: () => Promise.resolve(undefined),
    setAbexRelicInventory: () => Promise.resolve(undefined),
    setAbexTiles: () => Promise.resolve(undefined),
    setAbexBox: () => Promise.resolve(undefined),
    resetAbexTilesTimers: () => Promise.resolve(undefined),
    resetAbexTiles: () => Promise.resolve(undefined),
    resetAbexRelicsAndInventory: () => Promise.resolve(undefined),
    // Elder Tree
    setWarriorElderTree: () => Promise.resolve(undefined),
    setTankElderTree: () => Promise.resolve(undefined),
    setRangerElderTree: () => Promise.resolve(undefined),
    setMageElderTree: () => Promise.resolve(undefined),
    setSupportElderTree: () => Promise.resolve(undefined),
    setMainElderTree: () => Promise.resolve(undefined),
    // PVE
    setPVECampaign: () => Promise.resolve(undefined),
    setPVEKingTower: () => Promise.resolve(undefined),
    setPVELightbearerTower: () => Promise.resolve(undefined),
    setPVEMaulerTower: () => Promise.resolve(undefined),
    setPVEWilderTower: () => Promise.resolve(undefined),
    setPVEGravebornTower: () => Promise.resolve(undefined),
    setPVECelestialTower: () => Promise.resolve(undefined),
    setPVEHypogeanTower: () => Promise.resolve(undefined),
    setPVECrystal: () => Promise.resolve(undefined),
    setPVECrystalMax: () => Promise.resolve(undefined),
  },
  values: defaultValues,
});
