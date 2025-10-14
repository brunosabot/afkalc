import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { IFirebasePetsPet } from "../providers/types/IFirebasePets";
import classes from "./PetTooltip.module.css";

interface IProps {
  pet: IFirebasePetsPet;
}

const PetTooltip: React.FC<IProps> = function PetTooltip({ pet }) {
  const { t } = useTranslation("common");
  const { t: tPublic } = useTranslation("public");

  return (
    <>
      <div className={classes.Name}>
        {t(`petName.${pet.id}`)} ({tPublic("label-level")}&nbsp;
        {pet.strengthBuff + pet.intelligenceBuff + pet.agilityBuff})
      </div>

      <div className={classes.BuffWrapper}>
        <Image
          alt=""
          src={`/api/pet-buff?type=strength&level=${pet.strengthBuff}`}
          className={classes.Buff}
          height={35}
          width={54}
        />
        <Image
          alt=""
          src={`/api/pet-buff?type=intelligence&level=${pet.intelligenceBuff}`}
          className={classes.Buff}
          height={35}
          width={54}
        />
        <Image
          alt=""
          src={`/api/pet-buff?type=agility&level=${pet.agilityBuff}`}
          className={classes.Buff}
          height={35}
          width={54}
        />
      </div>
    </>
  );
};

export default PetTooltip;
