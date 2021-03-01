import React from "react";
import styles from "./EvenColumn.module.css";

interface IProps {
  children: React.ReactNode;
}

const EvenColumn: React.FC<IProps> = ({ children }) => (
  <div className={styles.EvenColumn}>{children}</div>
);

export default EvenColumn;
