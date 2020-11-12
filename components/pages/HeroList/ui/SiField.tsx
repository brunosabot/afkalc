import React from "react";
import HeroLevel from "../../../../types/HeroLevel";

interface IProps {
  id: number;
  setLevel: (id: number, field: "si") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const SiField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  const value = getValue(id, "si");

  return (
    <input
      onChange={(e) => setLevel(id, "si")(parseInt(e.target.value, 10))}
      className="hero-list__number"
      value={value === 0 ? "" : value}
      disabled={getValue(id, "ascend") < 5}
      readOnly={isView}
      maxLength={2}
    />
  );
};

export default SiField;
