import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import SelectPet from "../../../modal/SelectPet";
import Pet from "../../../ui/afk/Pet";
import styles from "./PetPosition.module.css";

interface IPet {
  id: string;
  agilityBuff: number;
  intelligenceBuff: number;
  strengthBuff: number;
}

interface Props {
  position: number;
  pet: IPet;
  onSelect: (position: number) => (value: IPet) => void;
}

const PetPosition: React.FC<Props> = function PetPosition({ pet, position, onSelect }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={`${styles.PetPosition} ${styles[`PetPosition--${position}`]}`}>
        {pet.id && parseInt(pet.id, 10) > 6000 ? (
          <Pet
            agilityBuff={0}
            intelligenceBuff={0}
            strengthBuff={0}
            id={pet.id ?? ""}
            onClick={() => setShowModal(true)}
            size="small"
          />
        ) : (
          <button type="button" className={styles.Add} onClick={() => setShowModal(true)}>
            +
          </button>
        )}
      </div>
      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <SelectPet pet={pet} onSelect={onSelect(position)} />
      </Modal>
    </>
  );
};

export default PetPosition;
