import React from "react";
import factions from "../../data/heroes.json";
import Character from "../ui/afk/Character";
import styles from "./ChooseHero.module.css";
import FactionLine from "./components/ui/FactionLine";

interface Props {
  onSelect: (value: number) => void;
  current: number;
}

const ChooseHero: React.FC<Props> = ({ current, onSelect }) => {
  return (
    <div className={styles.ChooseHero}>
      {factions.map((faction) => {
        return (
          <React.Fragment key={faction.faction}>
            <FactionLine name={faction.faction} />
            <div className={styles.Heroes}>
              {faction.characters.map(({ id, name }) => (
                <Character
                  key={id}
                  name={name}
                  onClick={() => onSelect(id)}
                  highlight={current === id}
                />
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ChooseHero;
