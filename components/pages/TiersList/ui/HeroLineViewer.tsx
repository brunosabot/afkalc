import { mdiArrowRightThin, mdiCheck, mdiRestore } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback } from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import IFirebasePriorityList, {
  IFirebasePriorityListHero,
} from "../../../providers/types/IFirebasePriorityList";
import Character, { DetailType } from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import useIsValidList from "../hooks/useIsValidList";
import useIsValidSelf from "../hooks/useIsValidSelf";
import useOnDone from "../hooks/useOnDone";
import { UseSetLevelReturn } from "../hooks/useSetLevel";
import InfoDetails from "./InfoDetails";
import styles from "./Viewer.module.css";

interface IProps {
  shouldShowChecked: boolean;
  shouldShowSetLevel?: boolean;
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

const HeroLineViewer: React.FC<IProps> = function HeroLineViewer({
  shouldShowChecked,
  shouldShowSetLevel = true,
  hero,
  priorityList,
  setLevel,
  heroLevels,
  initialHeroLevels,
}) {
  const { t: tC } = useTranslation("common");
  const { getHero } = useHero();
  const { requirement, requirementValue } = priorityList;

  const isValidList = useIsValidList(priorityList, hero, heroLevels);
  const isValidSelf = useIsValidSelf(hero, heroLevels);
  const { t } = useTranslation("priority-list");

  const hasSelfRequirements =
    [0, undefined].includes(hero.ascend) === false ||
    [-1, 0, undefined].includes(hero.si) === false ||
    [0, undefined].includes(hero.fi) === false ||
    [0, undefined].includes(hero.engrave) === false;

  const onDone = useOnDone(
    requirement,
    requirementValue,
    hero,
    setLevel,
    heroLevels,
    hasSelfRequirements
  );

  const { id, name } = getHero(tC, hero.hero) ?? { id: 0, name: "" };
  const isDone = isValidList && (isValidSelf || hasSelfRequirements === false);

  const onRestore = useCallback(() => {
    setLevel(hero.hero, "SI", initialHeroLevels?.si ?? 0)
      .again(hero.hero, "FI", initialHeroLevels?.fi ?? 0)
      .again(hero.hero, "ASCEND", initialHeroLevels?.ascend ?? 0)
      .again(hero.hero, "ENGRAVE", initialHeroLevels?.engrave ?? 0)
      .commit();
  }, [
    hero.hero,
    initialHeroLevels?.ascend,
    initialHeroLevels?.engrave,
    initialHeroLevels?.fi,
    initialHeroLevels?.si,
    setLevel,
  ]);

  if (isDone && shouldShowChecked === false) return null;

  const requiredSi = Math.max(hero.si, requirement === "SI" ? requirementValue : -1);
  const requiredFi = Math.max(hero.fi, requirement === "FI" ? requirementValue : 0);
  const requiredEngrave = Math.max(hero.engrave, requirement === "ENGRAVE" ? requirementValue : 0);
  const requiredAscend = Math.max(
    hero.ascend,
    requirement === "ASCEND" ? requirementValue : 0,
    requiredSi > 0 ? 5 : 0,
    requiredFi > 0 ? 7 : 0,
    requiredEngrave > 0 ? 8 : 0
  );
  const ascendLevelName = (ascendLevels.find((l) => l.key === requiredAscend) || {}).name;

  return (
    <div key={id} className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Character
        id={id}
        ascendLevel={heroLevels?.ascend}
        fiLevel={heroLevels?.fi ?? 0}
        siLevel={heroLevels?.si ?? -1}
        engraveLevel={heroLevels?.engrave ?? 0}
        disabled={
          heroLevels === undefined || heroLevels.ascend === undefined || heroLevels.ascend === 0
        }
      />
      <div style={{ margin: "0 -12px" }}>
        <Svg d={mdiArrowRightThin} />
      </div>
      <Character
        id={id}
        ascendLevel={Math.max(heroLevels?.ascend ?? 0, requiredAscend)}
        fiLevel={Math.max(heroLevels?.fi ?? 0, requiredFi)}
        siLevel={Math.max(heroLevels?.si ?? -1, requiredSi)}
        engraveLevel={Math.max(heroLevels?.engrave ?? 0, requiredEngrave)}
      />
      <div className={styles.Infos}>
        <span className={styles.Name}>{name}</span>
        <span>
          <InfoDetails
            isDone={isDone}
            type={DetailType.ASCEND}
            value={heroLevels?.ascend}
            target={requiredAscend}
          >
            {t(`common:ascension-${ascendLevelName}`)}
          </InfoDetails>
          <InfoDetails
            isDone={isDone}
            type={DetailType.SI}
            value={heroLevels?.si}
            target={requiredSi}
          >
            {`${t("common:concept.si")} ${
              requiredSi === 0 ? t("common:concept.unlocked") : `+${requiredSi}`
            }`}
          </InfoDetails>
          <InfoDetails
            isDone={isDone}
            type={DetailType.INN}
            value={heroLevels?.fi}
            target={requiredFi}
          >
            {`${t("common:concept.fi")} ${requiredFi}/9`}
          </InfoDetails>
          <InfoDetails
            isDone={isDone}
            type={DetailType.ENGRAVE}
            value={heroLevels?.engrave}
            target={requiredEngrave}
          >
            {`${t("common:concept.engrave")} ${requiredEngrave}`}
          </InfoDetails>
        </span>
      </div>
      <div className={styles.Placeholder} />
      {shouldShowSetLevel === false || isDone ? null : (
        <button className={styles.Button} type="button" onClick={onDone}>
          <Svg d={mdiCheck} />
          {t("label-done")}
        </button>
      )}
      {shouldShowSetLevel && isDone && compare(initialHeroLevels, heroLevels) === false ? (
        <button className={styles.Button} type="button" onClick={onRestore}>
          <Svg d={mdiRestore} />
          {t("label-restore")}
        </button>
      ) : null}
    </div>
  );
};

export default HeroLineViewer;
