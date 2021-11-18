import React from "react";
import styles from "./FastButtons.module.css";

interface Props {
  values: [number, string][];
  disabled?: boolean;
  onClick: (value: number) => void;
}

const FastButtons: React.FC<Props> = function FastButtons({ values, disabled = false, onClick }) {
  return (
    <div className={styles.FastButtons}>
      {values.map(([value, label]) => (
        <button
          key={value}
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
};

export default FastButtons;
