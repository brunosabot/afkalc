import React, { useCallback, useContext, useMemo, useState } from "react";
import useFirestoreCollectionReference from "../hooks/useFirestoreCollectionReference";
import useFirestoreInQuery from "../hooks/useFirestoreInQuery";
import useFirestoreInQueryReference from "../hooks/useFirestoreInQueryReference";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../hooks/useFirestoreQueryReference";
import firebase from "./firebase";
import { FirebaseContext } from "./FirebaseProvider";
import GuildContext, { defaultGuildValues } from "./GuildContext";
import IFirebaseGuild from "./types/IFirebaseGuild";
import IFirebaseHeroes from "./types/IFirebaseHeroes";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IProps {
  children: React.ReactNode;
}

const GuildProvider: React.FC<IProps> = ({ children }) => {
  const { values } = useContext(FirebaseContext);
  const [lazyMember, setLazyMember] = useState<boolean>(true);
  const [lazyBox, setLazyBox] = useState<boolean>(true);
  const [lazyGuild, setLazyGuild] = useState<boolean>(true);
  const guildQuery = useFirestoreQueryReference(`guild`, "members", "array-contains", values.uid);
  const guildResult = useFirestoreQuery<IFirebaseGuild[]>(guildQuery, lazyGuild);
  const guildApplicationQuery = useFirestoreQueryReference(
    `guild`,
    "applications",
    "array-contains",
    values.uid
  );
  const guildApplicationResult = useFirestoreQuery<IFirebaseGuild[]>(
    guildApplicationQuery,
    lazyGuild
  );
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
      guildCollection?.doc(guildResult?.data?.[0].id)?.update({
        applications: firebase.firestore.FieldValue.arrayRemove(id),
        members: firebase.firestore.FieldValue.arrayUnion(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildResult?.data]
  );

  const rejectJoinGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildResult?.data?.[0].id)?.update({
        applications: firebase.firestore.FieldValue.arrayRemove(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildResult?.data]
  );

  const removeFromGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildResult?.data?.[0].id)?.update({
        members: firebase.firestore.FieldValue.arrayRemove(id),
      }) ?? Promise.resolve(undefined),
    [guildCollection, guildResult?.data]
  );

  const removeGuild = useCallback(
    (id: string) =>
      guildCollection?.doc(guildResult?.data?.[0].id)?.delete() ?? Promise.resolve(undefined),
    [guildCollection, guildResult?.data]
  );

  const memberIds = useMemo(() => {
    const members = guildResult?.data?.[0]?.members ?? [];
    const applications = guildResult?.data?.[0]?.applications ?? [];

    return [...members, ...applications];
  }, [guildResult?.data]);

  const membersQuery = useFirestoreInQueryReference(
    `profile`,
    firebase.firestore.FieldPath.documentId(),
    [...memberIds]
  );
  const members = useFirestoreInQuery<IFirebaseProfile>(membersQuery, lazyMember);
  const boxQuery = useFirestoreInQueryReference(
    `heroes`,
    firebase.firestore.FieldPath.documentId(),
    [...memberIds]
  );
  const box = useFirestoreInQuery<IFirebaseHeroes>(boxQuery, lazyBox);

  const load = useCallback(() => {
    setLazyGuild(false);
    setLazyMember(false);
    setLazyBox(false);
  }, []);

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

  const value = useMemo(
    () => ({
      actions: {
        createGuild,
        joinGuild,
        cancelJoinGuild,
        acceptJoinGuild,
        rejectJoinGuild,
        removeFromGuild,
        removeGuild,
        load,
      },
      values: {
        boxes: box.data ?? [],
        members: members.data ?? [],
        guild: { ...defaultGuildValues, ...guildResult?.data?.[0] },
        application: { ...guildApplicationResult.data?.[0] },
      },
    }),
    [
      createGuild,
      joinGuild,
      cancelJoinGuild,
      acceptJoinGuild,
      rejectJoinGuild,
      removeFromGuild,
      removeGuild,
      load,
      box.data,
      members.data,
      guildResult?.data,
      guildApplicationResult.data,
    ]
  );

  return <GuildContext.Provider value={value}>{children}</GuildContext.Provider>;
};

export default GuildProvider;
