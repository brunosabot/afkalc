import React from "react";
import styles from "./SecondaryText.module.css";

interface IProps {
  children: React.ReactNode;
}

const SecondaryText: React.FC<IProps> = function SecondaryText({ children }) {
  return <div className={styles.SecondaryText}>{children}</div>;
};

export default SecondaryText;
