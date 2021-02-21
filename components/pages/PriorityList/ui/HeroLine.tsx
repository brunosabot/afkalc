import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import React, { useState } from "react";
import IHeroDetails from "../../../../types/IHeroDetails";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import styles from "./HeroLine.module.css";

interface Props {
  hero: number | IHeroDetails;
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
  const [theHero, setTheHero] = useState<IHeroDetails>(
    typeof hero === "number" ? { id: hero } : hero
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { name } = getHero(theHero.id) ?? { id: 0, name: "" };

  const canMoveUp = hero && index > 0;
  const canMoveDown = hero && index + 1 < length;

  return (
    <div className={styles.HeroLine}>
      <Character
        name={name}
        onClick={() => setShowModal(true)}
        ascendLevel={theHero.ascend}
        siLevel={theHero.si}
        innLevel={theHero.fi}
      />
      <span className={styles.Name}>{name}</span>

      <Svg d={canMoveUp ? mdiArrowUpBold : ""} onClick={() => canMoveUp && onUp(theHero, index)} />
      <Svg
        d={canMoveDown ? mdiArrowDownBold : ""}
        onClick={() => canMoveDown && onDown(theHero, index)}
      />
      <Svg d={mdiDelete} onClick={() => onDelete(theHero, index)} />

      <Modal
        active={showModal}
        onClose={() => {
          onSelect(theHero, index);
          setShowModal(false);
        }}
      >
        <ChoosePriorityHero
          id={theHero.id}
          si={theHero.si}
          fi={theHero.fi}
          ascend={theHero.ascend}
          onSelect={setTheHero}
        />
      </Modal>
    </div>
  );
};

export default HeroLine;
