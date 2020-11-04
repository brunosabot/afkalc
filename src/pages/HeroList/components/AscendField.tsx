import React from "react";
import HeroLevel from "../../../types/HeroLevel";

const ascendLevels = [
  { key: 0, name: "-" },
  { key: 1, name: "Elite" },
  { key: 2, name: "Elite+" },
  { key: 3, name: "Legendary" },
  { key: 4, name: "Legendary+" },
  { key: 5, name: "Mythic" },
  { key: 6, name: "Mythic+" },
  { key: 7, name: "Ascend" },
  { key: 8, name: "Ascend 1*" },
  { key: 9, name: "Ascend 2*" },
  { key: 10, name: "Ascend 3*" },
  { key: 11, name: "Ascend 4*" },
  { key: 12, name: "Ascend 5*" },
];

interface IProps {
  id: number;
  setLevel: (id: number, field: "ascend") => (value: number) => void;
  getValue: (id: number, field: HeroLevel) => number;
  isView: boolean;
}

const AscendField: React.FC<IProps> = ({ id, setLevel, getValue, isView }) => (
  <select
    onChange={(e) => setLevel(id, "ascend")(parseInt(e.target.value || "0", 10))}
    className="hero-list__select"
    value={getValue(id, "ascend")}
    disabled={isView}
  >
    {ascendLevels.map((level) => (
      <option key={level.key} value={level.key}>
        {level.name}
      </option>
    ))}
  </select>
);

AscendField.propTypes = {};

export default AscendField;
