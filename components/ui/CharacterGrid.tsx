import React from "react";
import styles from "./CharacterGrid.module.css";

interface IProps {
  size?: "large" | "normal" | "small";
  children: React.ReactNode;
}

const CharacterGrid: React.FC<IProps> = ({ children, size = "normal" }) => (
  <div className={`${styles.CharacterGrid} ${styles[`CharacterGrid--${size}`]}`}>{children}</div>
);

export default CharacterGrid;
