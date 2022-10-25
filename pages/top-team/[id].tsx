import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withLayoutPublicColumn from "../../components/layout/withLayoutPublicColumn";
import useDescription from "../../components/pages/TopTeam/hooks/useDescription";
import useShareUrl from "../../components/pages/TopTeam/hooks/useShareUrl";
import useTitle from "../../components/pages/TopTeam/hooks/useTitle";
import Board from "../../components/pages/TopTeam/ui/Board";
import EnemiPosition from "../../components/pages/TopTeam/ui/EnemiPosition";
import PetPosition from "../../components/pages/TopTeam/ui/PetPosition";
import PlayerPosition from "../../components/pages/TopTeam/ui/PlayerPosition";
import ShareBanner from "../../components/pages/TopTeam/ui/ShareBanner";
import Card from "../../components/ui/card/Card";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "top-team"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface Pet {
  id: string;
  agilityBuff: number;
  intelligenceBuff: number;
  strengthBuff: number;
}
interface Hero {
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

interface Enemy extends Hero {
  type: "h" | "e";
}

interface Props {
  [key: string]: never;
}

function parsePet(encodedPet: string) {
  const [id = 0, agilityBuff = 0, intelligenceBuff = 0, strengthBuff = 0] = encodedPet
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  return { id: `${6000 + id}`, agilityBuff, intelligenceBuff, strengthBuff };
}

function parseHero(encodedHero: string, i: number): Hero | Pet {
  if (i === 5) return parsePet(encodedHero);

  const [id = 0, ascend = 0, si = -1, fi = 0, engrave = 0, artifact = 0] = encodedHero
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  return { id, ascend, si, fi, engrave, artifact };
}

function parseEnemy(encodedHero: string, i: number): Enemy | Pet {
  if (i === 5) return parsePet(encodedHero);

  const [typeCode = "e", id = 0, ascend = 0, si = -1, fi = 0, engrave = 0, artifact = 0] =
    encodedHero
      .split("")
      .map((e) => e.charCodeAt(0))
      .map((e) => +e - 48);

  const type: "e" | "h" = typeCode === 56 ? "h" : "e";

  return { type, id, ascend, si, fi, engrave, artifact };
}

function isPet(pet: Hero | Pet): pet is Pet {
  return Object.prototype.hasOwnProperty.call(pet, "agilityBuff");
}

function stringifyPet(pet: Pet) {
  const idCode = String.fromCharCode(parseInt(pet.id || "6000", 10) - 6000 + 48);
  const agilityBuffCode = String.fromCharCode((pet.agilityBuff || 0) + 48);
  const intelligenceBuffCode = String.fromCharCode((pet.intelligenceBuff || 0) + 48);
  const strengthBuffCode = String.fromCharCode((pet.strengthBuff || 0) + 48);

  const code = `${idCode}${agilityBuffCode}${intelligenceBuffCode}${strengthBuffCode}`;

  return code;
}

function stringifyHero(hero: Hero | Pet) {
  if (isPet(hero)) return stringifyPet(hero);

  const idCode = String.fromCharCode((hero.id || 0) + 48);
  const ascendCode = String.fromCharCode((hero.ascend || 0) + 48);
  const siCode = String.fromCharCode((hero.si || 0) + 48);
  const fiCode = String.fromCharCode((hero.fi || 0) + 48);
  const engraveCode = String.fromCharCode((hero.engrave || 0) + 48);
  const artifactCode = String.fromCharCode((hero.artifact || 0) + 48);

  const code = `${idCode}${ascendCode}${siCode}${fiCode}${engraveCode}${artifactCode}`;

  return code;
}

function stringifyEnemi(enemy: Enemy | Pet) {
  if (isPet(enemy)) return stringifyPet(enemy);

  const { type } = enemy;
  const idCode = String.fromCharCode((enemy.id || 0) + 48);
  const ascendCode = String.fromCharCode((enemy.ascend || 0) + 48);
  const siCode = String.fromCharCode((enemy.si || 0) + 48);
  const fiCode = String.fromCharCode((enemy.fi || 0) + 48);
  const engraveCode = String.fromCharCode((enemy.engrave || 0) + 48);
  const artifactCode = String.fromCharCode((enemy.artifact || 0) + 48);

  const code = `${type}${idCode}${ascendCode}${siCode}${fiCode}${engraveCode}${artifactCode}`;

  return code;
}

function normalizeOurs(ours: string) {
  const val = ours.split(",");
  while (val.length < 6) val.push("");
  return val;
}

const TopTeam: React.FC<Props> = function TopTeam() {
  const router = useRouter();
  const { id } = router.query;

  const [heroId, setHeroId] = useState(id);

  const [ours, theirs] = decodeURIComponent(heroId as string).split("-");
  const [pos1, pos2, pos3, pos4, pos5, pet] = normalizeOurs(ours).map(parseHero) as [
    Hero,
    Hero,
    Hero,
    Hero,
    Hero,
    Pet
  ];
  const [ene1, ene2, ene3, ene4, ene5, epet] = normalizeOurs(theirs).map(parseEnemy) as [
    Enemy,
    Enemy,
    Enemy,
    Enemy,
    Enemy,
    Pet
  ];

  const url = useShareUrl(
    [pos1, pos2, pos3, pos4, pos5, pet],
    [ene1, ene2, ene3, ene4, ene5, epet]
  );

  useEffect(() => {
    router.replace(url, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onSelect = (position: number) => (hero: Hero) => {
    const heroes = [pos1, pos2, pos3, pos4, pos5, pet];
    heroes[position - 1] = hero;

    const encodedHeroes = heroes.map(stringifyHero).map(encodeURIComponent);
    const newString = `${encodedHeroes.join(",")}-${theirs}`;

    setHeroId(newString);
  };

  const onSelectPet = (position: number) => (thePet: Pet) => {
    const heroes = [pos1, pos2, pos3, pos4, pos5, thePet];
    heroes[position - 1] = thePet;

    const encodedHeroes = heroes.map(stringifyHero).map(encodeURIComponent);

    const newString = `${encodedHeroes.join(",")}-${theirs}`;

    setHeroId(newString);
  };

  const onSelectEnemy = (position: number) => (enemy: Enemy) => {
    const enemies = [ene1, ene2, ene3, ene4, ene5, epet];
    enemies[position - 6] = enemy;

    const encodedEnemies = enemies.map(stringifyEnemi).map(encodeURIComponent);
    const newString = `${ours}-${encodedEnemies.join(",")}`;

    setHeroId(newString);
  };

  const onSelectEnemiPet = (position: number) => (thePet: Pet) => {
    const enemies = [ene1, ene2, ene3, ene4, ene5, thePet];
    enemies[position - 6] = thePet;

    const encodedEnemies = enemies.map(stringifyEnemi).map(encodeURIComponent);
    const newString = `${ours}-${encodedEnemies.join(",")}`;

    setHeroId(newString);
  };

  const description = useDescription([pos1, pos2, pos3, pos4, pos5]);
  const title = useTitle([ene1, ene2, ene3, ene4, ene5]);

  return (
    <Card>
      <Head>
        <title>{`${title} - Afkalc`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/enemies/Goblin.jpg`} />
      </Head>
      <Board>
        <ShareBanner url={url} />
        <PlayerPosition onSelect={onSelect} position={1} hero={pos1} />
        <PlayerPosition onSelect={onSelect} position={2} hero={pos2} />
        <PlayerPosition onSelect={onSelect} position={3} hero={pos3} />
        <PlayerPosition onSelect={onSelect} position={4} hero={pos4} />
        <PlayerPosition onSelect={onSelect} position={5} hero={pos5} />

        <PetPosition onSelect={onSelectPet} position={6} pet={pet} />
        <PetPosition onSelect={onSelectEnemiPet} position={11} pet={epet} />

        <EnemiPosition onSelect={onSelectEnemy} position={6} enemi={ene1} />
        <EnemiPosition onSelect={onSelectEnemy} position={7} enemi={ene2} />
        <EnemiPosition onSelect={onSelectEnemy} position={8} enemi={ene3} />
        <EnemiPosition onSelect={onSelectEnemy} position={9} enemi={ene4} />
        <EnemiPosition onSelect={onSelectEnemy} position={10} enemi={ene5} />
      </Board>
    </Card>
  );
};

export default withLayoutPublicColumn(TopTeam);
