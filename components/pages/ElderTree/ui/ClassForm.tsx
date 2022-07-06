import React from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import styles from "./ClassForm.module.css";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

interface IProps {
  onChange: (value: number) => void;
  value: number;
  heroClass: string;
}

const ClassForm: React.FC<IProps> = function ClassForm({ onChange, value, heroClass }) {
  return (
    <div className={styles.ClassForm}>
      <img src={`/classes/${heroClass}.png`} className={styles.Image} alt={heroClass} />
      <input
        value={value === 0 ? "" : value}
        className={styles.Input}
        type="number"
        min="0"
        max={MAX_LEVEL}
        onChange={(e) => {
          let newValue = parseInt(e.target.value, 10);
          if (Number.isNaN(newValue)) {
            newValue = 0;
          }

          onChange(Math.max(0, Math.min(MAX_LEVEL, newValue)));
        }}
      />
    </div>
  );
};

export default ClassForm;
