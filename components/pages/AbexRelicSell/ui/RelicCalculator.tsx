import { useTranslation } from "next-i18next";
import React, { useMemo, useState } from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import HeroClass from "../../../../types/HeroClass";
import { IFirebaseAbyssalExpeditionClassRelics } from "../../../providers/types/IFirebaseAbyssalExpedition";
import CardHelp from "../../../ui/card/CardHelp";
import CardWarn from "../../../ui/card/CardWarn";
import useCurrentToGoal from "../hooks/useCurrentToGoal";
import styles from "./RelicCalculator.module.css";
import RelicCalculatorClass from "./RelicCalculatorClass";

type RelicLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface Props {
  current: IFirebaseAbyssalExpeditionClassRelics;
  inventory: { [key: number]: number };
}

function getRelic4(relic: number): number[] {
  const currentRelicLevel = Math.floor(relic / 1000) as RelicLevel;
  if (currentRelicLevel === 5) {
    return (abexRelicData.artefact as any)[relic].needs;
  }
  return [relic];
}

function getRelic3(relic: number): number[] {
  const currentRelicLevel = Math.floor(relic / 1000) as RelicLevel;
  if (currentRelicLevel === 4) {
    return (abexRelicData.artefact as any)[relic].needs;
  }
  return [relic];
}

const RelicCalculator: React.FC<Props> = function RelicCalculator({ current, inventory }) {
  const [mage, setMage] = useState(current.mage);
  const [ranger, setRanger] = useState(current.ranger);
  const [support, setSupport] = useState(current.support);
  const [tank, setTank] = useState(current.tank);
  const [warrior, setWarrior] = useState(current.warrior);

  const { t } = useTranslation("abex-relic-sell");

  const relicsForGoal = useCurrentToGoal(current, {
    mage,
    ranger,
    support,
    tank,
    warrior,
  });

  const relicsToAcquire = useMemo(() => {
    const level4: number[] = relicsForGoal.reduce<number[]>(
      (acc, relic) => [...acc, ...getRelic4(relic)],
      []
    );

    const level3: number[] = level4.reduce<number[]>(
      (acc, relic) => [...acc, ...getRelic3(relic)],
      []
    );

    const goalInventory = { ...inventory };

    return level3.filter((relic) => {
      if (goalInventory[relic] > 0) {
        goalInventory[relic] -= 1;
        return false;
      }
      return true;
    });
  }, [inventory, relicsForGoal]);

  const getUpgradeCost = (relic: number) => {
    const relicData = (abexRelicData.artefact as any)[relic];
    const needs = relicData.needs.reduce(
      (acc: number, neededRelic: number) => acc + (abexRelicData.artefact as any)[neededRelic].cost,
      0
    );

    return relicData.cost - needs;
  };

  const relicsUpgradeCost = useMemo(
    () =>
      relicsForGoal.reduce((acc, relic) => {
        const neededRelics: number[] = (abexRelicData.artefact as any)[relic].needs;

        const selfCost = getUpgradeCost(relic);
        const childrenCost = neededRelics.reduce(
          (accNeeded, neededRelic) => accNeeded + getUpgradeCost(neededRelic),
          0
        );

        return acc + selfCost + childrenCost;
      }, 0),
    [relicsForGoal]
  );

  const relicsToAcquireCosts = relicsToAcquire.reduce(
    (acc, relic) => acc + (abexRelicData.artefact as any)[relic].cost,
    0
  );

  return (
    <div className={styles.Relics}>
      <CardWarn>{t("label-warn-testing")}</CardWarn>
      <CardHelp>
        <div>
          {t("label-cost-unknown")}&nbsp;
          {new Intl.NumberFormat().format(relicsToAcquireCosts)}
        </div>

        <div>
          {t("label-cost-total")}&nbsp;
          {new Intl.NumberFormat().format(relicsToAcquireCosts + relicsUpgradeCost)}
        </div>
      </CardHelp>

      <RelicCalculatorClass current={mage} name={HeroClass.mage} setCurrent={setMage} />
      <RelicCalculatorClass current={ranger} name={HeroClass.ranger} setCurrent={setRanger} />
      <RelicCalculatorClass current={support} name={HeroClass.support} setCurrent={setSupport} />
      <RelicCalculatorClass current={tank} name={HeroClass.tank} setCurrent={setTank} />
      <RelicCalculatorClass current={warrior} name={HeroClass.warrior} setCurrent={setWarrior} />
    </div>
  );
};

export default RelicCalculator;
