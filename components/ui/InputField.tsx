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
  list?: string;
  inputMode?: "numeric" | undefined;
}

const InputField: React.FC<IProps> = function InputField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  small = false,
  readOnly = false,
  style = undefined,
  maxLength = undefined,
  inputMode = undefined,
  list = undefined,
  name,
}) {
  const refId = useRef(`input-field_${name}`);
  const inputEl = useRef<HTMLInputElement>(null);

  const localValue = useMemo(() => {
    if (value === 0) {
      return "";
    }
    return value;
  }, [value]);

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
        value={localValue}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={style}
        onChange={onChangeLocal}
        inputMode={inputMode}
        list={list}
      />
    </div>
  );
};

export default InputField;
