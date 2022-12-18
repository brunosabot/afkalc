import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import petsJson from "../../../data/pets.json";
import IPet from "../../../types/IPet";
import { withTooltip } from "../../functionnal/withTooltip";
import styles from "./Pet.module.css";

const typedPets: IPet[] = petsJson as IPet[];

interface IProps {
  id: string;
  strengthBuff: number;
  intelligenceBuff: number;
  agilityBuff: number;
  highlight?: boolean;
  onClick?: () => void;
  size?: "normal" | "small";
  // Used by the tooltip
  // eslint-disable-next-line react/no-unused-prop-types
  label?: any;
}

const Pet: React.FC<IProps> = function Pet({
  id,
  strengthBuff,
  intelligenceBuff,
  agilityBuff,
  onClick = () => {},
  highlight = false,
  size = "normal",
}) {
  const { t } = useTranslation("common");

  const currentPet = typedPets.find((pet) => pet.id === id);

  if (currentPet === undefined) return null;

  const level = strengthBuff + intelligenceBuff + agilityBuff;
  const isLocked = strengthBuff === -1 || intelligenceBuff === -1 || agilityBuff === -1;
  const highlightClassName = highlight ? styles.Highlight : "";
  const smallClassName = size === "small" ? styles.Small : "";

  return (
    <div>
      <div
        className={`${styles.Wrapper} ${
          isLocked ? styles.Locked : ""
        } ${smallClassName} ${highlightClassName}`}
        onClick={onClick}
        role="button"
        tabIndex={-1}
        onKeyPress={(event) => {
          if (event.key === "Enter") onClick();
        }}
      >
        <Image
          src={`/api/pet?elevation=${currentPet.elevation}&id=${id}&level=${level}`}
          width={size === "normal" ? 64 : 56}
          height={size === "normal" ? 64 : 56}
          alt={t(`common:petName.${id}`)}
        />
      </div>
    </div>
  );
};

export default withTooltip(Pet);
