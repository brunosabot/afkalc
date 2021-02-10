import React from "react";
import styles from "./List.module.css";

interface IProps {
  children: React.ReactNode;
}

const List: React.FC<IProps> = ({ children }) => <div className={styles.List}>{children}</div>;

export default List;
