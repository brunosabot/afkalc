import Image from "next/image";
import React from "react";
import HeroClass from "../../../../types/HeroClass";
import styles from "./RelicCalculator.module.css";
import RelicCalculatorButton from "./RelicCalculatorButton";

type RelicLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface Props {
  name: HeroClass;
  current: number[];
  setCurrent: (value: number[]) => void;
}

const RelicCalculatorClass: React.FC<Props> = function RelicCalculatorClass({
  name,
  current,
  setCurrent,
}) {
  return (
    <div className={styles.Class}>
      <Image
        src={`/classes/${name}.png`}
        className={styles.Image}
        alt={name}
        height={32}
        width={32}
      />
      {current.map((relic, position) => {
        const currentRelicLevel = Math.floor(relic / 1000) as RelicLevel;
        const relicClass = styles[`Relic--${currentRelicLevel}`];
        return (
          <div className={styles.RelicWrapper}>
            <RelicCalculatorButton
              current={current}
              position={position}
              setCurrent={setCurrent}
              relic={relic}
              name={name}
            />
            <Image
              height={40}
              width={40}
              key={relic}
              src={`/relics/relic_${relic}.png`}
              className={`${styles.Relic} ${relicClass}`}
              alt={`${relic}`}
            />
            <RelicCalculatorButton
              current={current}
              position={position}
              setCurrent={setCurrent}
              relic={relic}
              name={name}
              isMore
            />
          </div>
        );
      })}
    </div>
  );
};

export default RelicCalculatorClass;
