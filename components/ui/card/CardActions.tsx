import React from "react";
import styles from "./CardActions.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardActions: React.FC<IProps> = function CardActions({ children }) {
  return <div className={styles.CardActions}>{children}</div>;
};

export default CardActions;
