import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import Character from "../../../ui/afk/Character";
import useHero from "../hooks/useHero";
import styles from "./PlayerPosition.module.css";

interface Props {
  position: number;
  hero?: number;
  onSelect: (position: number) => (value: number) => void;
}

const PlayerPosition: React.FC<Props> = ({ hero, position, onSelect }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { id, name } = getHero(hero) ?? { id: 0, name: "" };

  return (
    <>
      <div className={`${styles.PlayerPosition} ${styles[`PlayerPosition--${position}`]}`}>
        {hero ? (
          <Character name={name} onClick={() => setShowModal(true)} />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseHero
          current={id}
          onSelect={(heroId) => {
            onSelect(position)(heroId);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default PlayerPosition;
