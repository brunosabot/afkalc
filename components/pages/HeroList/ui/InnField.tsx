import React from "react";
import HeroLevel from "../../../../types/HeroLevel";
import InputField from "../../../ui/InputField";

interface IProps {
  id: number;
  setLevel: (id: number, field: "inn") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const InnField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  const value = getValue(id, "inn");

  return (
    <InputField
      label=""
      small
      onChange={(v) => setLevel(id, "inn")(parseInt(v, 10))}
      value={value === 0 ? "" : value}
      disabled={getValue(id, "ascend") < 7}
      readOnly={isView}
      maxLength={1}
      style={{ width: "32px", textAlign: "center" }}
      name={`inn-${id}`}
    />
  );
};

export default InnField;
