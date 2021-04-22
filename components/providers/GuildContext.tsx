import React from "react";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IGuildActions {
  load: () => void;
  joinGuild: (id: string) => void;
  cancelJoinGuild: (id: string) => void;
  acceptJoinGuild: (id: string) => void;
  rejectJoinGuild: (id: string) => void;
  removeFromGuild: (id: string) => void;
  removeGuild: () => void;
  createGuild: (name: string) => void;
  addDeputy: (id: string) => void;
  removeDeputy: (id: string) => void;
  quitGuild: () => void;
}

interface IGuildGuild {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
  applications: string[];
  deputies: string[];
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
