export enum IFirebaseElderTreeClass {
  ranger = "ranger",
  mage = "mage",
  support = "support",
  tank = "tank",
  warrior = "warrior",
}

export type IFirebaseElderTree = {
  [key in IFirebaseElderTreeClass]: number;
};
