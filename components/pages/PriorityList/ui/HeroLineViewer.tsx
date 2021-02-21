import { mdiCheck } from "@mdi/js";
import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { useTranslation } from "../../../../i18n";
import HeroLevel from "../../../../types/HeroLevel";
import IHeroDetails from "../../../../types/IHeroDetails";
import Character from "../../../ui/afk/Character";
import Svg from "../../../ui/Svg";
import useHero from "../hooks/useHero";
import useIsValidList from "../hooks/useIsValidList";
import useIsValidSelf from "../hooks/useIsValidSelf";
import InfoDetails from "./InfoDetails";
import styles from "./Viewer.module.css";


interface IProps {
  hero: IHeroDetails;
  setLevel: (key: number, field: HeroLevel|HeroLevel[]) => (value: number|number[]) => Promise<void> | null;
  heroLevels?: { si?: number; inn?: number; ascend?: number };
  priorityList: { value: number; type: string };
}

const HeroLineViewer: React.FC<IProps> = ({ hero, priorityList, setLevel, heroLevels }) => {
  const { getHero } = useHero();

  const isValidList = useIsValidList(priorityList, heroLevels);
  const isValidSelf = useIsValidSelf(hero, heroLevels);
  const { t } = useTranslation("priority-list");
  const { t:tHero } = useTranslation("hero-list");

  if (hero.id === undefined) return null;

  const { id, name } = getHero(hero.id) ?? { id: 0, name: "" };

  const hasSelfRequirements = 
    [0, undefined].includes(hero.ascend) === false ||
    [0, undefined].includes(hero.si)===false ||
    [0, undefined].includes(hero.fi)===false;

  let onDone;
  if (priorityList.type === "SI") onDone = () => setLevel(id, "si")(priorityList.value);
  if (priorityList.type === "FI") onDone = () => setLevel(id, "inn")(priorityList.value);
  if (priorityList.type === "ASCEND") onDone = () => setLevel(id, "ascend")(priorityList.value);
  if (hasSelfRequirements) {
    onDone = async () => {
      const levels: HeroLevel[] = [];
      const values: number[] = []

      if (hero.si) {
        levels.push("si");
        values.push(hero.si);
      }

      if (hero.fi) {
        levels.push("inn");
        values.push(hero.fi);
      }

      if (hero.ascend) {
        levels.push("ascend");
        values.push(hero.ascend);
      }

      await setLevel(id, levels)(values);
    };
  }

  const isDone = isValidList && (isValidSelf || hasSelfRequirements === false)

  const ascendLevelName = (ascendLevels.find(l=>l.key === hero.ascend) || {}).name;

  return (
    <div key={id} className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Character id={id} ascendLevel={hero.ascend} innLevel={hero.fi} siLevel={hero.si} />
      <div className={styles.Infos}>
        <span className={styles.Name}>{name}</span>
        <span>
          <span className={styles.DetailsTitle}>{hasSelfRequirements ? t("label-also-require") : null}</span>
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
