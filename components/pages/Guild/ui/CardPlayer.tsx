import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import ProfileContext from "../../../providers/ProfileContext";
import CardTitle from "../../../ui/card/CardTitle";
import InputField from "../../../ui/InputField";

interface IProps {
  [key: string]: never;
}

const CardPlayer: React.FC<IProps> = function CardPlayer() {
  const {
    actions: { setCampaignLevel, setPlayerName },
    values: { campaignLevel, playerName },
  } = useContext(ProfileContext);

  const { t } = useTranslation("guild");

  return (
    <>
      <CardTitle>{t("title-player")}</CardTitle>

      <InputField
        label={t("label-player-name")}
        name="name"
        onChange={(e) => setPlayerName(e)}
        value={playerName}
      />

      <InputField
        name="campaign-level"
        value={campaignLevel}
        label={t("label-campaign-level")}
        onChange={setCampaignLevel}
      />
    </>
  );
};

export default CardPlayer;
