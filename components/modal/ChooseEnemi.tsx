import React from "react";
import factions from "../../data/enemies.json";
import Enemi from "../ui/afk/Enemi";
import styles from "./ChooseEnemi.module.css";
import FactionLine from "./components/ui/FactionLine";

interface Props {
  onSelect: (value: number) => void;
  current: number;
}

const ChooseEnemi: React.FC<Props> = ({ current, onSelect }) => (
  <div className={styles.ChooseEnemi}>
    {factions.map((faction) => (
      <React.Fragment key={faction.faction}>
        <FactionLine name={faction.faction} />
        <div className={styles.Enemies}>
          {faction.characters.map(({ id, name, image }) => (
            <Enemi key={name} name={name} onClick={() => onSelect(id)} highlight={current === id} />
          ))}
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default ChooseEnemi;
