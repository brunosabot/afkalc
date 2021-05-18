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

  // Hero List
  heroes?: IFirebaseHeroList;

  // Abyssal expedition
  abexGoalRelics?: IFirebaseAbyssalExpeditionClassRelics;
  abexCurrentRelics?: IFirebaseAbyssalExpeditionClassRelics;
  abexRelicInventory?: IFirebaseAbyssalExpeditionInventory;
  abexTiles?: IFirebaseAbyssalExpeditionTilesList;

  elderTree?: IFirebaseElderTree;
}
