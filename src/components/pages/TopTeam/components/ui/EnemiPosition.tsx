import React, { useState } from "react";
import factions from "../../../../../data/enemies.json";
import Modal from "../../../../functionnal/Modal";
import ChooseEnemi from "../../../../modal/ChooseEnemi";
import Enemi from "../../../../ui/afk/Enemi";
import styles from "./EnemiPosition.module.css";

interface IEnemi {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
  image?: string;
}

interface IFaction {
  faction: string;
  characters: IEnemi[];
}

const defaultEnemies: IEnemi[] = [];
const factionJson = factions as IFaction[];

const enemies: IEnemi[] = factionJson.reduce((acc, faction: IFaction) => {
  return [...acc, ...faction.characters];
}, defaultEnemies);

interface Props {
  position: number;
  enemi?: number;
  onSelect: (position: number) => (value: number) => void;
}

function getEnemi(enemi?: number) {
  return enemies.find((character) => {
    return character.id === enemi;
  });
}

const EnemiPosition: React.FC<Props> = ({ enemi, position, onSelect }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
