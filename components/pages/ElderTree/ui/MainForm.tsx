import React from "react";
import elderTreeJson from "../../../../data/elder-tree.json";
import styles from "./MainForm.module.css";

const MAX_LEVEL = Object.keys(elderTreeJson.ranger).length - 1;

interface IProps {
  onChange: (value: number) => void;
  value: number;
}

const MainForm: React.FC<IProps> = function MainForm({ onChange, value }) {
  return (
    <div className={styles.MainForm}>
      <img src="/elder-tree/tree-level.png" className={styles.Image} alt="bag_astrolabe" />
      <input
        value={value === 0 ? "" : value}
        className={styles.Input}
        type="number"
        min="0"
        max={MAX_LEVEL + 10}
        onChange={(e) => {
          let newValue = parseInt(e.target.value, 10);
          if (Number.isNaN(newValue)) {
            newValue = 0;
          }

          onChange(Math.max(0, Math.min(MAX_LEVEL + 10, newValue)));
        }}
      />
    </div>
  );
};

export default MainForm;
