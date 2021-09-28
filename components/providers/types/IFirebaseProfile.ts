import {
  IFirebaseAbyssalExpeditionClassRelics,
  IFirebaseAbyssalExpeditionInventory,
  IFirebaseAbyssalExpeditionTilesList,
} from "./IFirebaseAbyssalExpedition";
import { IFirebaseElderTree } from "./IFirebaseElderTree";
import { IFirebaseHeroList } from "./IFirebaseHeroes";

export default interface IFirebaseProfile {
  id?: string;
  version?: number;
  campaignLevel?: string;
  campaignSuccessDate?: string;
  playerLevel?: number;
  playerVipLevel?: number;
  playerName?: string;
  shareId?: string;
  favoritePriorityList?: string[];
  favoriteTreeList?: string[];

  // Hero List
  heroes?: IFirebaseHeroList;
  heroesLastUpdate?: string;

  // Abyssal expedition
  abexGoalRelics?: IFirebaseAbyssalExpeditionClassRelics;
  abexCurrentRelics?: IFirebaseAbyssalExpeditionClassRelics;
  abexRelicInventory?: IFirebaseAbyssalExpeditionInventory;
  abexTiles?: IFirebaseAbyssalExpeditionTilesList;
  abexLastUpdate?: string;

  elderTree?: IFirebaseElderTree;
}
