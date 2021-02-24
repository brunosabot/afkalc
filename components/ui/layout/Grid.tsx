import React from "react";
import styles from "./Grid.module.css";

interface IProps {
  children: React.ReactNode;
}

const Grid: React.FC<IProps> = ({ children }) => <div className={styles.Grid}>{children}</div>;

export default Grid;
