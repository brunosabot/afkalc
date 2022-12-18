import { mdiMinus, mdiPlus } from "@mdi/js";
import Image from "next/image";
import React from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import HeroClass from "../../../../types/HeroClass";
import styles from "./RelicDisplay.module.css";
import RelicPlus from "./RelicPlus";

type RelicLevel = 0 | 1 | 2 | 3 | 4 | 5;

const abexTree = abexRelicData.tree as Record<HeroClass, Record<RelicLevel, number[]>>;

interface Props {
  position: number;
  theClass: HeroClass;
  active?: number;
  onClick: (position: number, theClass: HeroClass, level: number) => void;
}

const RelicDisplay: React.FC<Props> = function RelicDisplay({
  position,
  theClass,
  active = 0,
  onClick,
}) {
  const currentRelicLevel = Math.floor(active / 1000) as RelicLevel;
  const relicClass = styles[`Relic--${currentRelicLevel}`];
  const positionClass = styles[`Position--${position}`];
  const theClassTree = abexTree[theClass];

  let previous = abexRelicData.tree[theClass][0][position - 1];
  let next = abexRelicData.tree[theClass][0][position - 1];
  if (currentRelicLevel > 0 && currentRelicLevel <= 5) {
    const prevIndex = (currentRelicLevel - 1) as RelicLevel;
    previous = theClassTree[prevIndex][position - 1];
  }
  if (currentRelicLevel < 5 && currentRelicLevel >= 0) {
    const nextIndex = (currentRelicLevel + 1) as RelicLevel;
    next = theClassTree[nextIndex][position - 1];
  }

  const currentRelic = active || abexRelicData.tree[theClass][1][position - 1];

  return (
    <div
      className={`${styles.RelicWrapper} ${positionClass} ${active <= 0 ? styles.Inactive : ""}`}
    >
      <RelicPlus
        show={currentRelicLevel > 0}
        onClick={() => onClick(position, theClass, previous)}
        icon={mdiMinus}
      />
      <div className={`${styles.Relic} ${relicClass}`}>
        <Image
          key={currentRelic}
          src={`/relics/relic_${currentRelic}.png`}
          className={styles.Image}
          style={{ height: "100%" }}
          alt={`${currentRelic}`}
          height={42}
          width={42}
        />
      </div>
      <RelicPlus
        show={currentRelicLevel < 5}
        onClick={() => onClick(position, theClass, next)}
        icon={mdiPlus}
      />
    </div>
  );
};

export default RelicDisplay;
