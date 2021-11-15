import { useTranslation } from "next-i18next";
import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import InputField from "../../../ui/InputField";
import SelectField from "../../../ui/SelectField";
import { UseSetLevelReturn } from "../../TiersList/hooks/useSetLevel";

interface IProps {
  id: number;
  setLevel: UseSetLevelReturn;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
}

const AscendField: React.FC<IProps> = function AscendField({ id, setLevel, getValue, isView }) {
  const { t } = useTranslation("hero-list");

  if (isView) {
    const level = ascendLevels.find((e) => e.key === getValue(id, "ascend")) || ascendLevels[0];

    return (
      <InputField
        style={{ width: "105px", padding: "0 8px" }}
        label=""
        small
        readOnly
        value={t(`common:ascension-${level.name}`) as string}
        onChange={() => {}}
        name={`ascension-${id}`}
      />
    );
  }

  return (
    <SelectField
      name={`ascension-${id}`}
      onChange={(value) => setLevel(id, "ASCEND", parseInt(value || "0", 10)).commit()}
      value={getValue(id, "ascend")}
      label=""
      small
      values={ascendLevels.map((level) => ({
        key: `${level.key}`,
        label: t(`common:ascension-${level.name}`),
      }))}
      style={{ width: "105px" }}
    />
  );
};

AscendField.propTypes = {};

export default AscendField;
