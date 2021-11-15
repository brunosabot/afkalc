import React from "react";
import styles from "./EvenColumn.module.css";

interface IProps {
  children: React.ReactNode;
}

const EvenColumn: React.FC<IProps> = function EvenColumn({ children }) {
  return <div className={styles.EvenColumn}>{children}</div>;
};

export default EvenColumn;
