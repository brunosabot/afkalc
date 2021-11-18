import { mdiCircleSmall } from "@mdi/js";
import Link from "next/link";
import React from "react";
import Svg from "../Svg";
import styles from "./MenuItem.module.css";

interface IProps {
  children: React.ReactNode;
  to: string;
  icon?: string;
  className?: string;
}

const MenuItem: React.FC<IProps> = function MenuItem({
  className = "",
  children,
  to,
  icon = undefined,
}) {
  return (
    <Link href={to}>
      <a className={`${className} ${styles.Link}`}>
        <Svg d={icon === undefined ? mdiCircleSmall : icon} />

        {children}
      </a>
    </Link>
  );
};

export default MenuItem;
