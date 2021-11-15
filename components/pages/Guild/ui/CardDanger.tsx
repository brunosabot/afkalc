import { mdiDoor, mdiNuke } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback, useContext } from "react";
import GuildContext from "../../../providers/GuildContext";
import ProfileContext from "../../../providers/ProfileContext";
import CardAction from "../../../ui/card/CardAction";
import CardActions from "../../../ui/card/CardActions";
import CardTitle from "../../../ui/card/CardTitle";
import CardOwner from "./CardOwner";

interface IProps {
  [key: string]: never;
}

const CardDanger: React.FC<IProps> = function CardDanger() {
  const { actions, values } = useContext(GuildContext);
  const { values: profileValues } = useContext(ProfileContext);
  const { t } = useTranslation("guild");

  const isOwner = values.guild.ownerId === profileValues.userId;

  const onRemoveGuild = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-drop-guild"))) {
      actions.removeGuild();
    }
  }, [actions, t]);

  const onQuitGuild = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t("confirm-quit-guild"))) {
      actions.quitGuild();
    }
  }, [actions, t]);

  return (
    <>
      <span style={{ color: "var(--error-background-color)" }}>
        <CardTitle>{t("title-dangerous-zone")}</CardTitle>
      </span>

      <CardOwner />

      <CardActions>
        {isOwner ? (
          <CardAction onClick={onRemoveGuild} icon={mdiNuke}>
            {t("label-drop-guild")}
          </CardAction>
        ) : null}
        {isOwner ? null : (
          <CardAction onClick={onQuitGuild} icon={mdiDoor}>
            {t("label-quit-guild")}
          </CardAction>
        )}
      </CardActions>
    </>
  );
};

export default CardDanger;
