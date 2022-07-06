import { useTranslation } from "next-i18next";
import React from "react";
import CardShare from "../../../ui/card/CardShare";

interface IProps {
  url: string;
}

const ShareBanner: React.FC<IProps> = function ShareBanner({ url }) {
  const { t } = useTranslation("top-team");

  return <CardShare label={t("label-share")}>{url}</CardShare>;
};

export default ShareBanner;
