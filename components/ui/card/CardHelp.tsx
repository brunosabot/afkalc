import React from "react";
import styles from "./CardHelp.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardHelp: React.FC<IProps> = function CardHelp({ children }) {
  return <div className={styles.CardHelp}>{children}</div>;
};

export default CardHelp;
