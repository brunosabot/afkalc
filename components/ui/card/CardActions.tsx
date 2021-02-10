import React from "react";
import styles from "./CardActions.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardActions: React.FC<IProps> = ({ children }) => (
  <div className={styles.CardActions}>{children}</div>
);

export default CardActions;
