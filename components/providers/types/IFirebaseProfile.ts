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
}
