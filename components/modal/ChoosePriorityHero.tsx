import React from "react";
import heroes from "../../data/heroes.json";
import { getAscend } from "../../lib/hero";
import ICharacter from "../../types/ICharacter";
import { IFirebasePriorityListHero } from "../providers/types/IFirebasePriorityList";
import Character from "../ui/afk/Character";
import CharacterGrid from "../ui/CharacterGrid";
import styles from "./ChoosePriorityHero.module.css";
import AscendForm from "./components/ui/AscendForm";
import EngraveForm from "./components/ui/EngraveForm";
import FiForm from "./components/ui/FiForm";
import SiForm from "./components/ui/SiForm";

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

const ChoosePriorityHero: React.FC<Props> = function ChoosePriorityHero({
  si = -1,
  fi = 0,
  ascend = 0,
  hero = 0,
  engrave = 0,
  onSelect,
}) {
  return (
    <>
      <div className={styles.InputWrapper}>
        <AscendForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(value) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(value, si, fi, engrave),
              engrave,
              si,
            })
          }
        />
        <SiForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(siValue) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(ascend, siValue, fi, engrave),
              engrave,
              si: siValue,
            })
          }
        />
        <FiForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(fiValue) =>
            onSelect({
              hero,
              fi: fiValue,
              ascend: getAscend(ascend, si, fiValue, engrave),
              engrave,
              si,
            })
          }
        />
        <EngraveForm
          ascend={ascend}
          engrave={engrave}
          fi={fi}
          hero={hero}
          si={si}
          onChange={(value) =>
            onSelect({
              hero,
              fi,
              ascend: getAscend(ascend, si, fi, value),
              engrave: value || 0,
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
              size="large"
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
