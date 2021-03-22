export enum IFirebaseAbyssalExpeditionClass {
  ranger = "ranger",
  mage = "mage",
  support = "support",
  tank = "tank",
  warrior = "warrior",
}

export interface IFirebaseAbyssalExpeditionTiles {
  amount: number;
  garrison: number;
  timer: number;
  timestamp: number;
}

export interface IFirebaseAbyssalExpeditionTilesList {
  [key: number]: IFirebaseAbyssalExpeditionTiles;
}

export interface IFirebaseAbyssalExpeditionInventory {
  [key: number]: number;
}

export type IFirebaseAbyssalExpeditionClassRelics = {
  [key in IFirebaseAbyssalExpeditionClass]: number[];
};

export default interface IFirebaseAbyssalExpedition {
  goalRelics?: IFirebaseAbyssalExpeditionClassRelics;
  currentRelics?: IFirebaseAbyssalExpeditionClassRelics;
  relicInventory?: IFirebaseAbyssalExpeditionInventory;
  tiles?: IFirebaseAbyssalExpeditionTilesList;
}
