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

  const agi = pets[step.pet]?.agilityBuff ?? 0;
  const int = pets[step.pet]?.intelligenceBuff ?? 0;
  const str = pets[step.pet]?.strengthBuff ?? 0;

  const currentLevel = agi + int + str;
  const isDone = currentLevel >= step.level;

  if (isDone && shouldShowChecked === false) return null;

  return (
    <div className={`${styles.Item} ${isDone ? styles.IsOk : ""}`}>
      <Pet
        key={step.pet}
        id={`${step.pet}`}
        agilityBuff={agi}
        intelligenceBuff={int}
        strengthBuff={str}
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
