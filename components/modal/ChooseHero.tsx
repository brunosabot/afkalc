import React from "react";
import artifacts from "../../data/artifacts.json";
import heroes from "../../data/heroes.json";
import { useTranslation } from "../../i18n";
import ICharacter from "../../types/ICharacter";
import Artifact from "../ui/afk/Artifact";
import Character, { DetailType } from "../ui/afk/Character";
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
  }
);

interface Props {
  onSelect: (type: DetailType, value: number) => void;
  current: number[];
  onlyHero?: boolean;
}

const ChooseHero: React.FC<Props> = ({
  onlyHero = false,
  current: [currentId, si, inn, currentArtifact],
  onSelect,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.ChooseHero}>
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
            name="inn"
            label={t(`concept.inn`)}
            value={inn}
            onChange={(value) => onSelect(DetailType.INN, parseInt(value, 10))}
          />
        </div>
      ) : null}

      {onlyHero === false ? (
        <div className={styles.Heroes}>
          {artifacts.map((artifact) => (
            <Artifact
              key={artifact.id}
              name={artifact.name}
              highlight={currentArtifact === artifact.id}
              onClick={() => onSelect(DetailType.ARTIFACT, artifact.id)}
            />
          ))}
        </div>
      ) : null}

      {Object.keys(factions).map((faction) => (
        <React.Fragment key={faction}>
          <div className={styles.Heroes}>
            {factions[faction].map(({ id, name }) => (
              <Character
                key={id}
                name={name}
                onClick={() => onSelect(DetailType.HERO, id)}
                highlight={currentId === id}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChooseHero;
