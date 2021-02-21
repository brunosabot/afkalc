import React from "react";
import ascendLevels from "../../data/heroAscensionLevel.json";
import heroes from "../../data/heroes.json";
import { useTranslation } from "../../i18n";
import ICharacter from "../../types/ICharacter";
import IHeroDetails from "../../types/IHeroDetails";
import Character from "../ui/afk/Character";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import styles from "./ChoosePriorityHero.module.css";

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
  onSelect: (value: IHeroDetails) => void;
  id?: number;
  fi?: number;
  ascend?: number;
  si?: number;
}

const ChoosePriorityHero: React.FC<Props> = ({
  si = 0,
  fi = 0,
  ascend = 0,
  id = 0,
  // current: [currentId, si, inn, ascend],
  onSelect,
}) => {
  const { t } = useTranslation("common");
  const { t: tHero } = useTranslation("hero-list");

  return (
    <div className={styles.ChoosePriorityHero}>
      <div className={styles.InputWrapper}>
        <InputField
          style={{ width: "60px" }}
          small
          name="si"
          label={t(`concept.si`)}
          value={si}
          onChange={(value) =>
            onSelect({
              id,
              fi,
              ascend,
              si: parseInt(value, 10) || 0,
            })
          }
        />
        <InputField
          style={{ width: "60px" }}
          small
          name="fi"
          label={t(`concept.inn`)}
          value={fi}
          onChange={(value) =>
            onSelect({
              id,
              fi: parseInt(value, 10) || 0,
              ascend,
              si,
            })
          }
        />
        <SelectField
          values={ascendLevels.map((level) => ({
            key: `${level.key}`,
            label: tHero(`ascension-${level.name}`),
          }))}
          style={{ width: "110px" }}
          small
          name="ascend"
          label={t(`concept.ascend`)}
          value={ascend}
          onChange={(value) =>
            onSelect({
              id,
              fi,
              ascend: parseInt(value, 10) || 0,
              si,
            })
          }
        />
      </div>

      {Object.keys(factions).map((faction) => (
        <React.Fragment key={faction}>
          <div className={styles.Heroes}>
            {factions[faction].map(({ id: thisId, name }) => (
              <Character
                key={thisId}
                name={name}
                onClick={() =>
                  onSelect({
                    id: thisId,
                    fi,
                    ascend,
                    si,
                  })
                }
                highlight={thisId === id}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChoosePriorityHero;
