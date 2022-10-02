import React from "react";
import styles from "./ClassForm.module.css";

interface IProps {
  onChange: (value: number) => void;
  value: number;
  heroClass: string;
  max: number;
}

const ClassForm: React.FC<IProps> = function ClassForm({ onChange, value, heroClass, max }) {
  return (
    <div className={styles.ClassForm}>
      <img src={`/elder-tree/${heroClass}.png`} className={styles.Image} alt={heroClass} />
      <input
        value={value === 0 ? "" : value}
        className={styles.Input}
        type="number"
        min="0"
        max={max - 10}
        onChange={(e) => {
          let newValue = parseInt(e.target.value, 10);
          if (Number.isNaN(newValue)) {
            newValue = 0;
          }

          onChange(Math.max(0, Math.min(max - 10, newValue)));
        }}
      />
    </div>
  );
};

export default ClassForm;
