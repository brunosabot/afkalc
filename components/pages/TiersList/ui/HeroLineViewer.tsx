import { mdiCheck, mdiRestore } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import IFirebasePriorityList, {
  IFirebasePriorityListHero,
} from "../../../providers/types/IFirebasePriorityList";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import useIsValidList from "../hooks/useIsValidList";
import useIsValidSelf from "../hooks/useIsValidSelf";
import useOnDone from "../hooks/useOnDone";
import { UseSetLevelReturn } from "../hooks/useSetLevel";
import InfoDetails from "./InfoDetails";
import styles from "./Viewer.module.css";

interface IProps {
  hero: IFirebasePriorityListHero;
  setLevel: UseSetLevelReturn;
  heroLevels?: IFirebaseHeroesHero;
  initialHeroLevels?: IFirebaseHeroesHero;
  priorityList: IFirebasePriorityList;
}

function compare(a: IFirebaseHeroesHero | undefined, b: IFirebaseHeroesHero | undefined) {
  if (a === b) return true;
  return a?.ascend === b?.ascend && a?.si === b?.si && a?.fi === b?.fi && a?.link === b?.link;
}

const HeroLineViewer: React.FC<IProps> = ({
  hero,
  priorityList,
  setLevel,
  heroLevels,
  initialHeroLevels,
}) => {
  const { getHero } = useHero();
  const { requirement, requirementValue } = priorityList;

  const isValidList = useIsValidList(priorityList, hero, heroLevels);
  const isValidSelf = useIsValidSelf(hero, heroLevels);
  const { t } = useTranslation("priority-list");

  const hasSelfRequirements =
    [0, undefined].includes(hero.ascend) === false ||
    [0, undefined].includes(hero.si) === false ||
    [0, undefined].includes(hero.fi) === false;

  const onDone = useOnDone(requirement, requirementValue, hero, setLevel, hasSelfRequirements);

  const { id, name } = getHero(hero.hero) ?? { id: 0, name: "" };
  const isDone = isValidList && (isValidSelf || hasSelfRequirements === false);
  const ascendLevelName = (ascendLevels.find((l) => l.key === hero.ascend) || {}).name;

  const onRestore = useCallback(() => {
    setLevel(hero.hero, "SI", initialHeroLevels?.si ?? 0)
      .again(hero.hero, "FI", initialHeroLevels?.fi ?? 0)
      .again(hero.hero, "ASCEND", initialHeroLevels?.ascend ?? 0)
      .commit();
  }, [
    hero.hero,
    initialHeroLevels?.ascend,
    initialHeroLevels?.fi,
    initialHeroLevels?.si,
    setLevel,
  ]);

  return (
    <div key={id} className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Character id={id} ascendLevel={hero.ascend} fiLevel={hero.fi} siLevel={hero.si} />
      <div className={styles.Infos}>
        <span className={styles.Name}>{name}</span>
        <span>
          <span className={styles.DetailsTitle}>
            {hasSelfRequirements && requirementValue && requirement
              ? t("label-also-require")
              : null}
            {hasSelfRequirements && !(requirementValue && requirement) ? t("label-require") : null}
          </span>
          <InfoDetails value={hero.ascend}>{t(`common:ascension-${ascendLevelName}`)}</InfoDetails>
          <InfoDetails value={hero.si}>{`SI +${hero.si}`}</InfoDetails>
          <InfoDetails value={hero.fi}>{`FI ${hero.fi}/9`}</InfoDetails>
        </span>
      </div>
      <div className={styles.Placeholder} />
      {isDone ? null : (
        <button className={styles.Button} type="button" onClick={onDone}>
          <Svg d={mdiCheck} />
          {t("label-done")}
        </button>
      )}
      {isDone && compare(initialHeroLevels, heroLevels) === false ? (
        <button className={styles.Button} type="button" onClick={onRestore}>
          <Svg d={mdiRestore} />
          {t("label-restore")}
        </button>
      ) : null}
    </div>
  );
};

export default HeroLineViewer;
