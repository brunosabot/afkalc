import React, { useMemo, useRef } from "react";
import styles from "./SelectField.module.css";

interface IValue {
  key: string;
  label: string;
}

interface IProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  values: IValue[];
  small?: boolean;
  style?: React.CSSProperties;
  name: string;
}

const SelectField: React.FC<IProps> = function SelectField({
  name,
  label,
  value,
  values,
  onChange,
  small = false,
  style = {},
}) {
  const refId = useRef(`input-field_${name}`);

  const localValue = useMemo(() => {
    if (value === 0) {
      return "";
    }
    return value;
  }, [value]);

  return (
    <div className={`${styles.Wrapper} ${small ? styles.Small : ""}`}>
      {label === "" ? null : (
        <label className={styles.Label} htmlFor={refId.current}>
          {label}
        </label>
      )}
      <select
        className={styles.SelectField}
        id={refId.current}
        value={localValue}
        onChange={(e) => onChange(e.target.value)}
        style={style}
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
