import i18n from "i18next";
import Head from "next/head";
import React, { Fragment, useMemo, useState } from "react";
import useFirestoreWithBackup from "../../components/hooks/useFirestoreWithBackup";
import useGetValue from "../../components/pages/HeroList/hooks/useGetValue";
import useSetLevel from "../../components/pages/HeroList/hooks/useSetLevel";
import AscendFilter from "../../components/pages/HeroList/ui/AscendFilter";
import ClassFilter from "../../components/pages/HeroList/ui/ClassFilter";
import FactionFilter from "../../components/pages/HeroList/ui/FactionFilter";
import FactionLine from "../../components/pages/HeroList/ui/FactionLine";
import HeroLine from "../../components/pages/HeroList/ui/HeroLine";
import RoleFilter from "../../components/pages/HeroList/ui/RoleFilter";
import ShareBanner from "../../components/pages/HeroList/ui/ShareBanner";
import TypeFilter from "../../components/pages/HeroList/ui/TypeFilter";
import Card from "../../components/ui/card/Card";
import factions from "../../data/heroes.json";
import { useTranslation } from "../../i18n";

i18n.loadNamespaces("hero-list");

interface IHeroLevels {
  inn?: number;
  si?: number;
  ascend?: number;
}

interface IHeroes {
  [key: number]: IHeroLevels;
}

interface IProps {
  [key: string]: never;
}

const HeroList: React.FC<IProps> = () => {
  const { t } = useTranslation("hero-list");
  const isView = false;
  const emptyObject = useMemo(() => ({}), []);
  const [typeFilter, setTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [factionFilter, setFactionFilter] = useState("");
  const [ascendFilter, setAscendFilter] = useState("");

  const [levels, setLevels] = useFirestoreWithBackup<IHeroes>(
    "%ID%",
    "hero-list",
    "levels",
    emptyObject,
    null,
    isView
  );

  const setLevel = useSetLevel(levels, setLevels);
  const getValue = useGetValue(levels);

  return (
    <Card>
      <div style={{ paddingBottom: "16px" }}>
        <ShareBanner isView={isView} />
        <Head>
          <title>{`${t("common:menu.hero-list")} - Afkalc`}</title>
          <meta name="description" content="" />
        </Head>

        <FactionFilter filter={factionFilter} setFilter={setFactionFilter} imagePath="factions" />
        <TypeFilter filter={typeFilter} setFilter={setTypeFilter} imagePath="types" />
        <ClassFilter filter={classFilter} setFilter={setClassFilter} imagePath="classes" />
        <RoleFilter filter={roleFilter} setFilter={setRoleFilter} imagePath="roles" />
        <AscendFilter filter={ascendFilter} setFilter={setAscendFilter} imagePath="ascend" />

        {factions.map((faction) => {
          if (factionFilter !== "" && faction.faction !== factionFilter) {
            return null;
          }

          const characters = faction.characters
            .map((c) => ({ ...c, ascend: getValue(c.id, "ascend") }))
            .filter((c) => typeFilter === "" || c.type === typeFilter)
            .filter((c) => classFilter === "" || c.class === classFilter)
            .filter((c) => roleFilter === "" || c.role === roleFilter)
            .filter((c) => ascendFilter !== "elite" || [1, 2].includes(c.ascend))
            .filter((c) => ascendFilter !== "legendary" || [3, 4].includes(c.ascend))
            .filter((c) => ascendFilter !== "mythic" || [5, 6].includes(c.ascend))
            .filter((c) => ascendFilter !== "ascended" || [7, 8, 9, 10, 11, 12].includes(c.ascend))
            .sort((a, b) => a.name.localeCompare(b.name));

          return (
            <Fragment key={`${faction.faction}`}>
              <FactionLine name={faction.faction} />
              {characters.map((character) => (
                <HeroLine
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  setLevel={setLevel}
                  getValue={getValue}
                  isView={isView}
                />
              ))}
            </Fragment>
          );
        })}
      </div>
    </Card>
  );
};

export default HeroList;
