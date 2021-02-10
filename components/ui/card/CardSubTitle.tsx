import React from "react";
import styles from "./CardSubTitle.module.css";

interface IProps {
  children: React.ReactNode;
}

const CardSubTitle: React.FC<IProps> = ({ children }) => (
  <div className={styles.CardSubTitle}>{children}</div>
);

export default CardSubTitle;
