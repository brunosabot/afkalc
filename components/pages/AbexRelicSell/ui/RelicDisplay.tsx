import { mdiCheckBold } from "@mdi/js";
import React from "react";
import HeroClass from "../../../../types/HeroClass";
import Svg from "../../../ui/Svg";
import styles from "./RelicDisplay.module.css";

interface Props {
  relic: number;
  position: number;
  level: number;
  theClass: HeroClass;
  isActive?: boolean;
  onClick: (position: number, theClass: HeroClass, relic: number) => void;
}

const RelicDisplay: React.FC<Props> = ({
  relic,
  position,
  level,
  theClass,
  isActive = false,
  onClick,
}) => {
  const relicClass = styles[`Relic--${level}`];
  const positionClass = styles[`Position--${position}`];

  return (
    <button
      type="button"
      className={`${styles.Relic} ${relicClass} ${positionClass}`}
      onClick={() => onClick(position, theClass, relic)}
    >
      <img
        key={relic}
        src={`/relics/relic_${relic}.png`}
        className={styles.Image}
        style={{ height: "100%" }}
        alt={`${relic}`}
      />

      {isActive ? (
        <span className={styles.Check} data-testid="check">
          <Svg d={mdiCheckBold} />
        </span>
      ) : null}
    </button>
  );
};

export default RelicDisplay;
