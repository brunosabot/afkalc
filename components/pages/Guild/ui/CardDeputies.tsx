import { mdiAccountPlus, mdiAccountRemove } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback, useContext, useMemo, useState } from "react";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import ListItem from "../../../ui/list/ListItem";
import Svg from "../../../ui/Svg";

interface IProps {
  [key: string]: never;
}

const CardDeputies: React.FC<IProps> = function CardDeputies() {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");
  const [name, setName] = useState<string>("");

  const isOwner = values.guild.ownerId === profileValues.userId;

  const deputies = useMemo(
    () =>
      values.members.filter((member) => (values.guild.deputies || []).includes(member.id ?? "-")),
    [values.guild.deputies, values.members]
  );

  const removeDeputy = useCallback(
    (id?: string) => {
      if (id) {
        actions.removeDeputy(id);
      }
    },
    [actions]
  );

  const addDeputy = useCallback(
    (id?: string) => {
      if (id) {
        actions.addDeputy(id);
        setName("");
      }
    },
    [actions]
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
      <CardTitle>{t("title-deputies")}</CardTitle>

      <div>
        {deputies.map((deputy) => (
          <ListItem
            key={deputy.id}
            actions={<Svg d={mdiAccountRemove} onClick={() => removeDeputy(deputy.id)} />}
          >
            {deputy.playerName}
          </ListItem>
        ))}
      </div>

      <InputField
        label={t("label-deputy-name")}
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
              actions={<Svg d={mdiAccountPlus} onClick={() => addDeputy(foundMember.id)} />}
            >
              {foundMember.playerName}
            </ListItem>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CardDeputies;
