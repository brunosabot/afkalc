import React from "react";
import styles from "./MenuToolbar.module.css";

interface IProps {
  children: React.ReactNode;
}

const MenuToolbar: React.FC<IProps> = ({ children }) => (
  <div className={styles.Wrapper}>
    <div className={styles.Toolbar}>{children}</div>
  </div>
);

export default MenuToolbar;
