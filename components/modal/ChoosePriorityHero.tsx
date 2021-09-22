import { useTranslation } from "next-i18next";
import React from "react";
import ascendLevels from "../../data/heroAscensionLevel.json";
import heroes from "../../data/heroes.json";
import { getAscend } from "../../lib/hero";
import ICharacter from "../../types/ICharacter";
import { IFirebasePriorityListHero } from "../providers/types/IFirebasePriorityList";
import Character from "../ui/afk/Character";
import CharacterGrid from "../ui/CharacterGrid";
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
  onSelect: (value: IFirebasePriorityListHero) => void;
  hero?: number;
  fi?: number;
  ascend?: number;
  engrave?: number;
  si?: number;
}

const ChoosePriorityHero: React.FC<Props> = ({
  si = -1,
  fi = 0,
  ascend = 0,
  hero = 0,
  engrave = 0,
  onSelect,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className={styles.InputWrapper}>
        <InputField
          style={{ width: "60px" }}
          small
          name="si"
          label={t(`concept.si`)}
          value={si > 0 ? si : 0}
          onChange={(value) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(ascend, parseInt(value, 10), fi, engrave),
              engrave,
              si: parseInt(value, 10) || 0,
            })
          }
        />
        <InputField
          style={{ width: "60px" }}
          small
          name="fi"
          label={t(`concept.fi`)}
          value={fi}
          onChange={(value) =>
            onSelect({
              hero,
              fi: parseInt(value, 10) || 0,
              ascend: getAscend(ascend, si, parseInt(value, 10), engrave),
              engrave,
              si,
            })
          }
        />
        <SelectField
          values={ascendLevels.map((level) => ({
            key: `${level.key}`,
            label: t(`ascension-${level.name}`),
          }))}
          style={{ width: "110px" }}
          small
          name="ascend"
          label={t(`concept.ascend`)}
          value={ascend}
          onChange={(value) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(parseInt(value, 10), si, fi, engrave),
              engrave,
              si,
            })
          }
        />
        <InputField
          style={{ width: "60px" }}
          small
          name="engrave"
          label={t(`concept.engrave`)}
          value={engrave}
          onChange={(value) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(ascend, si, fi, parseInt(value, 10)),
              engrave: parseInt(value, 10) || 0,
              si,
            })
          }
        />
      </div>

      {Object.keys(factions).map((faction) => (
        <CharacterGrid key={faction}>
          {factions[faction].map(({ id, name }) => (
            <Character
              key={id}
              name={name}
              onClick={() =>
                onSelect({
                  hero: id,
                  fi,
                  ascend,
                  engrave,
                  si,
                })
              }
              highlight={id === hero}
            />
          ))}
        </CharacterGrid>
      ))}
    </>
  );
};

export default ChoosePriorityHero;
