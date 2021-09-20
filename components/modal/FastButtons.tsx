import React from "react";
import styles from "./FastButtons.module.css";

interface Props {
  values: [number, string][];
  disabled?: boolean;
  onClick: (value: number) => void;
}

const FastButtons: React.FC<Props> = ({ values, disabled = false, onClick }) => (
  <div className={styles.FastButtons}>
    {values.map(([value, label]) => (
      <button
        disabled={disabled}
        type="button"
        className={styles.FastButton}
        onClick={() => onClick(value)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FastButtons;
