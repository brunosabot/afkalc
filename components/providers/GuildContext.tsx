import React from "react";
import IFirebaseHeroes from "./types/IFirebaseHeroes";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IGuildActions {
  load: () => void;
  joinGuild: (id: string) => void;
  cancelJoinGuild: (id: string) => void;
  acceptJoinGuild: (id: string) => void;
  rejectJoinGuild: (id: string) => void;
  removeFromGuild: (id: string) => void;
  removeGuild: (id: string) => void;
  createGuild: (name: string) => void;
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
  boxes: IFirebaseHeroes[];
}

interface IGuildContext {
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
  },
  values: { members: [], boxes: [], guild: { ...defaultGuildValues }, application: {} },
});
