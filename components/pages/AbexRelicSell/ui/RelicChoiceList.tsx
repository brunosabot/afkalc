import React, { useCallback, useState } from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import heroClassData from "../../../../data/heroClass.json";
import HeroClass from "../../../../types/HeroClass";
import EvenColumn from "../../../ui/layout/EvenColumn";
import Current from "../types/Current";
import ButtonClass from "./ButtonClass";
import ButtonLevel from "./ButtonLevel";
import styles from "./RelicChoiceList.module.css";
import RelicDisplay from "./RelicDisplay";

const heroClasses = heroClassData as HeroClass[];

interface IProps {
  current: Current;
  setCurrent: (value: Current) => void;
}

type RelicLevel = 1 | 2 | 3 | 4 | 5;

const RelicChoiceList: React.FC<IProps> = ({ current, setCurrent }) => {
  const [level, setLevel] = useState<RelicLevel>(5);
  const [theClass, setTheClass] = useState<HeroClass>(HeroClass.ranger);

  const updateCurrent = useCallback(
    (position: number, relicClass: HeroClass, relic: number) => {
      const newCurrent = { ...current };
      newCurrent[relicClass][position - 1] = relic;
      setCurrent(newCurrent);
    },
    [current, setCurrent]
  );

  return (
    <div className={styles.Wrapper}>
      <EvenColumn>
        {heroClasses.map((classItem) => (
          <ButtonClass current={theClass} theClass={HeroClass[classItem]} onClick={setTheClass} />
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
            isActive={current[theClass].includes(relic)}
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
