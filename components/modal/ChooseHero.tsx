import { useTranslation } from "next-i18next";
import React from "react";
import artifacts from "../../data/artifacts.json";
import heroes from "../../data/heroes.json";
import ICharacter from "../../types/ICharacter";
import Artifact from "../ui/afk/Artifact";
import Character, { DetailType } from "../ui/afk/Character";
import CharacterGrid from "../ui/CharacterGrid";
import CheckboxField from "../ui/CheckboxField";
import InputField from "../ui/InputField";
import styles from "./ChooseHero.module.css";

interface IFactions {
  [key: string]: ICharacter[];
}

const factions: IFactions = (heroes as ICharacter[]).reduce(
  (acc, value) => ({
    ...acc,
    [value.faction]: [...acc[value.faction], value],
  }),
  {
    lightbearers: [],
    maulers: [],
    wilders: [],
    graveborns: [],
    celestials: [],
    hypogeans: [],
    dimensionals: [],
    none: [],
  }
);

interface Props {
  onSelect: (type: DetailType, value: number) => void;
  current: [number, number, number, number, number];
  onlyHero?: boolean;
  shouldDisplayKey?: boolean;
}

const ChooseHero: React.FC<Props> = function ChooseHero({
  onlyHero = false,
  shouldDisplayKey = true,
  current: [currentId, si, fi, currentArtifact, linkKey],
  onSelect,
}) {
  const { t } = useTranslation("common");

  return (
    <>
      {onlyHero === false ? (
        <div className={styles.InputWrapper}>
          <InputField
            style={{ width: "60px" }}
            small
            name="si"
            label={t(`concept.si`)}
            value={si}
            onChange={(value) => onSelect(DetailType.SI, parseInt(value, 10))}
          />
          <InputField
            style={{ width: "60px" }}
            small
            name="fi"
            label={t(`concept.fi`)}
            value={fi}
            onChange={(value) => onSelect(DetailType.INN, parseInt(value, 10))}
          />
        </div>
      ) : null}

      {onlyHero === false ? (
        <CharacterGrid>
          {artifacts.map((artifact) => (
            <Artifact
              key={artifact.id}
              name={artifact.name}
              highlight={currentArtifact === artifact.id}
              onClick={() => onSelect(DetailType.ARTIFACT, artifact.id)}
            />
          ))}
        </CharacterGrid>
      ) : null}

      {shouldDisplayKey && onlyHero ? (
        <CheckboxField
          label={t("has-dimensional-key")}
          name="dimensional-key"
          onChange={(value) => onSelect(DetailType.LINKKEY, value ? 1 : 0)}
          value={linkKey === 1}
        />
      ) : null}

      {Object.keys(factions).map((faction) => (
        <CharacterGrid key={faction}>
          {factions[faction].map(({ id, name }) => (
            <Character
              size="large"
              key={id}
              name={name}
              id={id}
              onClick={() => onSelect(DetailType.HERO, currentId === id ? 0 : id)}
              highlight={currentId === id}
            />
          ))}
        </CharacterGrid>
      ))}
    </>
  );
};

export default ChooseHero;
