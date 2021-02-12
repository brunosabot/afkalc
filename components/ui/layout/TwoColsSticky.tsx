import React from "react";
import styles from "./TwoColsSticky.module.css";

interface IProps {
  children: React.ReactNode;
}

const TwoColsSticky: React.FC<IProps> = ({ children }) => (
  <div className={styles.TwoColsSticky}>{children}</div>
);

export default TwoColsSticky;
