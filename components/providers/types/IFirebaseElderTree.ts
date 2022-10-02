export enum IFirebaseElderTreeClass {
  ranger = "ranger",
  mage = "mage",
  support = "support",
  tank = "tank",
  warrior = "warrior",
  main = "main",
}

export type IFirebaseElderTree = {
  [key in IFirebaseElderTreeClass]: number;
};
