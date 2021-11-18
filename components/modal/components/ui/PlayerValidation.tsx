import React from "react";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import Character from "../../../ui/afk/Character";
import ListItem from "../../../ui/list/ListItem";
import styles from "./PlayerValidation.module.css";

interface IProps {
  id: number;
  playerHero?: IFirebaseHeroesHero;
  playerName?: string;
}

const PlayerValidation: React.FC<IProps> = function PlayerValidation({
  playerHero,
  playerName,
  id,
}) {
  return (
    <ListItem>
      <Character
        ascendLevel={playerHero?.ascend}
        siLevel={playerHero?.si}
        fiLevel={playerHero?.fi}
        engraveLevel={playerHero?.engrave}
        id={id}
      />
      <div className={styles.PlayerName}>{playerName}</div>
    </ListItem>
  );
};

export default PlayerValidation;
