import React, { useContext, useMemo } from "react";
import useFirestoreDocument from "../hooks/useFirestoreDocument";
import useFirestoreDocumentReference from "../hooks/useFirestoreDocumentReference";
import Spinner from "../ui/Spinner";
import { FirebaseContext } from "./FirebaseProvider";
import useAbyssalExpeditionSetters from "./hooks/useAbyssalExpeditionSetters";
import useElderTreeSetters from "./hooks/useElderTreeSetters";
import usePetSetters from "./hooks/usePetSetters";
import useProfileActions from "./hooks/useProfileActions";
import useProfileSetters from "./hooks/useProfileSetters";
import usePveSetters from "./hooks/usePveSetters";
import ProfileContext, { defaultValues, IProfileContext } from "./ProfileContext";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IProps {
  children: React.ReactNode;
}

const ProfileProvider: React.FC<IProps> = function ProfileProvider({ children }) {
  const { values } = useContext(FirebaseContext);
  const document = useFirestoreDocumentReference(`profile/%ID%`);
  const result = useFirestoreDocument<IFirebaseProfile>(document);

  const {
    setFavoritePriorityList,
    setFavoriteTreeList,
    setFavoritePetList,
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
    setAbexBox,
    resetAbexRelicsAndInventory,
    setAbexTiles,
    resetAbexTilesTimers,
    resetAbexTiles,
  } = useAbyssalExpeditionSetters(result);

  const {
    setWarriorElderTree,
    setTankElderTree,
    setRangerElderTree,
    setMageElderTree,
    setSupportElderTree,
    setMainElderTree,
  } = useElderTreeSetters(result);

  const {
    setPVECampaign,
    setPVEKingTower,
    setPVELightbearerTower,
    setPVEMaulerTower,
    setPVEWilderTower,
    setPVEGravebornTower,
    setPVECelestialTower,
    setPVEHypogeanTower,
    setPVECrystal,
    setPVECrystalMax,
  } = usePveSetters(result);

  const { setPetAgilityBuff, setPetIntelligenceBuff, setPetStrengthBuff } = usePetSetters(result);

  const value = useMemo<IProfileContext>(
    () => ({
      actions: {
        setCampaignLevel,
        setCampaignSuccessDate,
        setPlayerLevel,
        setPlayerVipLevel,
        setPlayerName,
        setFavoritePriorityList,
        setFavoriteTreeList,
        setFavoritePetList,
        deleteUser,
        downloadData,
        setAbexCurrentRelics,
        setAbexGoalRelics,
        setAbexRelicInventory,
        resetAbexRelicsAndInventory,
        setAbexTiles,
        setAbexBox,
        resetAbexTilesTimers,
        resetAbexTiles,
        setWarriorElderTree,
        setTankElderTree,
        setRangerElderTree,
        setMageElderTree,
        setSupportElderTree,
        setMainElderTree,
        setPVECampaign,
        setPVEKingTower,
        setPVELightbearerTower,
        setPVEMaulerTower,
        setPVEWilderTower,
        setPVEGravebornTower,
        setPVECelestialTower,
        setPVEHypogeanTower,
        setPVECrystal,
        setPVECrystalMax,
        setPetAgilityBuff,
        setPetIntelligenceBuff,
        setPetStrengthBuff,
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
      setFavoriteTreeList,
      setFavoritePetList,
      deleteUser,
      downloadData,
      setAbexCurrentRelics,
      setAbexGoalRelics,
      setAbexRelicInventory,
      resetAbexRelicsAndInventory,
      setAbexTiles,
      setAbexBox,
      resetAbexTilesTimers,
      resetAbexTiles,
      setWarriorElderTree,
      setTankElderTree,
      setRangerElderTree,
      setMageElderTree,
      setSupportElderTree,
      setMainElderTree,
      setPVECampaign,
      setPVEKingTower,
      setPVELightbearerTower,
      setPVEMaulerTower,
      setPVEWilderTower,
      setPVEGravebornTower,
      setPVECelestialTower,
      setPVEHypogeanTower,
      setPVECrystal,
      setPVECrystalMax,
      setPetAgilityBuff,
      setPetIntelligenceBuff,
      setPetStrengthBuff,
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
