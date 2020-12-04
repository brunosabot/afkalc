import React from "react";
import { useTranslation } from "../../../../i18n";
import CardShare from "../../../ui/card/CardShare";

interface IData {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
}

interface IProps {
  data: IData;
}

const ShareBanner: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation("top-team");

  const d1 = String.fromCharCode((data[1] || 0) + 48);
  const d2 = String.fromCharCode((data[2] || 0) + 48);
  const d3 = String.fromCharCode((data[3] || 0) + 48);
  const d4 = String.fromCharCode((data[4] || 0) + 48);
  const d5 = String.fromCharCode((data[5] || 0) + 48);
  const d6 = String.fromCharCode((data[6] || 0) + 48);
  const code = encodeURIComponent(`${d1}${d2}${d3}${d4}${d5}${d6}`);
  const value = `https://afkalc.heycoucou.com/top-team/${code}`;

  return <CardShare label={t("label-share")}>{value}</CardShare>;
};

export default ShareBanner;
