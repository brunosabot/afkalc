import { Trans, useTranslation } from "next-i18next";
import React from "react";
import CardHelp from "../../../ui/card/CardHelp";
import InSeason from "../../../ui/reddit/InSeason";
import RedditFastReward from "./RedditFastReward";

interface IProps {
  [key: string]: never;
}

const Help: React.FC<IProps> = function Help() {
  const { t } = useTranslation("fast-reward");

  return (
    <CardHelp>
      <div>{t("help-title")}</div>
      <div style={{ marginTop: "8px" }}>
        <Trans
          i18nKey="fast-reward:help-credit"
          components={{ who: <InSeason />, where: <RedditFastReward /> }}
        />
      </div>
    </CardHelp>
  );
};

export default Help;
