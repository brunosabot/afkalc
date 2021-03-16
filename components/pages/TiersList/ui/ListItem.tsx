import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  href: string;
  children: React.ReactNode;
}

const ListItem: React.FC<IProps> = ({ href, children }) => (
  <a href={href} className={styles.ListItem}>
    {children}
  </a>
);

export default ListItem;
