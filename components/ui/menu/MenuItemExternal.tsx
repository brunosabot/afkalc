import { mdiCircleSmall } from "@mdi/js";
import React from "react";
import Svg from "../Svg";
import styles from "./MenuItemExternal.module.css";

interface IProps {
  children: React.ReactNode;
  to: string;
  icon?: string;
}

const MenuItemExternal: React.FC<IProps> = function MenuItemExternal({
  children,
  to,
  icon = undefined,
}) {
  return (
    <a className={styles.Link} href={to} target="__blank">
      <Svg d={icon === undefined ? mdiCircleSmall : icon} />

      {children}
    </a>
  );
};

export default MenuItemExternal;
