import React from "react";
import styles from "./MenuItemExternal.module.css";

interface IProps {
  children: React.ReactNode;
  to: string;
  icon?: string;
}

const MenuItemExternal: React.FC<IProps> = ({ children, to, icon }) => (
  <a className={styles.Link} href={to} target="__blank">
    <svg className={styles.Icon} viewBox="0 0 24 24">
      <path fill="currentColor" d={icon} />
    </svg>
    {children}
  </a>
);

export default MenuItemExternal;
