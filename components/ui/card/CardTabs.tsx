import React from "react";
import styles from "./CardTabs.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardTabs: React.FC<IProps> = function CardTabs({ children }) {
  return <div className={styles.CardTabs}>{children}</div>;
};

export default CardTabs;
