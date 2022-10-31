import React from "react";
import styles from "./PetGrid.module.css";

interface IProps {
  size?: "large" | "normal" | "small";
  children: React.ReactNode;
}

const PetGrid: React.FC<IProps> = function PetGrid({ children, size = "normal" }) {
  return <div className={`${styles.PetGrid} ${styles[`PetGrid--${size}`]}`}>{children}</div>;
};

export default PetGrid;
