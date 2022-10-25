import { useTranslation } from "next-i18next";
import React, { useContext, useMemo, useState } from "react";
import GuildContext from "../../../providers/GuildContext";
import CheckboxField from "../../../ui/CheckboxField";
import InputField from "../../../ui/InputField";
import ApplicationListItem from "./ApplicationListItem";
import MemberListItem from "./MemberListItem";
import classes from "./TabMemberList.module.css";

interface IProps {
  [key: string]: never;
}

const TabMemberList: React.FC<IProps> = function TabMemberList() {
  const { actions, values } = useContext(GuildContext);
  const { t } = useTranslation("guild");
  const [search, setSearch] = useState<string>("");
  const [showTree, setShowTree] = useState<boolean>(false);
  const [showTower, setShowTower] = useState<boolean>(false);

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
      <div className={classes.Filters}>
        <CheckboxField label={t("tree")} name="tree" onChange={setShowTree} value={showTree} />
        <CheckboxField label={t("tower")} name="tower" onChange={setShowTower} value={showTower} />
      </div>

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
            isDeputy={(values.guild.deputies || []).includes(member.id)}
            member={member}
            showTree={showTree}
            showTower={showTower}
          />
        ) : null
      )}
    </>
  );
};

export default TabMemberList;
