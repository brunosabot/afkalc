import { nanoid } from "nanoid";
import React, { useContext, useMemo } from "react";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../hooks/useUserFirestoreDocument";
import { FirebaseContext } from "./FirebaseProvider";
import UserContext from "./UserContext";

interface IProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<IProps> = ({ children }) => {
  const { values } = useContext(FirebaseContext);
  const userDocument = useUserFirestoreDocument(`user/%ID%`);
  const userResult = useFirestoreQuery(userDocument);

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
