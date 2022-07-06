import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseEnemi from "../../../modal/ChooseEnemi";
import Character from "../../../ui/afk/Character";
import Enemi from "../../../ui/afk/Enemi";
import styles from "./EnemiPosition.module.css";

interface Hero {
  type: "h" | "e";
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Props {
  position: number;
  enemi: Hero;
  onSelect: (position: number) => (value: Hero) => void;
}

const EnemiPosition: React.FC<Props> = function EnemiPosition({ enemi, position, onSelect }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={`${styles.EnemiPosition} ${styles[`EnemiPosition--${position}`]}`}>
        {enemi?.id && enemi.type === "e" ? (
          <Enemi id={enemi?.id ?? 0} size="large" onClick={() => setShowModal(true)} />
        ) : null}

        {enemi?.id && enemi.type === "h" ? (
          <Character id={enemi?.id ?? 0} onClick={() => setShowModal(true)} size="large" />
        ) : null}

        {!enemi.id && (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseEnemi enemi={enemi} onSelect={onSelect(position)} />
      </Modal>
    </>
  );
};

export default EnemiPosition;
