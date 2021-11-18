import React from "react";
import styles from "./MenuBox.module.css";

interface IProps {
  children: React.ReactNode;
}

const MenuBox: React.FC<IProps> = function MenuBox({ children }) {
  return <div className={styles.MenuBox}>{children}</div>;
};

export default MenuBox;
