import React from "react";
import { compareChapter } from "../../../../lib/chapter";
import Item from "../../../ui/afk/Item";
import CardValue from "../../../ui/card/CardValue";

interface IProps {
  count: number;
  campaignLevel: string;
  diamsLevel: string;
}

const DiamondLine: React.FC<IProps> = function DiamondLine({ count, campaignLevel, diamsLevel }) {
  if (compareChapter(campaignLevel, diamsLevel) < 0) {
    return null;
  }

  return (
    <CardValue>
      {count}
      &nbsp;
      <Item name="diamond" size="small" />
    </CardValue>
  );
};

DiamondLine.propTypes = {};

export default DiamondLine;
