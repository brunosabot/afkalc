import { useTranslation } from "next-i18next";
import React from "react";
import heroes from "../../data/heroes.json";
import Type from "../../types/Type";
import Equip from "../ui/afk/Equip";
import classes from "./StuffTooltip.module.css";

interface ICharacter {
  partbody?: number;
  partboots?: number;
  parthead?: number;
  partweapon?: number;
  partbodyfaction?: number;
  partbootsfaction?: number;
  partheadfaction?: number;
  partweaponfaction?: number;
}

interface IProps {
  id: number;
  character?: ICharacter;
}

const StuffTooltip: React.FC<IProps> = function StuffTooltip({ id, character }) {
  const { t: tC } = useTranslation("common");
  if (character === undefined) return null;

  const shouldShowEquip =
    (character.partbody ?? 0) > 0 ||
    (character.partboots ?? 0) > 0 ||
    (character.parthead ?? 0) > 0 ||
    (character.partweapon ?? 0) > 0;

  const hero = heroes.find((h) => h.id === id);

  let type = Type.agility;
  if (hero !== undefined) {
    type = Type[hero.type as keyof typeof Type];
  }

  return (
    <>
      <div className={classes.Name}>{tC(`heroesName.${hero?.slug}`)}</div>
      {shouldShowEquip ? (
        <div className={classes.StuffWrapper}>
          <Equip
            equipType={type}
            equipPart="weapon"
            equipLevel={character.partweapon}
            equipFaction={character.partweaponfaction}
            equipHero={id}
            size={40}
          />
          <Equip
            equipType={type}
            equipPart="body"
            equipLevel={character.partbody}
            equipFaction={character.partbodyfaction}
            equipHero={id}
            size={40}
          />
          <Equip
            equipType={type}
            equipPart="boots"
            equipLevel={character.partboots}
            equipFaction={character.partbootsfaction}
            equipHero={id}
            size={40}
          />
          <Equip
            equipType={type}
            equipPart="head"
            equipLevel={character.parthead}
            equipFaction={character.partheadfaction}
            equipHero={id}
            size={40}
          />
        </div>
      ) : null}
    </>
  );
};

export default StuffTooltip;
