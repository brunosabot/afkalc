import React from "react";
import styles from "./SelectFilter.module.css";

interface Action {
  type: string;
  value: string;
}

interface Values {
  key: string;
  label: string;
}

interface IProps {
  value: string;
  directionValue: string;
  name: string;
  label: string;
  dispatch: (action: Action) => void;
  values: Values[];
}

const SelectFilter: React.FC<IProps> = function SelectFilter({
  value,
  directionValue,
  dispatch,
  name,
  label,
  values,
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
      <select
        className={styles.Value}
        value={value}
        onChange={(e) => dispatch({ type: name, value: e.target.value })}
      >
        {values.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
