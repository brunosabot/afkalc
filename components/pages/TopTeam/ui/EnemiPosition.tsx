import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseEnemi from "../../../modal/ChooseEnemi";
import { DetailType } from "../../../ui/afk/Character";
import Enemi from "../../../ui/afk/Enemi";
import useEnemi from "../hooks/useEnemi";
import styles from "./EnemiPosition.module.css";

interface Props {
  position: number;
  enemi?: number;
  onSelect: (type: DetailType, position: number) => (value: number) => void;
}

const EnemiPosition: React.FC<Props> = function EnemiPosition({ enemi, position, onSelect }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getEnemi } = useEnemi();
  const { id, name } = getEnemi(enemi) ?? { id: 0, name: "" };

  return (
    <>
      <div className={`${styles.EnemiPosition} ${styles[`EnemiPosition--${position}`]}`}>
        {enemi ? (
          <Enemi name={name} size="large" onClick={() => setShowModal(true)} />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChooseEnemi
          current={id}
          onSelect={(enemiId) => {
            onSelect(DetailType.HERO, position)(enemiId);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default EnemiPosition;
