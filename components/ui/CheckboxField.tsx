import React, { useRef } from "react";
import styles from "./CheckboxField.module.css";

interface IProps {
  label: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  name: string;
}

const CheckboxField: React.FC<IProps> = function CheckboxField({ label, value, onChange, name }) {
  const refId = useRef(`checkbox-field_${name}`);
  const inputEl = useRef<HTMLInputElement>(null);

  const onChangeLocal = (e: any) => {
    onChange(e.target.checked);
  };

  return (
    <div className={styles.Wrapper}>
      <input
        className={styles.CheckboxField}
        id={refId.current}
        type="checkbox"
        ref={inputEl}
        checked={value}
        onChange={onChangeLocal}
      />
      <label className={styles.Label} htmlFor={refId.current}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
