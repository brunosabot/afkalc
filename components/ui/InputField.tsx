import React, { useMemo, useRef } from "react";
import styles from "./InputField.module.css";

interface IProps {
  label: React.ReactNode;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
  small?: boolean;
  name: string;
}

const InputField: React.FC<IProps> = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  small = false,
  readOnly = false,
  style = {},
  maxLength = undefined,
  name,
}) => {
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
      <input
        className={styles.InputField}
        id={refId.current}
        type={type}
        value={localValue}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={style}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
