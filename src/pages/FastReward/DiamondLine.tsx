import React from "react";
import CardValue from "../../components/ui/card/CardValue";

interface IProps {
  count: number;
  campaignLevel: string;
  diamsLevel: string;
}

function compareLevel(levelA: string, levelB: string) {
  const splittedLevelA = levelA.split("-").map((e) => parseInt(e, 10));
  const splittedLevelB = levelB.split("-").map((e) => parseInt(e, 10));

  if (splittedLevelA[0] < splittedLevelB[0]) {
    return -1;
  }
  if (splittedLevelA[0] > splittedLevelB[0]) {
    return 1;
  }
  if (splittedLevelA[1] < splittedLevelB[1]) {
    return -1;
  }
  if (splittedLevelA[1] > splittedLevelB[1]) {
    return 1;
  }
  return 0;
}

const DiamondLine: React.FC<IProps> = ({ count, campaignLevel, diamsLevel }) => {
  if (compareLevel(campaignLevel, diamsLevel) < 0) {
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
