import { nanoid } from "nanoid";
import React, { useContext, useMemo } from "react";
import useFirestoreDocument from "../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../hooks/useFirestoreDocumentReference";
import { FirebaseContext } from "./FirebaseProvider";
import UserContext from "./UserContext";

interface IProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<IProps> = function UserProvider({ children }) {
  const { values } = useContext(FirebaseContext);
  const userDocument = useFirestoreDocumentReference(`user/%ID%`);
  const userResult = useFirestoreDocument<{ shareId: string }>(userDocument);

  const shareId = userResult?.data?.shareId ?? "";

  if (userResult.status === "success" && values.uid !== "" && shareId === "") {
    userDocument?.set({ shareId: nanoid(10) });
  }

  const value = useMemo(
    () => ({
      actions: {},
      values: { shareId },
    }),
    [shareId]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
