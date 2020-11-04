import React, { useMemo, useRef } from "react";

interface Value {
  key: string;
  label: string;
}

interface IProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  values: Value[];
}

const SelectField: React.FC<IProps> = ({ label, value, values, onChange }) => {
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
