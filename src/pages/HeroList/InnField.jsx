import React from "react";

const InnField = ({ id, setLevel, getValue, isView }) => {
  return (
    <input
      onChange={setLevel(id, "inn")}
      placeholder="Inn"
      className="hero-list__number"
      value={getValue(id, "inn")}
      disabled={getValue(id, "ascend") < 5}
      readOnly={isView}
    />
  );
};

export default InnField;
