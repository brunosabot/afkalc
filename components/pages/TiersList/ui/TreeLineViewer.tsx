import { useTranslation } from "next-i18next";
import React from "react";
import { IFirebaseElderTree } from "../../../providers/types/IFirebaseElderTree";
import IFirebaseTreeList, {
  IFirebaseTreeListStep,
} from "../../../providers/types/IFirebaseTreeList";
import styles from "./Viewer.module.css";

interface IProps {
  shouldShowChecked: boolean;
  step: IFirebaseTreeListStep;
  elderTree: IFirebaseElderTree;
  treeList?: IFirebaseTreeList;
}

const TreeLineViewer: React.FC<IProps> = function TreeLineViewer({
  shouldShowChecked,
  step,
  elderTree,
  treeList,
}) {
  const { t } = useTranslation("priority-list");

  const currentLevel = elderTree[step.heroClass];
  const isDone = currentLevel >= step.level;

  if (isDone && shouldShowChecked === false) return null;

  return (
    <div className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <img src={`/classes/${step.heroClass}.png`} className={styles.Image} alt={step.heroClass} />

      <div className={styles.Infos}>
        {t("level")} {step.level}
      </div>

      <div className={styles.Placeholder} />
    </div>
  );
};

export default TreeLineViewer;
