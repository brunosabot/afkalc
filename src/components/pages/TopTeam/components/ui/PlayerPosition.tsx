import React, { useState } from "react";
import factions from "../../../../../data/heroes.json";
import Modal from "../../../../functionnal/Modal";
import ChooseHero from "../../../../modal/ChooseHero";
import Character from "../../../../ui/afk/Character";
import styles from "./PlayerPosition.module.css";

interface Hero {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
}

interface Faction {
  faction: string;
  characters: Hero[];
}

const defaultHeroes: Hero[] = [];
const factionJson = factions as Faction[];

const heroes: Hero[] = factionJson.reduce((acc, faction: Faction) => {
  return [...acc, ...faction.characters];
}, defaultHeroes);

interface Props {
  position: number;
  hero?: number;
  onSelect: (position: number) => (value: number) => void;
}

function getHero(hero?: number) {
  return heroes.find((character) => {
    return character.id === hero;
  });
}

const PlayerPosition: React.FC<Props> = ({ hero, position, onSelect }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id, name } = getHero(hero) ?? { id: 0, name: "" };

  return (
    <>
      <div className={`${styles.PlayerPosition} ${styles[`PlayerPosition--${position}`]}`}>
        {hero ? (
          <Character id={id} name={name} onClick={() => setShowModal(true)} />
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
