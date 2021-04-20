import React, { useContext, useMemo } from "react";
import useFirestoreDocument from "../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../hooks/useFirestoreDocumentReference";
import Spinner from "../ui/Spinner";
import { FirebaseContext } from "./FirebaseProvider";
import useAbyssalExpeditionSetters from "./hooks/useAbyssalExpeditionSetters";
import useMigration from "./hooks/useMigration";
import useProfileActions from "./hooks/useProfileActions";
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
    setPlayerName,
  } = useProfileSetters();
  const { deleteUser, downloadData } = useProfileActions();

  const {
    setAbexCurrentRelics,
    setAbexGoalRelics,
    setAbexRelicInventory,
    resetAbexRelicsAndInventory,
    setAbexTiles,
    resetAbexTilesTimers,
    resetAbexTiles,
  } = useAbyssalExpeditionSetters(result);

  useMigration(result);

  const value = useMemo<IProfileContext>(
    () => ({
      actions: {
        setCampaignLevel,
        setCampaignSuccessDate,
        setPlayerLevel,
        setPlayerVipLevel,
        setPlayerName,
        setFavoritePriorityList,
        deleteUser,
        downloadData,
        setAbexCurrentRelics,
        setAbexGoalRelics,
        setAbexRelicInventory,
        resetAbexRelicsAndInventory,
        setAbexTiles,
        resetAbexTilesTimers,
        resetAbexTiles,
      },
      values: {
        ...defaultValues,
        ...result?.data,
        userId: values.uid,
        isAuth: values.isAuth,
        isAnonymous: values.isAnonymous,
        isGoogle: values.isGoogle,
        isTwitter: values.isTwitter,
        isFacebook: values.isFacebook,
        isPassword: values.isPassword,
      },
    }),
    [
      setCampaignLevel,
      setCampaignSuccessDate,
      setPlayerLevel,
      setPlayerVipLevel,
      setPlayerName,
      setFavoritePriorityList,
      deleteUser,
      downloadData,
      setAbexCurrentRelics,
      setAbexGoalRelics,
      setAbexRelicInventory,
      resetAbexRelicsAndInventory,
      setAbexTiles,
      resetAbexTilesTimers,
      resetAbexTiles,
      result?.data,
      values.uid,
      values.isAuth,
      values.isAnonymous,
      values.isGoogle,
      values.isTwitter,
      values.isFacebook,
      values.isPassword,
    ]
  );

  if (values.isLoaded === false || (values.isAuth === true && result.status !== "success")) {
    return <Spinner />;
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export default ProfileProvider;
