import React from "react";
import { IFirebasePriorityListHero } from "../../../providers/types/IFirebasePriorityList";
import Character from "../../../ui/afk/Character";
import styles from "./CharacterTiersList.module.css";

interface IProps {
  hero: IFirebasePriorityListHero;
  percentage: number;
}

const CharacterTiersList: React.FC<IProps> = ({ hero, percentage }) => (
  <div className={`${styles.CharacterTiersList} ${percentage >= 100 ? styles.IsOk : ""}`}>
    <Character
      ascendLevel={hero.ascend}
      siLevel={hero.si}
      fiLevel={hero.fi}
      engraveLevel={hero.engrave}
      id={hero.hero}
      size="large"
    />
    {percentage.toFixed()}%
  </div>
);

export default CharacterTiersList;
