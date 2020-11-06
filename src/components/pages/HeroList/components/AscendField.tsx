import React from "react";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import HeroLevel from "../../../../types/HeroLevel";

interface IProps {
  id: number;
  setLevel: (id: number, field: "ascend") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const AscendField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => {
  if (isView) {
    const level = ascendLevels.find((e) => e.key === getValue(id, "ascend")) || ascendLevels[0];

    return <div className="hero-list__select">{level.name}</div>;
  }

  return (
    <select
      onChange={(e) => setLevel(id, "ascend")(parseInt(e.target.value || "0", 10))}
      className="hero-list__select"
      value={getValue(id, "ascend")}
    >
      {ascendLevels.map((level) => (
        <option key={level.key} value={level.key}>
          {level.name}
        </option>
      ))}
    </select>
  );
};

AscendField.propTypes = {};

export default AscendField;
