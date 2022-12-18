import Image from "next/image";
import React from "react";
import styles from "./FactionForm.module.css";

interface IProps {
  label: string;
  onChange: (value: number) => void;
  value: number;
  faction: string;
}

const FactionForm: React.FC<IProps> = function FactionForm({ onChange, value, faction, label }) {
  return (
    <div className={styles.FactionForm}>
      <Image
        src={`/factions/${faction}.png`}
        className={styles.Image}
        alt={faction}
        height={32}
        width={32}
      />
      <span className={styles.Label}>{label}</span>
      <input
        value={value === 0 ? "" : value}
        className={styles.Input}
        type="number"
        min="1"
        onChange={(e) => {
          let newValue = parseInt(e.target.value, 10);
          if (Number.isNaN(newValue)) {
            newValue = 0;
          }

          onChange(Math.max(1, newValue));
        }}
      />
    </div>
  );
};

export default FactionForm;
