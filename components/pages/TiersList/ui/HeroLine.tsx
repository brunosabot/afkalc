import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import {
  IFirebasePriorityListHero,
  IFirebasePriorityListRequirement,
} from "../../../providers/types/IFirebasePriorityList";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import styles from "./HeroLine.module.css";

interface Props {
  hero: IFirebasePriorityListHero;
  onSelect: (value: IFirebasePriorityListHero, index: number) => void;
  onDelete?: (value: IFirebasePriorityListHero, index: number) => void;
  onUp?: (value: IFirebasePriorityListHero, index: number) => void;
  onDown?: (value: IFirebasePriorityListHero, index: number) => void;
  index: number;
  length: number;
  requirement: IFirebasePriorityListRequirement;
  requirementValue: number;
}

const HeroLine: React.FC<Props> = function HeroLine({
  hero,
  onSelect,
  onDelete = () => {},
  onUp = () => {},
  onDown = () => {},
  index,
  length,
  requirement,
  requirementValue,
}) {
  const { t: tC } = useTranslation("common");
  const [theHero, setTheHero] = useState<IFirebasePriorityListHero>(hero);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { name } = getHero(tC, theHero.hero) ?? { name: "" };

  const canMoveUp = hero.hero && index > 0;
  const canMoveDown = hero.hero && index + 1 < length;

  const requiredAscend = Math.max(theHero.ascend, requirement === "ASCEND" ? requirementValue : 0);
  const requiredSi = Math.max(theHero.si, requirement === "SI" ? requirementValue : -1);
  const requiredFi = Math.max(theHero.fi, requirement === "FI" ? requirementValue : 0);
  const requiredEngrave = Math.max(
    theHero.engrave,
    requirement === "ENGRAVE" ? requirementValue : 0
  );

  return (
    <div className={styles.HeroLine}>
      <Character
        id={hero.hero}
        name={name}
        onClick={() => setShowModal(true)}
        ascendLevel={requiredAscend}
        siLevel={requiredSi}
        fiLevel={requiredFi}
        engraveLevel={requiredEngrave}
      />
      <span className={styles.Name}>{name}</span>

      {canMoveUp ? <Svg d={mdiArrowUpBold} onClick={() => onUp(theHero, index)} /> : <Svg d="" />}
      {canMoveDown ? (
        <Svg d={mdiArrowDownBold} onClick={() => onDown(theHero, index)} />
      ) : (
        <Svg d="" />
      )}
      <Svg d={mdiDelete} onClick={() => onDelete(theHero, index)} />

      <Modal
        active={showModal}
        onClose={() => {
          onSelect(theHero, index);
          setShowModal(false);
        }}
      >
        <ChoosePriorityHero
          hero={theHero.hero}
          si={theHero.si}
          fi={theHero.fi}
          engrave={theHero.engrave}
          ascend={theHero.ascend}
          onSelect={setTheHero}
        />
      </Modal>
    </div>
  );
};

export default HeroLine;
