import { createContext } from "react";
import HeroClass from "../../types/HeroClass";

interface IAbexTile {
  amount: number;
  garrison: number;
  timer: number;
  timestamp: number;
}

interface IAbexTiles {
  [key: number]: IAbexTile;
}

interface IAbexInventory {
  [key: number]: number;
}

interface IRelicPosition {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface IAbexRelic {
  [HeroClass.mage]: IRelicPosition;
  [HeroClass.ranger]: IRelicPosition;
  [HeroClass.support]: IRelicPosition;
  [HeroClass.tank]: IRelicPosition;
  [HeroClass.warrior]: IRelicPosition;
}

interface IProfileActions {
  setCampaignLevel: (newCampaignLevel: string) => void;
  setCampaignSuccessDate: (newCampaignSuccessDate: string) => void;
  setPlayerLevel: (newPlayerLevel: number) => void;
  setPlayerVipLevel: (newPlayerVipLevel: number) => void;
  setPlayerName: (newPlayerName: string) => void;
  setFavoritePriorityList: (newFavoritePriorityList: string[]) => void;
  deleteUser: () => void;
  downloadData: () => void;
}

interface IProfileValues {
  isAuth: boolean;
  userId: string;
  ownerId?: string;
  campaignLevel: string;
  campaignSuccessDate: string;
  playerLevel: number;
  playerVipLevel: number;
  playerName: string;
  shareId?: string;
  abexGoalRelics: IAbexRelic;
  abexCurrentRelics: IAbexRelic;
  abexRelicInventory: IAbexInventory;
  abexTiles: IAbexTiles;
  favoritePriorityList: string[];
}

export interface IProfileContext {
  actions: IProfileActions;
  values: IProfileValues;
}

export const defaultValues: IProfileValues = {
  isAuth: false,
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
  },
  values: defaultValues,
});
