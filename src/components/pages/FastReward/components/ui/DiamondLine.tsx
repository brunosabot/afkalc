import React from "react";
import { compareChapter } from "../../../../../lib/chapter";
import CardValue from "../../../../ui/card/CardValue";

interface IProps {
  count: number;
  campaignLevel: string;
  diamsLevel: string;
}

const DiamondLine: React.FC<IProps> = ({ count, campaignLevel, diamsLevel }) => {
  if (compareChapter(campaignLevel, diamsLevel) < 0) {
    return null;
  }

  return (
    <CardValue>
      {count}
      <img className="diamond-line__image" src="/diamond.jpg" alt="diamonds" />
    </CardValue>
  );
};

DiamondLine.propTypes = {};

export default DiamondLine;
