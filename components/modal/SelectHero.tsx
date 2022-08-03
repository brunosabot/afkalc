// import { useTranslation } from "next-i18next";
import { useTranslation } from "next-i18next";
import React, { useCallback, useContext } from "react";
import artifacts from "../../data/artifacts.json";
import heroes from "../../data/heroes.json";
import { getAscend } from "../../lib/hero";
import ICharacter from "../../types/ICharacter";
import { useHeroById } from "../pages/TiersList/hooks/useHero";
import ProfileContext from "../providers/ProfileContext";
import Artifact from "../ui/afk/Artifact";
import Character from "../ui/afk/Character";
import CharacterGrid from "../ui/CharacterGrid";
import AscendForm from "./components/ui/AscendForm";
import EngraveForm from "./components/ui/EngraveForm";
import FiForm from "./components/ui/FiForm";
import SiForm from "./components/ui/SiForm";
import classes from "./SelectHero.module.css";

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

interface Hero {
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Props {
  onSelect: (value: Hero) => void;
  hero: Hero;
}

const SelectHero: React.FC<Props> = function SelectHero({ hero, onSelect }) {
  const { t } = useTranslation("common");
  const { values } = useContext(ProfileContext);
  const heroData = useHeroById(hero.id);

  const onApplyMine = useCallback(() => {
    onSelect({
      id: hero.id,
      ascend: values.heroes[hero.id]?.ascend ?? 0,
      si: values.heroes[hero.id]?.si ?? -1,
      fi: values.heroes[hero.id]?.fi ?? 0,
      engrave: values.heroes[hero.id]?.engrave ?? 0,
      artifact: 0,
    });
  }, [hero.id, onSelect, values.heroes]);

  return (
    <>
      {Object.keys(factions).map((faction) => (
        <CharacterGrid key={faction}>
          {factions[faction].map(({ id, name }) => (
            <Character
              size="large"
              key={id}
              name={name}
              id={id}
              onClick={() => onSelect({ ...hero, id })}
              highlight={hero.id === id}
            />
          ))}
        </CharacterGrid>
      ))}

      <CharacterGrid>
        {artifacts.map((artifact) => (
          <Artifact
            key={artifact.id}
            name={artifact.name}
            highlight={hero.artifact === artifact.id}
            onClick={() => {
              onSelect({ ...hero, artifact: artifact.id });
            }}
          />
        ))}
      </CharacterGrid>

      <button onClick={onApplyMine} type="button" className={classes.Button}>
        {t("use-my-hero-stats")}
      </button>

      <div className={classes.Form}>
        <AscendForm
          isAwakened={heroData?.isAwakened ?? false}
          ascend={hero.ascend}
          onChange={(ascendValue) => {
            onSelect({ ...hero, ascend: getAscend(ascendValue, hero.si, hero.fi, hero.engrave) });
          }}
        />
        <SiForm
          hero={hero.id}
          si={hero.si}
          onChange={(siValue) => {
            onSelect({
              ...hero,
              si: siValue,
              ascend: getAscend(hero.ascend, siValue, hero.fi, hero.engrave),
            });
          }}
        />
        <FiForm
          fi={hero.fi}
          onChange={(fiValue) => {
            onSelect({
              ...hero,
              fi: fiValue,
              ascend: getAscend(hero.ascend, hero.si, fiValue, hero.engrave),
            });
          }}
        />
        <EngraveForm
          engrave={hero.engrave}
          hero={hero.id}
          onChange={(engraveValue) => {
            onSelect({
              ...hero,
              engrave: engraveValue,
              ascend: getAscend(hero.ascend, hero.si, hero.fi, engraveValue),
            });
          }}
        />
      </div>
    </>
  );
};

export default SelectHero;
