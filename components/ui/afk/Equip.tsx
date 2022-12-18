import Image from "next/image";
import React from "react";
import Type from "../../../types/Type";
import classes from "./Equip.module.css";

type PartType = "weapon" | "body" | "boots" | "head";

interface Props {
  equipType: Type;
  equipPart: PartType;
  equipLevel?: number;
  equipFaction?: number;
  equipHero?: number;
  size: number;
}

const Equip: React.FC<Props> = function Equip({
  equipType,
  equipPart,
  equipLevel = 0,
  equipFaction,
  equipHero,
  size,
}) {
  const hero = equipLevel >= 12 ? equipHero : 0;
  const faction = equipLevel >= 12 || equipLevel < 4 ? 0 : equipFaction;

  return (
    <Image
      src={`/api/equip?type=${equipType}&part=${equipPart}&level=${equipLevel}&faction=${faction}&hero=${hero}`}
      className={classes.Equip}
      height={size}
      width={size}
      alt=""
    />
  );
};

export default Equip;
