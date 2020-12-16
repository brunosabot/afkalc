import React from "react";
import styles from "./CardTitle.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<IProps> = ({ children }) => (
  <div className={styles.CardTitle}>{children}</div>
);

export default CardTitle;
