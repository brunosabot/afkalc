import React, { useCallback, useState } from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import heroClassData from "../../../../data/heroClass.json";
import HeroClass from "../../../../types/HeroClass";
import { IFirebaseAbyssalExpeditionClassRelics } from "../../../providers/types/IFirebaseAbyssalExpedition";
import EvenColumn from "../../../ui/layout/EvenColumn";
import ButtonClass from "./ButtonClass";
import ButtonLevel from "./ButtonLevel";
import styles from "./RelicChoiceList.module.css";
import RelicDisplay from "./RelicDisplay";

const heroClasses = heroClassData as HeroClass[];
const abexTree = abexRelicData.tree as Record<HeroClass, Record<RelicLevel, number[]>>;

interface IProps {
  current: IFirebaseAbyssalExpeditionClassRelics;
  setCurrent: (value: IFirebaseAbyssalExpeditionClassRelics) => void;
}

type RelicLevel = 1 | 2 | 3 | 4 | 5;

const RelicChoiceList: React.FC<IProps> = function RelicChoiceList({ current, setCurrent }) {
  const [level, setLevel] = useState<RelicLevel>(5);
  const [theClass, setTheClass] = useState<HeroClass>(HeroClass.warrior);

  const updateCurrent = useCallback(
    (position: number, relicClass: HeroClass, relic: number, currentLevel: number) => {
      const newCurrent = { ...current };
      const currentRelic = newCurrent[relicClass][position - 1];
      const currentRelicLevel = Math.floor(currentRelic / 1000);
      const targetRelicLevel = Math.floor(relic / 1000);

      if (currentRelicLevel >= targetRelicLevel) {
        const classTree = abexTree[theClass];
        const previousLevel = (currentLevel < 1 ? 0 : currentLevel - 1) as RelicLevel;

        newCurrent[relicClass][position - 1] = classTree[previousLevel][position - 1];
      } else {
        newCurrent[relicClass][position - 1] = relic;
      }

      setCurrent(newCurrent);
    },
    [current, setCurrent, theClass]
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
        {abexRelicData.tree[theClass][level].map((relic: number, i: number) => (
          <RelicDisplay
            key={relic}
            level={level}
            position={i + 1}
            relic={relic}
            theClass={theClass}
            active={current[theClass][i]}
            onClick={updateCurrent}
          />
        ))}
      </div>

      <EvenColumn>
        <ButtonLevel current={level} level={1} onClick={setLevel} />
        <ButtonLevel current={level} level={2} onClick={setLevel} />
        <ButtonLevel current={level} level={3} onClick={setLevel} />
        <ButtonLevel current={level} level={4} onClick={setLevel} />
        <ButtonLevel current={level} level={5} onClick={setLevel} />
      </EvenColumn>
    </div>
  );
};

export default RelicChoiceList;
