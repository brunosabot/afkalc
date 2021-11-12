import React from "react";
import styles from "./CardWarn.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardWarn: React.FC<IProps> = function CardWarn({ children }) {
  return <div className={styles.CardWarn}>{children}</div>;
};

export default CardWarn;
