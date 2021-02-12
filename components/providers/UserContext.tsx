import React from "react";

interface IUserActions {
  [key: string]: never;
}

interface IUserValues {
  shareId: string;
}

interface IUserContext {
  actions: IUserActions;
  values: IUserValues;
}

export default React.createContext<IUserContext>({
  actions: {},
  values: { shareId: "" },
});
