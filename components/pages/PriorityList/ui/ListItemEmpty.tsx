import React from "react";
import styles from "./ListItemEmpty.module.css";

interface IProps {
  children: React.ReactNode;
}

const ListItemEmpty: React.FC<IProps> = ({ children }) => (
  <div className={styles.ListItemEmpty}>{children}</div>
);

export default ListItemEmpty;
