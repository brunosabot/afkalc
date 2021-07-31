import React from "react";
import styles from "./ClassForm.module.css";

interface IProps {
  onChange: (value: number) => void;
  value: number;
  heroClass: string;
}

const ClassForm: React.FC<IProps> = ({ onChange, value, heroClass }) => (
  <div className={styles.ClassForm}>
    <img src={`/classes/${heroClass}.png`} className={styles.Image} alt={heroClass} />
    <input
      value={value === 0 ? "" : value}
      className={styles.Input}
      type="number"
      min="0"
      max="130"
      onChange={(e) => {
        let newValue = parseInt(e.target.value, 10);
        if (isNaN(newValue)) {
          newValue = 0;
        }

        onChange(Math.max(0, Math.min(130, newValue)));
      }}
    />
  </div>
);

export default ClassForm;
