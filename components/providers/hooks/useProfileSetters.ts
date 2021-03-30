import { useCallback, useContext } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { FirebaseContext } from "../FirebaseProvider";

export default function useProfileSetters() {
  const { values } = useContext(FirebaseContext);
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setCampaignLevel = useCallback(
    (campaignLevel) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, campaignLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setCampaignSuccessDate = useCallback(
    (campaignSuccessDate) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, campaignSuccessDate }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerLevel = useCallback(
    (playerLevel) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, playerLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerVipLevel = useCallback(
    (playerVipLevel) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, playerVipLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerName = useCallback(
    (playerName) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, playerName }, { merge: true });
    },
    [document, values.uid]
  );

  const setFavoritePriorityList = useCallback(
    (favoritePriorityList: string[]) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, favoritePriorityList }, { merge: true });
    },
    [document, values.uid]
  );

  return {
    setFavoritePriorityList,
    setCampaignLevel,
    setCampaignSuccessDate,
    setPlayerLevel,
    setPlayerVipLevel,
    setPlayerName,
  };
}
