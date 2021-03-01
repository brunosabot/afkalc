import React from "react";
import HeroLevel from "../../../../types/HeroLevel";
import InputField from "../../../ui/InputField";

interface IProps {
  id: number;
  setLevel: (id: number, field: "si") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const SiField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  const value = getValue(id, "si");

  return (
    <InputField
      label=""
      small
      onChange={(v) => setLevel(id, "si")(parseInt(v, 10))}
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
