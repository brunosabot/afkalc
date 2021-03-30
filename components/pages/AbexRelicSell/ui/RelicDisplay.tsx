import React from "react";
import HeroClass from "../../../../types/HeroClass";
import styles from "./RelicDisplay.module.css";

interface Props {
  relic: number;
  position: number;
  level: number;
  theClass: HeroClass;
  active?: number;
  onClick: (position: number, theClass: HeroClass, relic: number, level: number) => void;
}

const RelicDisplay: React.FC<Props> = ({
  relic,
  position,
  level,
  theClass,
  active = 0,
  onClick,
}) => {
  const relicClass = styles[`Relic--${level}`];
  const positionClass = styles[`Position--${position}`];
  const isActive = active >= relic;

  return (
    <button
      type="button"
      className={`${styles.Relic} ${relicClass} ${positionClass} ${
        isActive ? "" : styles.Inactive
      }`}
      onClick={() => onClick(position, theClass, relic, level)}
    >
      <img
        key={relic}
        src={`/relics/relic_${relic}.png`}
        className={styles.Image}
        style={{ height: "100%" }}
        alt={`${relic}`}
      />
    </button>
  );
};

export default RelicDisplay;
