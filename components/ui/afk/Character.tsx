import React from "react";
import artifacts from "../../../data/artifacts.json";
import heroes from "../../../data/heroes.json";
import ICharacter from "../../../types/ICharacter";
import styles from "./Character.module.css";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

export enum DetailType {
  SI,
  INN,
  ARTIFACT,
  HERO,
  ASCEND,
  LINKKEY,
}

interface IProps {
  size?: "large" | "small" | "default";
  name?: string;
  id?: number;
  highlight?: boolean;
  disabled?: boolean;
  ascendLevel?: number;
  onClick?: () => void;
  siLevel?: number;
  fiLevel?: number;
  artifact?: number;
}

function getImageName(si: number | undefined, fi: number | undefined) {
  if (si === undefined) return undefined;
  if (fi === undefined) return undefined;

  let siNumber = 0;
  if (si >= 30) {
    siNumber = 30;
  } else if (si >= 20) {
    siNumber = 20;
  } else if (si >= 10) {
    siNumber = 10;
  }

  let fiNumber = 0;
  if (fi >= 9) {
    fiNumber = 9;
  } else if (fi >= 3) {
    fiNumber = 3;
  }

  const concat = `${siNumber}${fiNumber}`;

  if (siNumber === 0 && fiNumber === 0) return undefined;
  if (["09", "036"].indexOf(concat) >= 0) return undefined;

  return `/heroes-rank/${concat}.png`;
}

/**
 * TODO: Use i18n for name
 */
const Character: React.FC<IProps> = ({
  name,
  id,
  size = "default",
  highlight = false,
  disabled = false,
  onClick = () => {},
  ascendLevel = 0,
  siLevel = undefined,
  fiLevel = undefined,
  artifact = undefined,
}) => {
  const resource = typedHeroes.find((r) => (id ? r.id === id : r.name === name));
  const activeArtifact = artifacts.find((a) => a.id === artifact);

  if (name === undefined && id === undefined) throw new Error("Define a name or an id");

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

      {size === "small" ? null : (
        <>
          <img
            className={`${styles.Faction} ${
              siLevel === undefined || siLevel === 0 ? styles.NoSi : ""
            }`}
            src={`/factions/${resource.faction}.png`}
            alt={name}
          />
          <img src={getImageName(siLevel, fiLevel)} alt="" className={styles.SiFi} />
        </>
      )}

      {activeArtifact ? (
        <img className={`${styles.Artifact}`} src={activeArtifact?.image} alt={name} />
      ) : null}
    </div>
  );
};

export default Character;
