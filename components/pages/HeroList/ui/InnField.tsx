import React from "react";
import HeroLevel from "../../../../types/HeroLevel";

interface IProps {
  id: number;
  setLevel: (id: number, field: "inn") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const InnField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  const value = getValue(id, "inn");

  return (
    <input
      onChange={(e) => setLevel(id, "inn")(parseInt(e.target.value, 10))}
      className="hero-list__number"
      value={value === 0 ? "" : value}
      disabled={getValue(id, "ascend") < 7}
      readOnly={isView}
      maxLength={1}
    />
  );
};

export default InnField;
