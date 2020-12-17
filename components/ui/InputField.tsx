import React, { useRef } from "react";
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
  style = undefined,
  maxLength = undefined,
  name,
}) => {
  const refId = useRef(`input-field_${name}`);
  const inputEl = useRef<HTMLInputElement>(null);

  // FIXME: Hack. Might be a better way than doing this
  const onChangeLocal = (e: any) => {
    const rightCharsCount = e.target.value.length - e.target.selectionEnd;
    const newPosition = e.target.value.length - rightCharsCount;

    onChange(e.target.value);

    setTimeout(() => {
      inputEl.current?.setSelectionRange(newPosition, newPosition);
    }, 16);
  };

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
        ref={inputEl}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={style}
        onChange={onChangeLocal}
      />
    </div>
  );
};

export default InputField;
