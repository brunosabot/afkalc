import { useTranslation } from "next-i18next";
import React from "react";
import pets from "../../data/pets.json";
import { IFirebasePetListStep } from "../providers/types/IFirebasePetList";
import Pet from "../ui/afk/Pet";
import CharacterGrid from "../ui/CharacterGrid";
import InputField from "../ui/InputField";
import styles from "./ChoosePetStep.module.css";

interface Props {
  onSelect: (value: IFirebasePetListStep) => void;
  pet?: number;
  level?: number;
}

const ChoosePetStep: React.FC<Props> = function ChoosePetStep({ pet = 6001, level = 0, onSelect }) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.ChoosePetStep}>
      <div className={styles.InputWrapper}>
        <CharacterGrid>
          {pets.map(({ id }) => (
            <Pet
              key={id}
              id={id}
              agilityBuff={0}
              intelligenceBuff={0}
              strengthBuff={0}
              onClick={() => onSelect({ pet: parseInt(id, 10), level })}
              highlight={pet === parseInt(id, 10)}
            />
          ))}
        </CharacterGrid>
        {/* <SelectField
          values={[
            { key: HeroClass.mage, label: t(`common:heroClass.${HeroClass.mage}`) },
            { key: HeroClass.ranger, label: t(`common:heroClass.${HeroClass.ranger}`) },
            { key: HeroClass.support, label: t(`common:heroClass.${HeroClass.support}`) },
            { key: HeroClass.tank, label: t(`common:heroClass.${HeroClass.tank}`) },
            { key: HeroClass.warrior, label: t(`common:heroClass.${HeroClass.warrior}`) },
          ]}
          style={{ width: "200px" }}
          small
          name="ascend"
          label={t(`concept.ascend`)}
          value={pet}
          onChange={(value) =>
            onSelect({
              pet: parseInt(value, 10),
              level,
            })
          }
        /> */}
        <InputField
          style={{ width: "100px" }}
          small
          name="si"
          label={t(`level`)}
          value={level}
          onChange={(value) =>
            onSelect({
              pet,
              level: parseInt(value, 10) || 0,
            })
          }
        />
      </div>
    </div>
  );
};

export default ChoosePetStep;
