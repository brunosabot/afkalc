import React, { useCallback, useContext, useMemo, useState } from "react";
import useFirestoreInQuery from "../hooks/useFirestoreInQuery";
import useFirestoreInQueryReference from "../hooks/useFirestoreInQueryReference";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../hooks/useFirestoreQueryReference";
import firebase from "./firebase";
import { FirebaseContext } from "./FirebaseProvider";
import GuildContext, { defaultGuildValues, IGuildContext } from "./GuildContext";
import useGuildSetters from "./hooks/useGuildSetters";
import IFirebaseGuild from "./types/IFirebaseGuild";
import IFirebaseProfile from "./types/IFirebaseProfile";

interface IProps {
  children: React.ReactNode;
}

const GuildProvider: React.FC<IProps> = function GuildProvider({ children }) {
  const { values } = useContext(FirebaseContext);
  const [lazyMember, setLazyMember] = useState<boolean>(true);
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
  const {
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
  } = useGuildSetters(guildResult?.data?.[0]?.id);

  const memberIds = useMemo(() => {
    const members = guildResult?.data?.[0]?.members ?? [];
    const applications = guildResult?.data?.[0]?.applications ?? [];

    return [...members, ...applications];
  }, [guildResult?.data]);

  const isOwner = values.uid === guildResult?.data?.[0]?.ownerId;
  const isDeputy = guildResult?.data?.[0]?.deputies?.includes(values.uid) ?? false;

  const membersQuery = useFirestoreInQueryReference(
    `profile`,
    firebase.firestore.FieldPath.documentId(),
    [...memberIds]
  );
  const members = useFirestoreInQuery<IFirebaseProfile[]>(membersQuery, lazyMember);

  const load = useCallback(() => {
    setLazyGuild(false);
    setLazyMember(false);
  }, []);

  const value = useMemo<IGuildContext>(() => {
    const guild = { ...defaultGuildValues, ...guildResult?.data?.[0] };
    const fullMembers = members.data ?? [];
    const guildMembers = fullMembers
      .filter((member) => member.id && guild.applications.includes(member.id) === false)
      .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0);
    const applicationMembers = fullMembers
      .filter((member) => member.id && guild.applications.includes(member.id) === true)
      .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0);

    return {
      actions: {
        createGuild,
        joinGuild,
        cancelJoinGuild,
        acceptJoinGuild,
        rejectJoinGuild,
        removeFromGuild,
        removeGuild,
        quitGuild,
        load,
        addDeputy,
        removeDeputy,
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
      },
      values: {
        members: guildMembers,
        applications: applicationMembers,
        guild,
        application: { ...guildApplicationResult.data?.[0] },
        isOwner,
        isDeputy,
      },
    };
  }, [
    guildResult?.data,
    members.data,
    createGuild,
    joinGuild,
    cancelJoinGuild,
    acceptJoinGuild,
    rejectJoinGuild,
    removeFromGuild,
    removeGuild,
    quitGuild,
    load,
    addDeputy,
    removeDeputy,
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
    guildApplicationResult.data,
    isOwner,
    isDeputy,
  ]);

  return <GuildContext.Provider value={value}>{children}</GuildContext.Provider>;
};

export default GuildProvider;
