import React from "react";
import { useTranslation } from "react-i18next";
import { compareChapter } from "../../../../../lib/chapter";
import CardValue from "../../../../ui/card/CardValue";

interface IProps {
  count: number;
  campaignLevel: string;
  diamsLevel: string;
}

const DiamondLine: React.FC<IProps> = ({ count, campaignLevel, diamsLevel }) => {
  const {t}=useTranslation("fast-reward");

  if (compareChapter(campaignLevel, diamsLevel) < 0) {
    return null;
  }

  return (
    <CardValue>
      {count}
      <img className="diamond-line__image" src="/diamond.jpg" alt={t("diamonds")} />
    </CardValue>
  );
};

DiamondLine.propTypes = {};

export default DiamondLine;
