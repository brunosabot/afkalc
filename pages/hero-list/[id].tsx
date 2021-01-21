import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import useFirestoreWithBackup from "../../components/hooks/useFirestoreWithBackup";
import useGetValue from "../../components/pages/HeroList/hooks/useGetValue";
import useLoadId from "../../components/pages/HeroList/hooks/useLoadId";
import useSetLevel from "../../components/pages/HeroList/hooks/useSetLevel";
import AscendFilter from "../../components/pages/HeroList/ui/AscendFilter";
import ClassFilter from "../../components/pages/HeroList/ui/ClassFilter";
import FactionFilter from "../../components/pages/HeroList/ui/FactionFilter";
import HeroLine from "../../components/pages/HeroList/ui/HeroLine";
import RoleFilter from "../../components/pages/HeroList/ui/RoleFilter";
import ShareBanner from "../../components/pages/HeroList/ui/ShareBanner";
import TitleLine from "../../components/pages/HeroList/ui/TitleLine";
import TypeFilter from "../../components/pages/HeroList/ui/TypeFilter";
import Card from "../../components/ui/card/Card";
import heroes from "../../data/heroes.json";
import factions from "../../data/heroFaction.json";
import { useTranslation } from "../../i18n";
import ICharacter from "../../types/ICharacter";

const typedHeroes: ICharacter[] = heroes as ICharacter[];

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

const sortChars = (a: ICharacter, b: ICharacter) => {
  if (factions[a.faction] < factions[b.faction]) {
    return -1;
  }
  if (factions[a.faction] > factions[b.faction]) {
    return 1;
  }
  return a.name.localeCompare(b.name);
};

const HeroList: React.FC<IProps> = () => {
  const { t } = useTranslation("hero-list");
  const router = useRouter();
  const { id } = router.query;
  const isView = true;
  const [viewId, setViewId] = useState("");
  const emptyObject = useMemo(() => ({}), []);
  const [typeFilter, setTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [factionFilter, setFactionFilter] = useState("");
  const [ascendFilter, setAscendFilter] = useState("");

  const [levels, setLevels] = useFirestoreWithBackup<IHeroes>(
    viewId,
    "hero-list",
    "levels",
    emptyObject,
    null,
    isView
  );

  useLoadId(id as string, setViewId);
  const setLevel = useSetLevel(levels, setLevels);
  const getValue = useGetValue(levels);

  const characters = useMemo(
    () =>
      typedHeroes
        .map((c) => ({ ...c, ascend: getValue(c.id, "ascend") }))
        .filter((c) => typeFilter === "" || c.type === typeFilter)
        .filter((c) => classFilter === "" || c.class === classFilter)
        .filter((c) => roleFilter === "" || c.role === roleFilter)
        .filter((c) => factionFilter === "" || c.faction === factionFilter)
        .filter((c) => ascendFilter !== "elite" || [1, 2].includes(c.ascend))
        .filter((c) => ascendFilter !== "legendary" || [3, 4].includes(c.ascend))
        .filter((c) => ascendFilter !== "mythic" || [5, 6].includes(c.ascend))
        .filter((c) => ascendFilter !== "ascended" || [7, 8, 9, 10, 11, 12].includes(c.ascend))
        .sort(sortChars),
    [ascendFilter, classFilter, factionFilter, getValue, roleFilter, typeFilter]
  );

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

        {characters.map((character, i) => (
          <>
            {character.faction !== characters[i - 1]?.faction ? <TitleLine /> : null}
            <HeroLine
              key={character.id}
              id={character.id}
              name={character.name}
              setLevel={setLevel}
              getValue={getValue}
              isView={isView}
            />
          </>
        ))}
      </div>
    </Card>
  );
};

export default HeroList;
