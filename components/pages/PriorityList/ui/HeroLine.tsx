import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import styles from "./HeroLine.module.css";

interface Props {
  hero?: number;
  onSelect: (value: number, index: number) => void;
  onDelete?: (value: number, index: number) => void;
  onUp?: (value: number, index: number) => void;
  onDown?: (value: number, index: number) => void;
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { id, name } = getHero(hero) ?? { id: 0, name: "" };

  const canMoveUp = hero && index > 0;
  const canMoveDown = hero && index + 1 < length;

  return (
    <div className={styles.HeroLine}>

      <Character name={name} onClick={() => setShowModal(true)} />
      <span className={styles.Name}>{name}</span>

      <Svg d={canMoveUp ? mdiArrowUpBold :""} onClick={() => canMoveUp&&onUp(id, index)} />
      <Svg d={canMoveDown ? mdiArrowDownBold :""} onClick={() => canMoveDown&& onDown(id, index)} />
      <Svg d={mdiDelete} onClick={() => onDelete(id, index)} />

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseHero
          onlyHero
          current={[id]}
          onSelect={(_, heroId) => {
            onSelect(heroId, index);
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default HeroLine;
