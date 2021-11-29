import React, { useCallback, useState } from "react";
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
          <CardHelp>{getRelicRank(current[theClass])}</CardHelp>
        </div>
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

      <span />
    </div>
  );
};

export default RelicChoiceList;
