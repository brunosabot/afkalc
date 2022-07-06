import { TFunction, useTranslation } from "next-i18next";
import { useMemo } from "react";
import useArtifact, { Artifact } from "./useArtifact";
import useHero from "./useHero";

interface Hero {
  id: number;
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  artifact: number;
}

function getAscend(ascendLevel: number) {
  if (ascendLevel === 1) return `elite`;
  if (ascendLevel === 2) return `elite-p`;
  if (ascendLevel === 3) return `legendary`;
  if (ascendLevel === 4) return `legendary-p`;
  if (ascendLevel === 5) return `mythic`;
  if (ascendLevel === 6) return `mythic-p`;
  if (ascendLevel === 7) return `ascend`;
  if (ascendLevel > 7) return `ascend-${ascendLevel - 7}`;

  return "-";
}

function getSi(si: number | undefined) {
  if (si === undefined) return "";
  if (si <= 0) return "";
  return ` +${si}`;
}

function getFi(fi: number | undefined) {
  if (fi === undefined) return "";
  if (fi <= 0) return "";
  return ` ${fi}/9`;
}

function getEngrave(engrave: number | undefined) {
  if (engrave === undefined) return "";
  if (engrave <= 0) return "";
  return ` e${engrave}`;
}

function displayAscend(t: TFunction, ascend: number) {
  if (ascend === 0) return "";

  return ` ${t(`ascension-${getAscend(ascend)}`)}`;
}

function displayArtifact(t: TFunction, artifact: Artifact) {
  if (artifact.name) {
    const value = t(`artifact.${artifact.name}`);
    if (value) return `(${value})`;
  }
  return "";
}

export default function useDescription(heroes: Hero[]) {
  const { t } = useTranslation("common");
  const { getHero } = useHero();
  const { getArtifact } = useArtifact();

  return useMemo(
    () =>
      heroes
        .map((hero) => {
          const heroName = getHero(t, hero.id)?.name;
          const heroAscend = displayAscend(t, hero.ascend);
          const heroSi = getSi(hero.si);
          const heroFi = getFi(hero.fi);
          const heroEngrave = getEngrave(hero.engrave);
          const heroArtifact = displayArtifact(t, getArtifact(hero.artifact));

          if (hero.id === 0) return "";

          return `${heroName}${heroAscend}${heroSi}${heroFi}${heroEngrave} ${heroArtifact}`;
        })
        .join(" - ")
        .replace(/\s\s+/g, " "),
    [getArtifact, getHero, heroes, t]
  );
}
