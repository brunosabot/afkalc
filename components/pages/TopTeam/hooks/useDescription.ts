import { TFunction } from "next-i18next";
import { useMemo } from "react";
import { useTranslation } from "../../../../i18n";
import useArtifact, { Artifact } from "./useArtifact";
import useHero from "./useHero";

interface ITeam {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
}

interface ISi {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface IInn {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface IArtifact {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

function getSi(si: number | undefined) {
  if (si === undefined) return "";
  if (si <= 0) return "";
  return ` +${si}`;
}

function getInn(inn: number | undefined) {
  if (inn === undefined) return "";
  if (inn <= 0) return "";
  return ` ${inn}/9`;
}

function displayArtifact(t: TFunction, artifact: Artifact) {
  const value = t(`artifact.${artifact.name}`);
  if (value) return `(${value})`;
  return "";
}

export default function useDescription(heroes: ITeam, si: ISi, inn: IInn, artifact: IArtifact) {
  const { t } = useTranslation("common");
  const { getHero } = useHero();
  const { getArtifact } = useArtifact();

  return useMemo(() => {
    const hero1Data = getHero(heroes[1]);
    const hero2Data = getHero(heroes[2]);
    const hero3Data = getHero(heroes[3]);
    const hero4Data = getHero(heroes[4]);
    const hero5Data = getHero(heroes[5]);

    const artifact1Data = getArtifact(artifact[1]);
    const artifact2Data = getArtifact(artifact[2]);
    const artifact3Data = getArtifact(artifact[3]);
    const artifact4Data = getArtifact(artifact[4]);
    const artifact5Data = getArtifact(artifact[5]);

    const description = [];
    if (hero1Data !== undefined) {
      description.push(
        `${hero1Data.name}${getSi(si[1])}${getInn(inn[1])} ${displayArtifact(t, artifact1Data)}`
      );
    }
    if (hero2Data !== undefined) {
      description.push(
        `${hero2Data.name}${getSi(si[2])}${getInn(inn[2])} ${displayArtifact(t, artifact2Data)}`
      );
    }
    if (hero3Data !== undefined) {
      description.push(
        `${hero3Data.name}${getSi(si[3])}${getInn(inn[3])} ${displayArtifact(t, artifact3Data)}`
      );
    }
    if (hero4Data !== undefined) {
      description.push(
        `${hero4Data.name}${getSi(si[4])}${getInn(inn[4])} ${displayArtifact(t, artifact4Data)}`
      );
    }
    if (hero5Data !== undefined) {
      description.push(
        `${hero5Data.name}${getSi(si[5])}${getInn(inn[5])} ${displayArtifact(t, artifact5Data)}`
      );
    }

    return description.join(" - ").replace(/\s\s+/g, " ");
  }, [artifact, getArtifact, getHero, heroes, inn, si, t]);
}
