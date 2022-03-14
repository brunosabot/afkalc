import React from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import HeroClass from "../../../../types/HeroClass";
import styles from "./RelicCalculator.module.css";

type RelicLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface Props {
  relic: number;
  current: number[];
  position: number;
  isMore?: boolean;
  setCurrent: (value: number[]) => void;
  name: HeroClass;
}

const RelicCalculatorButton: React.FC<Props> = function RelicCalculatorButton({
  current,
  relic,
  position,
  isMore = false,
  setCurrent,
  name,
}) {
  const currentRelicLevel = Math.floor(relic / 1000) as RelicLevel;

  return (
    <button
      type="button"
      className={styles.RelicButton}
      onClick={() => {
        if ((isMore && currentRelicLevel < 5) || (isMore === false && currentRelicLevel > 1)) {
          const newIndex = (isMore ? currentRelicLevel + 1 : currentRelicLevel - 1) as RelicLevel;

          const previous = abexRelicData.tree[name][newIndex][position] as number;
          const newCurrent = [...current];
          newCurrent[position] = previous;
          setCurrent(newCurrent);
        }
      }}
    >
      {isMore ? "+" : "-"}
    </button>
  );
};

export default RelicCalculatorButton;
