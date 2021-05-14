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

const ListItem: React.FC<IProps> = ({ icon, children, actions, href }) => {
  const content = (
    <a href={href} className={styles.ListItem}>
      {icon ? <Svg d={icon} /> : null}
      <div className={styles.ListItemTitle}>{children}</div>
      {actions ? <div className={styles.ListItemAction}>{actions}</div> : null}
    </a>
  );

  if (href) {
    <Link href={href}>{content}</Link>;
  }

  return content;
};

export default ListItem;
