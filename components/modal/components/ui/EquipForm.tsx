import { useTranslation } from "next-i18next";
import React from "react";
import equipLevels from "../../../../data/equipLevel.json";
import heroFactions from "../../../../data/heroFaction.json";
import Type from "../../../../types/Type";
import Equip from "../../../ui/afk/Equip";
import SelectField from "../../../ui/SelectField";
import FastButtons from "../../FastButtons";
import classes from "./EquipForm.module.css";

type PartType = "weapon" | "body" | "boots" | "head";
type PartKey = "PARTWEAPON" | "PARTBODY" | "PARTBOOTS" | "PARTHEAD";
type PartKeyFaction =
  | "PARTWEAPONFACTION"
  | "PARTBODYFACTION"
  | "PARTBOOTSFACTION"
  | "PARTHEADFACTION";

interface Props {
  hero: number;
  type: Type;
  values: Record<PartType, number>;
  factionValues: Record<PartType, number>;
  onChange: (part: PartKey, value: number) => Promise<void>;
  onChangeFaction: (part: PartKeyFaction, value: number) => Promise<void>;
}

const parts: Record<PartType, PartKey> = {
  weapon: "PARTWEAPON",
  body: "PARTBODY",
  boots: "PARTBOOTS",
  head: "PARTHEAD",
};

const EquipForm: React.FC<Props> = function EquipForm({
  hero,
  type,
  values,
  factionValues,
  onChange,
  onChangeFaction,
}) {
  const { t } = useTranslation("common");

  const partList: PartType[] = Object.keys(parts) as PartType[];

  const equip: [number, string][] = equipLevels
    .filter((level) => level.key > 9)
    .map((level) => [level.key, t(`ascension-${level.name}`)]);

  return (
    <>
      <div>
        <div className={classes.Label}>{t("equipment")}</div>
        <FastButtons
          values={equip}
          onClick={(value) => {
            Object.values(parts).forEach((part) => {
              onChange(part, value);
            });
          }}
        />
      </div>
      {partList.map((part: PartType) => (
        <div className={classes.Equip}>
          <Equip
            equipType={type}
            equipPart={part}
            equipLevel={values[part]}
            equipFaction={values[part] >= 12 ? 0 : factionValues[part]}
            equipHero={values[part] >= 12 ? hero : 0}
            size={48}
          />
          <div>
            <div>
              <SelectField
                values={equipLevels.map((level) => ({
                  key: `${level.key}`,
                  label: t(`ascension-${level.name}`),
                }))}
                small
                name="ascend"
                label={`${t(`equipment-${part}`)} - ${t(`concept.ascend`)}`}
                value={values[part]}
                onChange={(value) => onChange(parts[part], parseInt(value, 10))}
              />

              {values[part] >= 12 || values[part] < 4 ? null : (
                <SelectField
                  values={[
                    { key: ``, label: t(`faction-none`) },
                    ...Object.keys(heroFactions).map((faction) => ({
                      key: `${heroFactions[faction as keyof typeof heroFactions]}`,
                      label: t(`faction-${faction}`),
                    })),
                  ]}
                  small
                  name="faction"
                  label={t(`concept.faction`)}
                  value={factionValues[part]}
                  onChange={(value) =>
                    onChangeFaction(`${parts[part]}FACTION`, parseInt(value, 10))
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EquipForm;
