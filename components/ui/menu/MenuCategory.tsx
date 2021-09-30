import React from "react";
import styles from "./MenuCategory.module.css";

interface IProps {
  children: React.ReactNode;
}

const MenuCategory: React.FC<IProps> = ({ children }) => (
  <div className={styles.MenuCategory}>{children}</div>
);

export default MenuCategory;
