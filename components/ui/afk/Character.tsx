import React from "react";
import heroesFactions from "../../../data/heroes.json";
import styles from "./Character.module.css";

interface IProps {
  size?: "large" | "small" | "default";
  name: string;
  highlight?: boolean;
  disabled?: boolean;
  ascendLevel?: number;
  onClick?: () => void;
}

interface ICharacter {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
  image: string;
}

interface ICharacterFaction {
  faction: string;
  characters: ICharacter[];
}

const heroJson = heroesFactions as ICharacterFaction[];
const defaultCharacteres: ICharacter[] = [];
const heroes = heroJson.reduce(
  (acc, v: ICharacterFaction) => [...acc, ...v.characters],
  defaultCharacteres
);

/**
 * TODO: Use i18n for name
 */
const Character: React.FC<IProps> = ({
  name,
  size = "default",
  highlight = false,
  disabled = false,
  onClick = () => {},
  ascendLevel = 0,
}) => {
  const resource = heroes.find((r) => r.name === name);

  if (resource === undefined) return null;

  const largeClassName = size === "large" ? styles.Large : "";
  const smallClassName = size === "small" ? styles.Small : "";
  const highlightClassName = highlight ? styles.Highlight : "";
  const disabledClassName = disabled ? styles.Disabled : "";

  const eliteClassName = [1, 2].includes(ascendLevel) ? styles.Elite : "";
  const legendaryClassName = [3, 4].includes(ascendLevel) ? styles.Legendary : "";
  const mythicClassName = [5, 6].includes(ascendLevel) ? styles.Mythic : "";
  const ascendClassName = [7, 8, 9, 10, 11, 12].includes(ascendLevel) ? styles.Ascend : "";
  const plusClassName = [2, 4, 6].includes(ascendLevel) ? styles.Plus : "";

  return (
    <div
      className={`${styles.Wrapper} ${largeClassName} ${smallClassName} ${highlightClassName} ${eliteClassName} ${legendaryClassName} ${mythicClassName} ${ascendClassName} ${plusClassName} ${disabledClassName}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyPress={(event) => {
        if (event.key === "Enter") onClick();
      }}
    >
      <img src={resource.image} className={styles.Character} alt={resource?.name} />
    </div>
  );
};

export default Character;
