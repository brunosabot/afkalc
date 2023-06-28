import React from "react";
import { IFirebasePetsPet } from "../../../providers/types/IFirebasePets";
import Pet from "../../../ui/afk/Pet";
import ListItem from "../../../ui/list/ListItem";
import styles from "./PlayerValidation.module.css";

interface IProps {
  id: number;
  playerPet?: IFirebasePetsPet;
  playerName?: string;
  disabled?: boolean;
}

const PlayerValidation: React.FC<IProps> = function PlayerValidation({
  playerPet,
  playerName,
  id,
  disabled = false,
}) {
  return (
    <ListItem>
      <Pet
        agilityBuff={disabled ? -1 : playerPet?.agilityBuff ?? -1}
        intelligenceBuff={disabled ? -1 : playerPet?.intelligenceBuff ?? -1}
        strengthBuff={disabled ? -1 : playerPet?.strengthBuff ?? -1}
        id={`${id}`}
      />
      <div className={styles.PlayerName}>{playerName}</div>
    </ListItem>
  );
};

export default PlayerValidation;
