import React from "react";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IGuildActions {
  load: () => void;
  joinGuild: (id: string) => void;
  cancelJoinGuild: (id: string) => void;
  acceptJoinGuild: (id: string) => void;
  rejectJoinGuild: (id: string) => void;
  removeFromGuild: (id: string) => void;
  giveOwnership: (id: string) => void;
  removeGuild: () => void;
  createGuild: (name: string) => void;
  addDeputy: (id: string) => void;
  removeDeputy: (id: string) => void;
  quitGuild: () => void;
  setShowAbexTab: (value: boolean) => void;
  setName: (value: string) => void;
  setAbexAwayTimeLimit: (value: string) => void;
  setAbexFarmLimit: (value: number) => void;
  setAbexTilesT1Limit: (value: number) => void;
  setAbexTilesT2Limit: (value: number) => void;
  setAbexTilesT3Limit: (value: number) => void;
  setAbexTilesT4Limit: (value: number) => void;
  setAbexTilesT5Limit: (value: number) => void;
  setAbexTilesT6Limit: (value: number) => void;
  setAbexTilesT7Limit: (value: number) => void;
  setAbexTilesT8Limit: (value: number) => void;
}

export interface IGuildGuild {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
  applications: string[];
  deputies: string[];
  showAbexTab: boolean;
  abexAwayTimeLimit: string;
  abexFarmLimit: number;
  abexTilesT1Limit: number;
  abexTilesT2Limit: number;
  abexTilesT3Limit: number;
  abexTilesT4Limit: number;
  abexTilesT5Limit: number;
  abexTilesT6Limit: number;
  abexTilesT7Limit: number;
  abexTilesT8Limit: number;
}

interface IGuildValues {
  guild: IGuildGuild;
  application: Partial<IGuildGuild>;
  members: IFirebaseProfile[];
  applications: IFirebaseProfile[];
  isOwner: boolean;
  isDeputy: boolean;
}

export interface IGuildContext {
  actions: IGuildActions;
  values: IGuildValues;
}

export const defaultGuildValues: IGuildGuild = {
  id: "",
  name: "",
  ownerId: "",
  members: [],
  deputies: [],
  applications: [],
  showAbexTab: false,
  abexAwayTimeLimit: "24:00",
  abexFarmLimit: 10000,
  abexTilesT1Limit: 0,
  abexTilesT2Limit: 0,
  abexTilesT3Limit: 0,
  abexTilesT4Limit: 0,
  abexTilesT5Limit: 0,
  abexTilesT6Limit: 0,
  abexTilesT7Limit: 0,
  abexTilesT8Limit: 0,
};

export default React.createContext<IGuildContext>({
  actions: {
    load: () => {},
    joinGuild: () => {},
    cancelJoinGuild: () => {},
    acceptJoinGuild: () => {},
    rejectJoinGuild: () => {},
    removeFromGuild: () => {},
    removeGuild: () => {},
    createGuild: () => {},
    addDeputy: () => {},
    removeDeputy: () => {},
    quitGuild: () => {},
    setShowAbexTab: () => {},
    setName: () => {},
    giveOwnership: () => {},
    setAbexAwayTimeLimit: () => {},
    setAbexFarmLimit: () => {},
    setAbexTilesT1Limit: () => {},
    setAbexTilesT2Limit: () => {},
    setAbexTilesT3Limit: () => {},
    setAbexTilesT4Limit: () => {},
    setAbexTilesT5Limit: () => {},
    setAbexTilesT6Limit: () => {},
    setAbexTilesT7Limit: () => {},
    setAbexTilesT8Limit: () => {},
  },
  values: {
    members: [],
    applications: [],
    guild: { ...defaultGuildValues },
    application: {},
    isOwner: false,
    isDeputy: false,
  },
});
