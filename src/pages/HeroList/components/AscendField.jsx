import React from "react";

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

const AscendField = ({ id, setLevel, getValue, isView }) => (
  <select
    onChange={setLevel(id, "ascend")}
    className="hero-list__select"
    value={getValue(id, "ascend")}
    readOnly={isView}
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
