import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import { useTranslation } from "../../../../i18n";
import HeroLevel from "../../../../types/HeroLevel";
import InputField from "../../../ui/InputField";
import SelectField from "../../../ui/SelectField";

interface IProps {
  id: number;
  setLevel: (id: number, field: "ascend") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const AscendField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  const { t } = useTranslation("hero-list");

  if (isView) {
    const level = ascendLevels.find((e) => e.key === getValue(id, "ascend")) || ascendLevels[0];

    return (
      <InputField
        style={{ width: "105px", padding: "0 8px" }}
        label=""
        small
        readOnly
        value={t(`ascension-${level.name}`) as string}
        onChange={() => {}}
        name={`ascension-${id}`}
      />
    );
  }

  return (
    <SelectField
      name={`ascension-${id}`}
      onChange={(value) => setLevel(id, "ascend")(parseInt(value || "0", 10))}
      value={getValue(id, "ascend")}
      label=""
      small
      values={ascendLevels.map((level) => ({
        key: `${level.key}`,
        label: t(`ascension-${level.name}`),
      }))}
      style={{ width: "105px" }}
    />
  );
};

AscendField.propTypes = {};

export default AscendField;
