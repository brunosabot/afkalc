import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withLayoutPublicColumn from "../../components/layout/withLayoutPublicColumn";
import useDescription from "../../components/pages/TopTeam/hooks/useDescription";
import useShareUrl from "../../components/pages/TopTeam/hooks/useShareUrl";
import useTitle from "../../components/pages/TopTeam/hooks/useTitle";
import Board from "../../components/pages/TopTeam/ui/Board";
import EnemiPosition from "../../components/pages/TopTeam/ui/EnemiPosition";
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

function parseHero(encodedHero: string) {
  const [id = 0, ascend = 0, si = -1, fi = 0, engrave = 0, artifact = 0] = encodedHero
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  return { id, ascend, si, fi, engrave, artifact };
}

function parseEnemy(encodedHero: string) {
  const [typeCode = "e", id = 0, ascend = 0, si = -1, fi = 0, engrave = 0, artifact = 0] =
    encodedHero
      .split("")
      .map((e) => e.charCodeAt(0))
      .map((e) => +e - 48);

  const type: "e" | "h" = typeCode === 56 ? "h" : "e";

  return { type, id, ascend, si, fi, engrave, artifact };
}

function stringifyHero(hero: Hero) {
  const idCode = String.fromCharCode((hero.id || 0) + 48);
  const ascendCode = String.fromCharCode((hero.ascend || 0) + 48);
  const siCode = String.fromCharCode((hero.si || 0) + 48);
  const fiCode = String.fromCharCode((hero.fi || 0) + 48);
  const engraveCode = String.fromCharCode((hero.engrave || 0) + 48);
  const artifactCode = String.fromCharCode((hero.artifact || 0) + 48);

  const code = `${idCode}${ascendCode}${siCode}${fiCode}${engraveCode}${artifactCode}`;

  return code;
}

function stringifyEnemi(enemy: Enemy) {
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

const TopTeam: React.FC<Props> = function TopTeam() {
  const router = useRouter();
  const { id } = router.query;

  const [heroId, setHeroId] = useState(id);

  const [ours, theirs] = decodeURIComponent(heroId as string).split("-");
  const [pos1, pos2, pos3, pos4, pos5] = ours.split(",").map(parseHero);
  const [ene1, ene2, ene3, ene4, ene5] = theirs.split(",").map(parseEnemy);

  const url = useShareUrl([pos1, pos2, pos3, pos4, pos5], [ene1, ene2, ene3, ene4, ene5]);

  const onSelect = (position: number) => (hero: Hero) => {
    const heroes = [pos1, pos2, pos3, pos4, pos5];
    heroes[position - 1] = hero;

    const encodedHeroes = heroes.map(stringifyHero).map(encodeURIComponent);
    const newString = `${encodedHeroes.join(",")}-${theirs}`;

    setHeroId(newString);
  };

  const onSelectEnemy = (position: number) => (enemy: Enemy) => {
    const enemies = [ene1, ene2, ene3, ene4, ene5];
    enemies[position - 6] = enemy;

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
