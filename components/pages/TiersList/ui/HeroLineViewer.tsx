import { mdiCheck } from "@mdi/js";
import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { useTranslation } from "../../../../i18n";
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
  heroLevels?: { si?: number; inn?: number; ascend?: number };
  priorityList: IFirebasePriorityList;
}

const HeroLineViewer: React.FC<IProps> = ({ hero, priorityList, setLevel, heroLevels }) => {
  const { getHero } = useHero();
  const { requirement, requirementValue } = priorityList;

  const isValidList = useIsValidList(priorityList, hero, heroLevels);
  const isValidSelf = useIsValidSelf(hero, heroLevels);
  const { t } = useTranslation("priority-list");
  const { t: tHero } = useTranslation("hero-list");

  const hasSelfRequirements =
    [0, undefined].includes(hero.ascend) === false ||
    [0, undefined].includes(hero.si) === false ||
    [0, undefined].includes(hero.fi) === false;

  const onDone = useOnDone(requirement, requirementValue, hero, setLevel, hasSelfRequirements);

  if (hero.hero === undefined) return null;

  const { id, name } = getHero(hero.hero) ?? { id: 0, name: "" };
  const isDone = isValidList && (isValidSelf || hasSelfRequirements === false);
  const ascendLevelName = (ascendLevels.find((l) => l.key === hero.ascend) || {}).name;

  return (
    <div key={id} className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Character id={id} ascendLevel={hero.ascend} innLevel={hero.fi} siLevel={hero.si} />
      <div className={styles.Infos}>
        <span className={styles.Name}>{name}</span>
        <span>
          <span className={styles.DetailsTitle}>
            {hasSelfRequirements && requirementValue && requirement
              ? t("label-also-require")
              : null}
            {hasSelfRequirements && !(requirementValue && requirement) ? t("label-require") : null}
          </span>
          <InfoDetails value={hero.ascend}>{tHero(`ascension-${ascendLevelName}`)}</InfoDetails>
          <InfoDetails value={hero.si}>{`SI +${hero.si}`}</InfoDetails>
          <InfoDetails value={hero.fi}>{`FI ${hero.fi}/9`}</InfoDetails>
        </span>
      </div>
      <div className={styles.Placeholder} />
      {isDone ? null : (
        <button className={styles.Button} type="button" onClick={onDone}>
          <Svg d={mdiCheck} />
          Fait
        </button>
      )}
    </div>
  );
};

export default HeroLineViewer;
