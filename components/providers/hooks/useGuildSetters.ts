import { useCallback, useContext } from "react";
import useFirestoreCollectionReference from "../../hooks/useFirestoreCollectionReference";
import firebase from "../firebase";
import { FirebaseContext } from "../FirebaseProvider";

export default function useGuildSetters(guildId: string | undefined) {
  const { values } = useContext(FirebaseContext);

  const guildCollection = useFirestoreCollectionReference(`guild`);

  const joinGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(id)?.update({
        applications: firebase.firestore.FieldValue.arrayUnion(values.uid),
      }) ?? Promise.resolve(undefined),
    [guildCollection, values.uid]
  );
  const cancelJoinGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(id)?.update({
        applications: firebase.firestore.FieldValue.arrayRemove(values.uid),
      }) ?? Promise.resolve(undefined),
    [guildCollection, values.uid]
  );

  const acceptJoinGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        applications: firebase.firestore.FieldValue.arrayRemove(id),
        members: firebase.firestore.FieldValue.arrayUnion(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const rejectJoinGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        applications: firebase.firestore.FieldValue.arrayRemove(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const removeFromGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        members: firebase.firestore.FieldValue.arrayRemove(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const removeGuild = useCallback(
    () => guildCollection?.doc(guildId)?.delete() ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const createGuild = useCallback(
    async (name: string) => {
      await guildCollection?.add({
        name,
        ownerId: values.uid,
        members: [values.uid],
        applications: [],
      });
    },
    [guildCollection, values.uid]
  );

  const addDeputy = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        deputies: firebase.firestore.FieldValue.arrayUnion(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const removeDeputy = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        deputies: firebase.firestore.FieldValue.arrayRemove(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const quitGuild = useCallback(
    () =>
      guildCollection?.doc(guildId)?.update({
        members: firebase.firestore.FieldValue.arrayRemove(values.uid),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId, values.uid]
  );

  const setShowAbexTab = useCallback(
    (value: boolean) =>
      guildCollection?.doc(guildId)?.set({ showAbexTab: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setName = useCallback(
    (value: string) =>
      guildCollection?.doc(guildId)?.set({ name: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const giveOwnership = useCallback(
    (id: string) =>
      guildCollection?.doc(guildId)?.update({
        ownerId: id,
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexAwayTimeLimit = useCallback(
    (value: string) =>
      guildCollection?.doc(guildId)?.set({ abexAwayTimeLimit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexFarmLimit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexFarmLimit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT1Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT1Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT2Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT2Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT3Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT3Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT4Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT4Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT5Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT5Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT6Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT6Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT7Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT7Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  const setAbexTilesT8Limit = useCallback(
    (value: number) =>
      guildCollection?.doc(guildId)?.set({ abexTilesT8Limit: value }, { merge: true }) ??
      Promise.resolve(undefined),
    [guildCollection, guildId]
  );

  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},
  // : () => {},

  return {
    joinGuild,
    cancelJoinGuild,
    acceptJoinGuild,
    rejectJoinGuild,
    removeFromGuild,
    removeGuild,
    createGuild,
    addDeputy,
    removeDeputy,
    quitGuild,
    setShowAbexTab,
    setName,
    giveOwnership,
    setAbexAwayTimeLimit,
    setAbexFarmLimit,
    setAbexTilesT1Limit,
    setAbexTilesT2Limit,
    setAbexTilesT3Limit,
    setAbexTilesT4Limit,
    setAbexTilesT5Limit,
    setAbexTilesT6Limit,
    setAbexTilesT7Limit,
    setAbexTilesT8Limit,
  };
}
