import { useTranslation } from "next-i18next";
import React from "react";
import Type from "../../types/Type";
import Equip from "../ui/afk/Equip";
import classes from "./HeroTooltip.module.css";

interface ICharacter {
  id: number;
  si: number;
  fi: number;
  ascend: number;
  engrave: number;
  partbody: number;
  partboots: number;
  parthead: number;
  partweapon: number;
  partbodyfaction: number;
  partbootsfaction: number;
  partheadfaction: number;
  partweaponfaction: number;
  name?: string;
  type: Type;
  slug: string;
}

interface IProps {
  character: ICharacter;
}

function getAscend(ascendLevel: number) {
  if (ascendLevel === 1) return `elite`;
  if (ascendLevel === 2) return `elite-p`;
  if (ascendLevel === 3) return `legendary`;
  if (ascendLevel === 4) return `legendary-p`;
  if (ascendLevel === 5) return `mythic`;
  if (ascendLevel === 6) return `mythic-p`;
  if (ascendLevel === 7) return `ascend`;
  if (ascendLevel > 7) return `ascend-${ascendLevel - 7}`;

  return "-";
}

const HeroTooltip: React.FC<IProps> = function HeroTooltip({ character }) {
  const { t } = useTranslation("common");

  const shouldShowEquip =
    character?.partbody > 0 ||
    character?.partboots > 0 ||
    character?.parthead > 0 ||
    character?.partweapon > 0;

  return (
    <>
      <div className={classes.Name}>{t(`heroesName.${character.slug}`)}</div>

      {character.ascend > 0 ? (
        <div className={classes.Info}>{t(`ascension-${getAscend(character.ascend)}`)}</div>
      ) : (
        <div className={classes.Info}>{t(`ascension-none`)}</div>
      )}

      {character.si > 0 ? (
        <div className={classes.Info}>
          {t("concept.si")} {character.si}
        </div>
      ) : null}

      {character.si === 0 ? <div className={classes.Info}>{t("concept.siUnlocked")}</div> : null}

      {character.fi > 0 ? (
        <div className={classes.Info}>
          {t("concept.fi")} {character.fi}
        </div>
      ) : null}

      {character.engrave > 0 ? (
        <div className={classes.Info}>
          {t("concept.engrave")} {character.engrave}
        </div>
      ) : null}

      {shouldShowEquip ? (
        <div className={classes.StuffWrapper}>
          <Equip
            equipType={character.type}
            equipPart="weapon"
            equipLevel={character.partweapon}
            equipFaction={character.partweaponfaction}
            equipHero={character.id}
            size={40}
          />
          <Equip
            equipType={character.type}
            equipPart="body"
            equipLevel={character.partbody}
            equipFaction={character.partbodyfaction}
            equipHero={character.id}
            size={40}
          />
          <Equip
            equipType={character.type}
            equipPart="head"
            equipLevel={character.parthead}
            equipFaction={character.partheadfaction}
            equipHero={character.id}
            size={40}
          />
          <Equip
            equipType={character.type}
            equipPart="boots"
            equipLevel={character.partboots}
            equipFaction={character.partbootsfaction}
            equipHero={character.id}
            size={40}
          />
        </div>
      ) : null}
    </>
  );
};

export default HeroTooltip;
