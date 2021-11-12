import React from "react";
import styles from "./Card.module.css";

interface IProps {
  children: React.ReactNode;
}

const Card: React.FC<IProps> = function Card({ children }) {
  return <div className={styles.Card}>{children}</div>;
};

export default Card;
