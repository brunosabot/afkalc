import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../ui/card/Card";

interface IProps {
  showHelp: boolean;
}

const Help: React.FC<IProps> = ({ showHelp }) => {
  const { t } = useTranslation("item-cost");

  if (showHelp === false) return null;

  return (
    <Card>
      <div style={{ padding: "0 16px" }}>
        <p>{t("help")}</p>
      </div>
    </Card>
  );
};

export default Help;
