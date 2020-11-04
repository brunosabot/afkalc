import React, { useMemo, useRef } from "react";

const SelectField = ({ label, value, values, onChange, type = "text" }) => {
  const refId = useRef(`input-field_${Math.random()}`);

  const localValue = useMemo(() => {
    if (value === 0) {
      return "";
    }
    return value;
  }, [value]);

  return (
    <div className="select-field__wrapper">
      <label className="select-field__label" htmlFor={refId.current}>
        {label}
      </label>
      <select
        className="select-field"
        id={refId.current}
        type={type}
        value={localValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((v) => (
          <option key={v.key} value={v.key}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
