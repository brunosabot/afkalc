import React, { useMemo, useRef } from "react";

const InputField = ({ label, value, onChange, type = "text" }) => {
  const refId = useRef(`input-field_${Math.random()}`);

  const localValue = useMemo(() => {
    if (value === 0) {
      return "";
    }
    return value;
  }, [value]);

  return (
    <div className="input-field__wrapper">
      <label className="input-field__label" htmlFor={refId.current}>
        {label}
      </label>
      <input
        className="input-field"
        id={refId.current}
        type={type}
        value={localValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
