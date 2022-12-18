import Image from "next/image";
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
  ENGRAVE,
  LINKKEY,
}

export interface ICharacterProps {
  artifact?: number;
  ascendLevel?: number;
  disabled?: boolean;
  engraveLevel?: number;
  fiLevel?: number;
  highlight?: boolean;
  id?: number;
  name?: string;
  onClick?: () => void;
  siLevel?: number;
  size?: "large" | "small" | "default";
}

const Character: React.FC<ICharacterProps> = function Character({
  name,
  id,
  size = "default",
  highlight = false,
  disabled = false,
  onClick = () => {},
  ascendLevel = 0,
  siLevel = -1,
  fiLevel = undefined,
  engraveLevel = undefined,
  artifact = undefined,
}) {
  const resource = typedHeroes.find((r) => r.id === id);
  const activeArtifact = artifacts.find((a) => a.id === artifact);

  if (name === undefined && id === undefined) throw new Error("Define a name or an id");

  if (resource === undefined) return null;

  const disabledClassName = disabled ? styles.Disabled : "";
  const highlightClassName = highlight ? styles.Highlight : "";

  let dimension = 50;
  if (size === "large") dimension = 64;
  if (size === "small") dimension = 34;

  const src = `/api/hero?heroImage=${resource.image}&faction=${resource.faction}&ascend=${ascendLevel}&si=${siLevel}&fi=${fiLevel}&engrave=${engraveLevel}`;

  return (
    <div
      className={`${styles.Wrapper} ${disabledClassName} ${highlightClassName}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyPress={(event) => {
        if (event.key === "Enter") onClick();
      }}
    >
      <Image src={src} width={dimension} height={dimension} alt={resource?.name ?? ""} />

      {activeArtifact ? (
        <Image
          className={`${styles.Artifact}`}
          src={activeArtifact?.image}
          alt=""
          height={30}
          width={30}
        />
      ) : null}
    </div>
  );
};

export default Character;
