import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import ElderTreeJson, { ElderTreeFactionLevel } from "../../../../types/ElderTreeJson";
import HeroClass from "../../../../types/HeroClass";
import ProfileContext from "../../../providers/ProfileContext";
import styles from "./Stat.module.css";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

const elderTreeData = elderTreeJson as ElderTreeJson;

interface IProps {
  heroClass: HeroClass;
  stat: keyof ElderTreeFactionLevel;
  level?: number;
}

const Stat: React.FC<IProps> = function Stat({ heroClass, stat, level }) {
  const { t } = useTranslation("elder-tree");

  const { values } = useContext(ProfileContext);

  const classTreeData = elderTreeData[heroClass];
  const playerTreeLevel = values.elderTree[heroClass] as number;
  const classTreeLevel = classTreeData[Math.min(level ?? playerTreeLevel, MAX_LEVEL)];
  const value = classTreeLevel?.[stat] ?? 0;

  if (value === 0) {
    return null;
  }

  return (
    <span className={styles.Stat}>
      <span className={styles.Name}>{t(stat)}</span>
      <span className={styles.Value}>
        {classTreeLevel?.[stat]}
        {stat.indexOf("Perc") > -1 ? "%" : null}
      </span>
    </span>
  );
};

export default Stat;
