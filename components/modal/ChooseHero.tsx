import React from "react";
import { useTranslation } from "react-i18next";
import artifacts from "../../data/artifacts.json";
import factions from "../../data/heroes.json";
import Artifact from "../ui/afk/Artifact";
import Character, { DetailType } from "../ui/afk/Character";
import InputField from "../ui/InputField";
import styles from "./ChooseHero.module.css";

interface Props {
  onSelect: (type: DetailType, value: number) => void;
  current: number[];
}

const ChooseHero: React.FC<Props> = ({
  current: [currentId, si, inn, currentArtifact],
  onSelect,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.ChooseHero}>
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

      {factions.map((faction) => (
        <React.Fragment key={faction.faction}>
          <div className={styles.Heroes}>
            {faction.characters.map(({ id, name }) => (
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
