import React, { useMemo } from "react";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useUserFirestoreDocument from "../hooks/useUserFirestoreDocument";
import UserContext from "./UserContext";

interface IProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<IProps> = ({ children }) => {
  const userDocument = useUserFirestoreDocument(`user/%ID%`);
  const userResult = useFirestoreQuery(userDocument);

  const shareId = userResult?.data?.shareId ?? "";

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
