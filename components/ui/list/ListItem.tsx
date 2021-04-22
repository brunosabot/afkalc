import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ListItem: React.FC<IProps> = ({ children, actions }) => (
  <div className={styles.ListItem}>
    {children}
    {actions ? <div className={styles.ListItemAction}>{actions}</div> : null}
  </div>
);

export default ListItem;
