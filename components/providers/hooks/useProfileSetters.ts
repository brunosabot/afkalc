import { useCallback, useContext } from "react";
import useFirestoreDocumentReference from "../../hooks/useFirestoreDocumentReference";
import { FirebaseContext } from "../FirebaseProvider";

export default function useProfileSetters() {
  const { values } = useContext(FirebaseContext);
  const document = useFirestoreDocumentReference(`profile/%ID%`);

  const setCampaignLevel = useCallback(
    (campaignLevel: string) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, campaignLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setCampaignSuccessDate = useCallback(
    (campaignSuccessDate: string) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, campaignSuccessDate }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerLevel = useCallback(
    (playerLevel: number) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, playerLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerVipLevel = useCallback(
    (playerVipLevel: number) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, playerVipLevel }, { merge: true });
    },
    [document, values.uid]
  );

  const setPlayerName = useCallback(
    (playerName: string) => {
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

  const setFavoriteTreeList = useCallback(
    (favoriteTreeList: string[]) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, favoriteTreeList }, { merge: true });
    },
    [document, values.uid]
  );
  const setFavoritePetList = useCallback(
    (favoritePetList: string[]) => {
      if (values.uid === "") return;
      document?.set({ ownerId: values.uid, favoritePetList }, { merge: true });
    },
    [document, values.uid]
  );

  return {
    setFavoritePriorityList,
    setFavoriteTreeList,
    setFavoritePetList,
    setCampaignLevel,
    setCampaignSuccessDate,
    setPlayerLevel,
    setPlayerVipLevel,
    setPlayerName,
  };
}
