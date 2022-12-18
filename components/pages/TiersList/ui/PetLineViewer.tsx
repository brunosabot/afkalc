import { useTranslation } from "next-i18next";
import React from "react";
import { IFirebasePetListStep } from "../../../providers/types/IFirebasePetList";
import { IFirebasePetList } from "../../../providers/types/IFirebasePets";
import Pet from "../../../ui/afk/Pet";
import styles from "./Viewer.module.css";

interface IProps {
  shouldShowChecked: boolean;
  step: IFirebasePetListStep;
  pets: IFirebasePetList;
}

const PetLineViewer: React.FC<IProps> = function PetLineViewer({ shouldShowChecked, step, pets }) {
  const { t } = useTranslation("priority-list");

  const currentLevel =
    pets[step.pet].agilityBuff + pets[step.pet].intelligenceBuff + pets[step.pet].strengthBuff;
  const isDone = currentLevel >= step.level;

  if (isDone && shouldShowChecked === false) return null;

  return (
    <div className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Pet
        key={step.pet}
        id={`${step.pet}`}
        agilityBuff={0}
        intelligenceBuff={0}
        strengthBuff={0}
        size="small"
      />

      <div className={styles.Infos}>
        {t("level")} {step.level}
      </div>

      <div className={styles.Placeholder} />
    </div>
  );
};

export default PetLineViewer;
