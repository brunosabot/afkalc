import React from "react";
import styles from "./CardValue.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardValue: React.FC<IProps> = function CardValue({ children }) {
  return (
    <div className={styles.CardValue}>
      <span className={styles.Value}>{children}</span>
    </div>
  );
};

export default CardValue;
