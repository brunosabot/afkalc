import React, { useCallback, useState } from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import heroClassData from "../../../../data/heroClass.json";
import { getRelicRank } from "../../../../lib/abex";
import HeroClass from "../../../../types/HeroClass";
import { IFirebaseAbyssalExpeditionClassRelics } from "../../../providers/types/IFirebaseAbyssalExpedition";
import CardHelp from "../../../ui/card/CardHelp";
import EvenColumn from "../../../ui/layout/EvenColumn";
import ButtonClass from "./ButtonClass";
import styles from "./RelicChoiceList.module.css";
import RelicDisplay from "./RelicDisplay";

const heroClasses = heroClassData as HeroClass[];

interface IProps {
  current: IFirebaseAbyssalExpeditionClassRelics;
  setCurrent: (value: IFirebaseAbyssalExpeditionClassRelics) => void;
}

const RelicChoiceList: React.FC<IProps> = function RelicChoiceList({ current, setCurrent }) {
  const [theClass, setTheClass] = useState<HeroClass>(HeroClass.warrior);

  const updateCurrent = useCallback(
    (position: number, relicClass: HeroClass, currentLevel: number) => {
      const newCurrent = { ...current };

      newCurrent[relicClass][position - 1] = currentLevel;

      setCurrent(newCurrent);
    },
    [current, setCurrent]
  );

  const fastUpdate = (level: "0" | "1" | "2" | "3" | "4" | "5") => {
    const newCurrent = { ...current };

    newCurrent[theClass] = abexRelicData.tree[theClass][level];

    setCurrent(newCurrent);
  };

  return (
    <div className={styles.Wrapper}>
      <EvenColumn>
        {heroClasses.map((classItem) => (
          <ButtonClass
            key={classItem}
            current={theClass}
            theClass={HeroClass[classItem]}
            onClick={setTheClass}
          />
        ))}
      </EvenColumn>

      <div className={styles.Box}>
        <div className={styles.BoxValue}>
          <CardHelp>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {getRelicRank(current[theClass])}
              <button className={styles.BoxFastReset} onClick={() => fastUpdate("0")} type="button">
                Reset
              </button>
            </div>
          </CardHelp>
          <div className={styles.BoxFasts}>
            <button className={styles.BoxFast} onClick={() => fastUpdate("1")} type="button">
              2.0
            </button>
            <button className={styles.BoxFast} onClick={() => fastUpdate("2")} type="button">
              3.0
            </button>
            <button className={styles.BoxFast} onClick={() => fastUpdate("3")} type="button">
              4.0
            </button>
            <button className={styles.BoxFast} onClick={() => fastUpdate("4")} type="button">
              5.0
            </button>
            <button className={styles.BoxFast} onClick={() => fastUpdate("5")} type="button">
              5.6
            </button>
          </div>
        </div>
        <div style={{ position: "relative", height: "200px" }}>
          {current[theClass].map((relic: number, i: number) => (
            <RelicDisplay
              key={relic}
              position={i + 1}
              theClass={theClass}
              active={current[theClass][i]}
              onClick={updateCurrent}
            />
          ))}
        </div>
      </div>

      <span />
    </div>
  );
};

export default RelicChoiceList;
