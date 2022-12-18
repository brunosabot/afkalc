import { mdiCrown } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback, useContext, useMemo, useState } from "react";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import InputField from "../../../ui/InputField";
import ListItem from "../../../ui/list/ListItem";
import Svg from "../../../ui/Svg";

interface IProps {
  [key: string]: never;
}

const CardOwner: React.FC<IProps> = function CardOwner() {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");
  const [name, setName] = useState<string>("");

  const isOwner = values.guild.ownerId === profileValues.userId;

  const giveOwnership = useCallback(
    (id?: string) => {
      // eslint-disable-next-line no-alert
      if (id && window.confirm(t("confirm-transfer-ownership") ?? "")) {
        actions.giveOwnership(id);
      }
    },
    [actions, t]
  );

  const foundMembers = useMemo(
    () =>
      values.members.filter((member) => {
        const hasText = member.playerName?.toLocaleLowerCase().indexOf(name.toLocaleLowerCase());

        return hasText !== undefined && hasText > -1;
      }),
    [name, values.members]
  );

  if (isOwner === false) return null;

  return (
    <>
      <InputField
        label={t("label-ownership-name")}
        name="name"
        onChange={(e) => setName(e)}
        value={name}
        type="search"
      />

      {name !== "" ? (
        <div>
          {foundMembers.map((foundMember) => (
            <ListItem
              key={foundMember.id}
              actions={<Svg d={mdiCrown} onClick={() => giveOwnership(foundMember.id)} />}
            >
              {foundMember.playerName}
            </ListItem>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CardOwner;
