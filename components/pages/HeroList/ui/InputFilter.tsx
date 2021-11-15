import React from "react";
import styles from "./InputFilter.module.css";

interface Action {
  type: string;
  value: string;
}

interface IProps {
  value: string;
  directionValue: string;
  name: string;
  label: string;
  dispatch: (action: Action) => void;
}

const InputFilter: React.FC<IProps> = function InputFilter({
  value,
  directionValue,
  dispatch,
  name,
  label,
}) {
  return (
    <div className={styles.Wrapper}>
      <label className={styles.Label} htmlFor={name}>
        {label}
      </label>
      <select
        className={styles.Select}
        name={name}
        value={directionValue}
        onChange={(e) => dispatch({ type: `direction-${name}`, value: e.target.value })}
      >
        <option value=">">&gt;</option>
        <option value=">=">&#8805;</option>
        <option value="=">=</option>
        <option value="<=">&#8804;</option>
        <option value="<">&lt;</option>
      </select>
      <input
        className={styles.Value}
        value={value}
        onChange={(e) => dispatch({ type: name, value: e.target.value })}
      />
    </div>
  );
};

export default InputFilter;
