import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import GuildContext from "../../../providers/GuildContext";
import InputField from "../../../ui/InputField";
import ApplicationListItem from "./ApplicationListItem";
import MemberListItem from "./MemberListItem";

interface IProps {
  [key: string]: never;
}

const TabMemberList: React.FC<IProps> = () => {
  const { actions, values } = useContext(GuildContext);
  const { t } = useTranslation("guild");
  const [search, setSearch] = useState<string>("");

  const guildMates = useMemo(
    () =>
      values.members.filter((member) => {
        if (search === "") return true;

        const index = member.playerName?.toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
        return index !== undefined && index > -1;
      }),
    [search, values.members]
  );

  return (
    <>
      <InputField
        label={t("guildmate-search")}
        name="search"
        onChange={setSearch}
        value={search}
        type="search"
      />
      {/* Applications */}
      {(values.isOwner || values.isDeputy) &&
        values.applications.map((member) =>
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
      {guildMates.map((member) =>
        member.id ? (
          <MemberListItem
            key={member.id}
            isOwner={values.guild.ownerId === member.id}
            isDeputy={values.guild.deputies.includes(member.id)}
            member={member}
          />
        ) : null
      )}
    </>
  );
};

export default TabMemberList;
