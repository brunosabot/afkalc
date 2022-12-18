export interface IFirebasePetListStep {
  pet: number;
  level: number;
}

export default interface IFirebasePetList {
  id?: string;
  ownerId: string;
  title: string;
  steps: IFirebasePetListStep[];
  petListLastUpdate: string;
}
