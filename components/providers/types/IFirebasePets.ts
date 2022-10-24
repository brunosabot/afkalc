export interface IFirebasePetsPet {
  id: string;
  strengthBuff: number;
  intelligenceBuff: number;
  agilityBuff: number;
}

export interface IFirebasePetList {
  [key: string]: IFirebasePetsPet;
}

export default interface IFirebasePets {
  pets: IFirebasePetList;
  id: string;
}
