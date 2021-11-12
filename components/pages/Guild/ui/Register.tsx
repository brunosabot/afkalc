import { mdiMagnify, mdiPlus } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import useFirestoreQueryReference from "../../../hooks/useFirestoreQueryReference";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import IFirebaseGuild from "../../../providers/types/IFirebaseGuild";
import Card from "../../../ui/card/Card";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";
import GuildListItem from "./GuildListItem";

interface IProps {
  [key: string]: never;
}

const Register: React.FC<IProps> = function Register() {
  const [name, setName] = useState<string>("");
  const { t } = useTranslation("guild");
  const { actions, values } = useContext(GuildContext);
  const { actions: profileActions, values: profileValues } = useContext(ProfileContext);
  const [lazy, setLazy] = useState<boolean>(true);

  const guildDocument = useFirestoreQueryReference(`guild`, "name", "==", name);
  const guildResult = useFirestoreQuery<IFirebaseGuild[]>(guildDocument, lazy);

  if (profileValues.playerName === "") {
    return (
      <Card>
        <CardTitle>{t("title-player-name")}</CardTitle>
        <InputField
          label={t("label-player-name")}
          name="name"
          onChange={(e) => setName(e)}
          value={name}
        />
        <CardActions>
          <CardAction
            onClick={() => {
              profileActions.setPlayerName(name);
              setName("");
            }}
          >
            {t("label-update")}
          </CardAction>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>{t("title-join-guild")}</CardTitle>
      <InputField
        label={t("label-guild-name")}
        name="name"
        onChange={(e) => setName(e)}
        value={name}
      />

      {values.application.id ? (
        <GuildListItem
          id={values.application.id}
          onApply={actions.cancelJoinGuild}
          key={values.application.id}
          isApplied
        >
          {values.application?.name ?? t("label-player-unknown")}
        </GuildListItem>
      ) : (
        <>
          <CardActions>
            <CardAction icon={mdiPlus} onClick={() => actions.createGuild(name)}>
              {t("title-create-guild")}
            </CardAction>
            <CardAction
              icon={mdiMagnify}
              onClick={() => {
                setLazy(false);
              }}
            >
              {t("label-find-guild")}
            </CardAction>
          </CardActions>

          {guildResult?.data?.map((guild) => (
            <GuildListItem id={guild.id} onApply={actions.joinGuild} key={guild.id}>
              {guild.name}
            </GuildListItem>
          ))}
        </>
      )}
    </Card>
  );
};

export default Register;
