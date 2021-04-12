import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import ApplicationListItem from "./ApplicationListItem";
import MemberListItem from "./MemberListItem";

interface IProps {
  [key: string]: never;
}

const TabMemberList: React.FC<IProps> = () => {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");

  return (
    <>
      {/* Applications */}
      {values.guild.ownerId === profileValues.userId &&
        values.members
          .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0)
          .filter(
            (member) =>
              values.guild.applications.find((application) => application === member.id) !==
              undefined
          )
          .map((member) =>
            member.id ? (
              <ApplicationListItem
                key={member.id}
                id={member.id}
                onAccept={actions.acceptJoinGuild}
                onReject={actions.rejectJoinGuild}
              >
                {member.playerName || t("label-player-unknown")}
              </ApplicationListItem>
            ) : null
          )}

      {/* Membres */}
      {values.members
        .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0)
        .filter(
          (member) =>
            values.guild.applications.find((application) => application === member.id) === undefined
        )
        .map((member) =>
          member.id ? (
            <MemberListItem
              key={member.id}
              id={member.id}
              isOwner={values.guild.ownerId === member.id}
              isDeputy={values.guild.deputies.includes(member.id)}
            >
              {member.playerName || t("label-player-unknown")}
            </MemberListItem>
          ) : null
        )}
    </>
  );
};

export default TabMemberList;
