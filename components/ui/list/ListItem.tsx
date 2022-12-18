import Link from "next/link";
import React from "react";
import Svg from "../Svg";
import styles from "./ListItem.module.css";

interface IProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  icon?: string;
  href?: string;
}

const ListItem: React.FC<IProps> = function ListItem({ icon, children, actions, href }) {
  if (href !== undefined) {
    return (
      <Link href={href} passHref className={styles.ListItem}>
        {icon ? <Svg d={icon} /> : null}
        <div className={styles.ListItemTitle}>{children}</div>
        {actions ? <div className={styles.ListItemAction}>{actions}</div> : null}
      </Link>
    );
  }

  return (
    <span className={styles.ListItem}>
      {icon ? <Svg d={icon} /> : null}
      <div className={styles.ListItemTitle}>{children}</div>
      {actions ? <div className={styles.ListItemAction}>{actions}</div> : null}
    </span>
  );
};

export default ListItem;
