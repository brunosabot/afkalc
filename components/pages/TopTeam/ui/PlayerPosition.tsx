import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import SelectHero from "../../../modal/SelectHero";
import Character from "../../../ui/afk/Character";
import styles from "./PlayerPosition.module.css";

interface Hero {
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Props {
  position: number;
  hero: Hero;
  onSelect: (position: number) => (value: Hero) => void;
}

const PlayerPosition: React.FC<Props> = function PlayerPosition({ hero, position, onSelect }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={`${styles.PlayerPosition} ${styles[`PlayerPosition--${position}`]}`}>
        {hero.id ? (
          <Character
            id={hero.id ?? 0}
            onClick={() => setShowModal(true)}
            ascendLevel={hero.ascend}
            siLevel={hero.si}
            fiLevel={hero.fi}
            engraveLevel={hero.engrave}
            artifact={hero.artifact}
            size="large"
          />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <SelectHero hero={hero} onSelect={onSelect(position)} />
      </Modal>
    </>
  );
};

export default PlayerPosition;
