import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseEnemi from "../../../modal/ChooseEnemi";
import Enemi from "../../../ui/afk/Enemi";
import useEnemi from "../hooks/useEnemi";
import styles from "./EnemiPosition.module.css";

interface Props {
  position: number;
  enemi?: number;
  onSelect: (position: number) => (value: number) => void;
}

const EnemiPosition: React.FC<Props> = ({ enemi, position, onSelect }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getEnemi } = useEnemi();
  const { id, image, name } = getEnemi(enemi) ?? { id: 0, name: "" };

  return (
    <>
      <div className={`${styles.EnemiPosition} ${styles[`EnemiPosition--${position}`]}`}>
        {enemi ? (
          <Enemi id={id} name={name} image={image} onClick={() => setShowModal(true)} />
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
            onSelect(position)(enemiId);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default EnemiPosition;
