import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChooseTreeStep from "../../../modal/ChooseTreeStep";
import { IFirebaseTreeListStep } from "../../../providers/types/IFirebaseTreeList";
import Svg from "../../../ui/Svg";
import styles from "./StepLine.module.css";

interface Props {
  step: IFirebaseTreeListStep;
  onSelect: (value: IFirebaseTreeListStep, index: number) => void;
  onDelete?: (value: IFirebaseTreeListStep, index: number) => void;
  onUp?: (value: IFirebaseTreeListStep, index: number) => void;
  onDown?: (value: IFirebaseTreeListStep, index: number) => void;
  index: number;
  length: number;
}

const StepLine: React.FC<Props> = function StepLine({
  step,
  onSelect,
  onDelete = () => {},
  onUp = () => {},
  onDown = () => {},
  index,
  length,
}) {
  const [theStep, setTheStep] = useState<IFirebaseTreeListStep>(step);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t } = useTranslation("priority-list");

  const canMoveUp = step.heroClass && index > 0;
  const canMoveDown = step.heroClass && index + 1 < length;

  return (
    <div className={styles.StepLine}>
      <button
        className={styles.Button}
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
      >
        <Image
          src={`/classes/${step.heroClass}.png`}
          className={styles.Image}
          alt={step.heroClass}
          height={24}
          width={24}
        />
      </button>

      <span className={styles.Name}>
        {t("level")} {step.level}
      </span>

      {canMoveUp ? <Svg d={mdiArrowUpBold} onClick={() => onUp(theStep, index)} /> : <Svg d="" />}
      {canMoveDown ? (
        <Svg d={mdiArrowDownBold} onClick={() => onDown(theStep, index)} />
      ) : (
        <Svg d="" />
      )}
      <Svg d={mdiDelete} onClick={() => onDelete(theStep, index)} />

      <Modal
        active={showModal}
        onClose={() => {
          onSelect(theStep, index);
          setShowModal(false);
        }}
      >
        <ChooseTreeStep heroClass={theStep.heroClass} level={theStep.level} onSelect={setTheStep} />
      </Modal>
    </div>
  );
};

export default StepLine;
