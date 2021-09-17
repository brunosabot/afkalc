import React from "react";
import styles from "./FastButtons.module.css";

interface Props {
  values: [number, string][];
  onClick: (value: number) => void;
}

const FastButtons: React.FC<Props> = ({ values, onClick }) => (
  <div className={styles.FastButtons}>
    {values.map(([value, label]) => (
      <button type="button" className={styles.FastButton} onClick={() => onClick(value)}>
        {label}
      </button>
    ))}
  </div>
);

export default FastButtons;
