import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import CardShare from "../../../ui/card/CardShare";

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

interface IProps {
  heroes: Hero[];
  enemies: Enemy[];
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

function stringifyEnemy(enemy: Enemy) {
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

const ShareBanner: React.FC<IProps> = function ShareBanner({ enemies, heroes }) {
  const { t } = useTranslation("top-team");
  const router = useRouter();
  const localePath = router.locale === router.defaultLocale ? "" : `/${router.locale}`;

  const encodedEnemies = enemies.map(stringifyEnemy).map(encodeURIComponent);
  const encodedHeroes = heroes.map(stringifyHero).map(encodeURIComponent);
  const newString = `${encodedHeroes.join(",")}-${encodedEnemies.join(",")}`;
  const value = `${process.env.NEXT_PUBLIC_URL}${localePath}/top-team/${newString}`;

  return <CardShare label={t("label-share")}>{value}</CardShare>;
};

export default ShareBanner;
