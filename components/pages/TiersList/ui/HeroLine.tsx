import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import React, { useState } from "react";
import IHeroDetails from "../../../../types/IHeroDetails";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import { IFirebasePriorityListHero } from "../../../providers/types/IFirebasePriorityList";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import styles from "./HeroLine.module.css";

interface Props {
  hero: IFirebasePriorityListHero;
  onSelect: (value: IHeroDetails, index: number) => void;
  onDelete?: (value: IHeroDetails, index: number) => void;
  onUp?: (value: IHeroDetails, index: number) => void;
  onDown?: (value: IHeroDetails, index: number) => void;
  index: number;
  length: number;
}

const HeroLine: React.FC<Props> = ({
  hero,
  onSelect,
  onDelete = () => {},
  onUp = () => {},
  onDown = () => {},
  index,
  length,
}) => {
  const [theHero, setTheHero] = useState<IFirebasePriorityListHero>(hero);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { name } = getHero(theHero.hero) ?? { name: "" };

  const canMoveUp = hero.hero && index > 0;
  const canMoveDown = hero.hero && index + 1 < length;

  return (
    <div className={styles.HeroLine}>
      <Character
        name={name}
        onClick={() => setShowModal(true)}
        ascendLevel={theHero.ascend}
        siLevel={theHero.si}
        fiLevel={theHero.fi}
        engraveLevel={theHero.engrave}
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
