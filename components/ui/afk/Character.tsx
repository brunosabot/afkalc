import React from "react";
import artifacts from "../../../data/artifacts.json";
import heroesFactions from "../../../data/heroes.json";
import styles from "./Character.module.css";

export enum DetailType {
  SI,
  INN,
  ARTIFACT,
  HERO
}

interface IProps {
  size?: "large" | "small" | "default";
  name: string;
  highlight?: boolean;
  disabled?: boolean;
  ascendLevel?: number;
  onClick?: () => void;
  siLevel?: number;
  innLevel?: number;
  artifact?: number;
}

interface ICharacter {
  name: string;
  id: number;
  type: string;
  class: string;
  role: string;
  image: string;
  faction: string;
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
  siLevel = undefined,
  innLevel = undefined,
  artifact = undefined,
}) => {
  const resource = heroes.find((r) => r.name === name);
  const activeArtifact = artifacts.find((a)=> a.id === artifact);

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
     
      <img className={`${styles.Faction} ${siLevel === undefined || siLevel === 0 ? styles.NoSi : ""}`} src={`/factions/${resource.faction}.png`} alt={name} />

      {activeArtifact ?<img className={`${styles.Artifact}`} src={activeArtifact?.image} alt={name} /> : null}


      {siLevel === undefined ? null : (
        <svg viewBox="0 0 220 220" className={styles.Si}>
          {siLevel >= 30 ? <path d="M50 110C50 110, 0 110, 0 0C0 0, 0 50, 50 50L50 110" stroke="black" fill="#fff" /> : null}
          {siLevel >= 30 ? <path d="M170 110C170 110, 220 110, 220 0C220 0, 220 40, 170 40L170 110" stroke="black" fill="#fff" /> : null}
          {siLevel >= 20 ? <path d="M50 0L90 0L50 50L50 0" className={styles.SiAccent2} />:null}
          {siLevel >= 20 ? <path d="M170 0L90 0L170 170L170 0" className={styles.SiAccent2} />:null}
          {siLevel >= 20 ? <path d="M170 140L90 140L170 80L170 140" className={styles.SiAccent2} />:null}
          {siLevel >= 20 ? <path d="M50 140L90 140L50 80L50 140" className={styles.SiAccent2} />:null}
          {siLevel > 0 ? <circle cx="110" cy="70" r="70" /> : null}
          {siLevel >= 10 ? <path d="M110 0L130 20L110 40L90 20L110 0" className={styles.SiAccent} /> : null}
          {siLevel >= 10 ? <path d="M180 70L160 90L140 70L160 50L180 70" className={styles.SiAccent} /> : null}
          {siLevel >= 10 ? <path d="M110 140L130 120L110 100L90 120L110 140" className={styles.SiAccent} /> : null}
          {siLevel >= 10 ? <path d="M40 70L60 50L80 70L60 90L40 70" className={styles.SiAccent} /> : null}
        </svg>
      )}

      {innLevel === undefined ? null : (
        <svg viewBox={innLevel >= 9 ? "0 0 160 150" : "0 0 100 150"} className={styles.Inn}>
          {innLevel >= 3 ? (<path d="M0 75L50 0L100 75L50 150L0 75" />):null}
          {innLevel >= 9 ? (<path d="M60 75L110 0L160 75L110 150L60 75" />):null}
          {innLevel >= 3 ? (<path d="M20 75L50 20L80 75L50 130L20 75" className={styles.InnInner} />):null}
          {innLevel >= 9 ? (<path d="M80 75L110 20L140 75L110 130L80 75" className={styles.InnInner} />):null}
        </svg>
      )}
    </div>
  );
};

export default Character;
