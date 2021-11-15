import React from "react";
import styles from "./PrimaryText.module.css";

interface IProps {
  children: React.ReactNode;
}

const PrimaryText: React.FC<IProps> = function PrimaryText({ children }) {
  return <div className={styles.PrimaryText}>{children}</div>;
};

export default PrimaryText;
