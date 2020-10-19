import React from "react";

const InnField = ({ id, setLevel, getValue, isView }) => {
  return (
    <input
      onChange={setLevel(id, "inn")}
      className="hero-list__number"
      value={getValue(id, "inn")}
      disabled={getValue(id, "ascend") < 5}
      readOnly={isView}
      maxLength="1"
    />
  );
};

export default InnField;
