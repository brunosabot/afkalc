import React from "react";
import { IFirebaseHeroesHero } from "../../../providers/types/IFirebaseHeroes";
import InputField from "../../../ui/InputField";
import { UseSetLevelReturn } from "../../TiersList/hooks/useSetLevel";

interface IProps {
  id: number;
  setLevel: UseSetLevelReturn;
  getValue: (id: number, field: keyof IFirebaseHeroesHero) => number;
  isView: boolean;
}

const SiField: React.FC<IProps> = function SiField({ id, setLevel, getValue, isView }) {
  const value = getValue(id, "si");

  return (
    <InputField
      label=""
      small
      onChange={(v) => setLevel(id, "SI", parseInt(v, 10)).commit()}
      value={value === 0 ? "" : value}
      disabled={getValue(id, "ascend") < 5}
      readOnly={isView}
      maxLength={2}
      style={{ width: "32px", textAlign: "center" }}
      name={`si-${id}`}
      inputMode="numeric"
    />
  );
};

export default SiField;
