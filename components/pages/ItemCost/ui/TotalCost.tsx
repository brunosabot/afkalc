import React from "react";
import styles from "./TotalCost.module.css";

interface Props {
  isBest: boolean;
  children: number;
}

const TotalCost: React.FC<Props> = ({ isBest, children }) => {
  return (
    <div className={`${styles.TotalCost} ${isBest ? styles.Best : ""}`}>
      <img className={styles.Diamond} src="/loot/diamond.jpg" />
      {children}
    </div>
  );
};

export default TotalCost;
