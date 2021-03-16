import React, { useContext, useMemo } from "react";
import useFirestoreDocument from "../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../hooks/useFirestoreDocumentReference";
import { FirebaseContext } from "./FirebaseProvider";
import useMigration from "./hooks/useMigration";
import useProfileSetters from "./hooks/useProfileSetters";
import ProfileContext, { defaultValues, IProfileContext } from "./ProfileContext";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IProps {
  children: React.ReactNode;
}

const ProfileProvider: React.FC<IProps> = ({ children }) => {
  const { values } = useContext(FirebaseContext);
  const document = useFirestoreDocumentReference(`profile/%ID%`);
  const result = useFirestoreDocument<IFirebaseProfile>(document);

  const {
    setFavoritePriorityList,
    setCampaignLevel,
    setCampaignSuccessDate,
    setPlayerLevel,
    setPlayerVipLevel,
  } = useProfileSetters();

  useMigration(result);

  const value = useMemo<IProfileContext>(
    () => ({
      actions: {
        setCampaignLevel,
        setCampaignSuccessDate,
        setPlayerLevel,
        setPlayerVipLevel,
        setFavoritePriorityList,
      },
      values: {
        ...defaultValues,
        ...result?.data,
        userId: values.uid,
        isAuth: values.isAuth,
      },
    }),
    [
      setCampaignLevel,
      setCampaignSuccessDate,
      setPlayerLevel,
      setPlayerVipLevel,
      setFavoritePriorityList,
      result?.data,
      values.uid,
      values.isAuth,
    ]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;
