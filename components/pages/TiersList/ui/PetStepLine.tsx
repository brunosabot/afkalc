import { mdiArrowDownBold, mdiArrowUpBold, mdiDelete } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Modal from "../../../functionnal/Modal";
import ChoosePetStep from "../../../modal/ChoosePetStep";
import { IFirebasePetListStep } from "../../../providers/types/IFirebasePetList";
import Pet from "../../../ui/afk/Pet";
import Svg from "../../../ui/Svg";
import styles from "./PetStepLine.module.css";

interface Props {
  step: IFirebasePetListStep;
  onSelect: (value: IFirebasePetListStep, index: number) => void;
  onDelete?: (value: IFirebasePetListStep, index: number) => void;
  onUp?: (value: IFirebasePetListStep, index: number) => void;
  onDown?: (value: IFirebasePetListStep, index: number) => void;
  index: number;
  length: number;
}

const PetStepLine: React.FC<Props> = function PetStepLine({
  step,
  onSelect,
  onDelete = () => {},
  onUp = () => {},
  onDown = () => {},
  index,
  length,
}) {
  const [theStep, setTheStep] = useState<IFirebasePetListStep>(step);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t } = useTranslation("priority-list");

  const canMoveUp = step.pet && index > 0;
  const canMoveDown = step.pet && index + 1 < length;

  return (
    <div className={styles.PetStepLine}>
      <button
        className={styles.Button}
        onClick={() => {
          setShowModal(true);
        }}
        type="button"
      >
        <Pet
          key={step.pet}
          id={`${step.pet}`}
          agilityBuff={0}
          intelligenceBuff={0}
          strengthBuff={0}
          size="small"
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
        <ChoosePetStep pet={theStep.pet} level={theStep.level} onSelect={setTheStep} />
      </Modal>
    </div>
  );
};

export default PetStepLine;
