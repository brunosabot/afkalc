import { useTranslation } from "next-i18next";
import React from "react";
import CardHelp from "../../../ui/card/CardHelp";

interface IProps {
  [key: string]: never;
}

const Help: React.FC<IProps> = function Help() {
  const { t } = useTranslation("item-cost");

  return <CardHelp>{t("help")}</CardHelp>;
};

export default Help;
