import React from "react";
import { useTranslation } from "react-i18next";
import CardHelp from "../../../ui/card/CardHelp";

interface IProps {
  [key: string]: never;
}

const Help: React.FC<IProps> = () => {
  const { t } = useTranslation("item-cost");

  return <CardHelp>{t("help")}</CardHelp>;
};

export default Help;
