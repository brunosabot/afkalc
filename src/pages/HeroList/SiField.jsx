import React from "react";

const SiField = ({ id, setLevel, getValue, isView }) => {
  return (
    <input
      onChange={setLevel(id, "si")}
      placeholder="SI"
      className="hero-list__number"
      value={getValue(id, "si")}
      disabled={getValue(id, "ascend") < 5}
      readOnly={isView}
    />
  );
};

export default SiField;
