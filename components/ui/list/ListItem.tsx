import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  children: React.ReactNode;
  actions: React.ReactNode;
}

const ListItem: React.FC<IProps> = ({ children, actions }) => (
  <div className={styles.ListItem}>
    {children}
    <div className={styles.ListItemAction}>{actions}</div>
  </div>
);

export default ListItem;
