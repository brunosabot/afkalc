import React from "react";
import { Trans, useTranslation } from "react-i18next";
import Card from "../../../../ui/card/Card";
import InSeason from "../../../../ui/reddit/InSeason";
import RedditFastReward from "./RedditFastReward";

interface IProps {
  showHelp: boolean;
}

const Help: React.FC<IProps> = ({ showHelp }) => {
  const {t} = useTranslation("fast-reward");

  if (showHelp === false) return null;

  return (
    <Card>
      <div style={{ padding: "0 16px" }}>
        <p>{t("help-title")}</p>
        <p>
          <Trans
            i18nKey="help-credit"
            components={{ who: <InSeason />, where: <RedditFastReward /> }}
          />
        </p>
      </div>
    </Card>
  );
};

export default Help;
