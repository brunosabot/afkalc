import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  children: React.ReactNode;
}

const ListItem: React.FC<IProps> = ({ children }) => (
  <div className={styles.ListItem}>
    {children}
  </div>
);

export default ListItem;
