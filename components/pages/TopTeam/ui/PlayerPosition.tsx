import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseHero from "../../../modal/ChooseHero";
import Character, { DetailType } from "../../../ui/afk/Character";
import useHero from "../hooks/useHero";
import styles from "./PlayerPosition.module.css";

interface Props {
  position: number;
  hero?: number;
  si?: number;
  inn?: number;
  artifact?: number;
  onSelect: (type: DetailType, position: number) => (value: number) => void;
}

const PlayerPosition: React.FC<Props> = ({ hero, position, onSelect, si, inn, artifact }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getHero } = useHero();
  const { id, name } = getHero(hero) ?? { id: 0, name: "" };

  return (
    <>
      <div className={`${styles.PlayerPosition} ${styles[`PlayerPosition--${position}`]}`}>
        {hero ? (
          <Character name={name} onClick={() => setShowModal(true)} siLevel={si} innLevel={inn} artifact={artifact} />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseHero
          current={[id, si||0, inn||0, artifact||0]}
          onSelect={(type, heroId) => {
            onSelect(type, position)(heroId);
          }}
        />
      </Modal>
    </>
  );
};

export default PlayerPosition;
