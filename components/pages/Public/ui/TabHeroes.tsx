import { mdiFilterVariant, mdiPencil } from "@mdi/js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import heroesJson from "../../../../data/heroes.json";
import ICharacter from "../../../../types/ICharacter";
import { IFirebaseHeroList } from "../../../providers/types/IFirebaseHeroes";
import HeroTooltip from "../../../tooltip/HeroTooltip";
import CardHelp from "../../../ui/card/CardHelp";
import CharacterGrid from "../../../ui/CharacterGrid";
import Svg from "../../../ui/Svg";
import useFilteredHeroes from "../../HeroList/hooks/useFilteredHeroes";
import useFilters from "../../HeroList/hooks/useFilters";
import useGetValue from "../../HeroList/hooks/useGetValue";
import Filters from "../../HeroList/ui/Filters";
import PublicCharacter from "./PublicCharacter";
import classes from "./TabHeroes.module.css";

const typedHeroes: ICharacter[] = heroesJson as ICharacter[];

interface IProps {
  lastUpdate?: string;
  heroes?: IFirebaseHeroList;
  isSelf: boolean;
}

const TabHeroes: React.FC<IProps> = function TabHeroes({ heroes = [], lastUpdate, isSelf }) {
  const { t } = useTranslation("hero-list");
  const { t: tC } = useTranslation("common");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [state, dispatch] = useFilters();

  const getValue = useGetValue(heroes);

  const typedHeroesWithName = typedHeroes.map((hero) => ({
    ...hero,
    name: tC(`heroesName.${hero.slug}`),
  }));

  const characters = useFilteredHeroes(typedHeroesWithName, heroes, state);

  const lastUpdateString = useMemo(() => dayjs(new Date(lastUpdate ?? 0)).fromNow(), [lastUpdate]);

  return (
    <div className={classes.TabHeroes}>
      <div className={classes.Actions}>
        {lastUpdate !== undefined ? (
          <CardHelp>{`${t("last-update")} ${lastUpdateString}`}</CardHelp>
        ) : null}

        <button
          type="button"
          className={classes.Action}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Svg d={mdiFilterVariant} />
        </button>

        {isSelf ? (
          <Link href="/hero-list/" className={classes.Action}>
            <Svg d={mdiPencil} />
          </Link>
        ) : null}
      </div>
      <Filters state={state} dispatch={dispatch} force={showFilters} />
      {characters.length === 0 ? (
        <CardHelp>{t("label-empty")}</CardHelp>
      ) : (
        <CharacterGrid size="large">
          {characters.map((character) => (
            <PublicCharacter
              label={<HeroTooltip character={character} />}
              id={character.id}
              name={character.name ?? ""}
              ascendLevel={getValue(character.id, "ascend")}
              disabled={getValue(character.id, "ascend") === 0}
              siLevel={getValue(character.id, "si")}
              fiLevel={getValue(character.id, "fi")}
              engraveLevel={getValue(character.id, "engrave")}
              size="large"
              key={character.id}
            />
          ))}
        </CharacterGrid>
      )}
    </div>
  );
};

export default TabHeroes;
