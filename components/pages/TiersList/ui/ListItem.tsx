import Link from "next/link";
import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  href: string;
  children: React.ReactNode;
}

const ListItem: React.FC<IProps> = ({ href, children }) => (
  <Link href={href}>
    <a className={styles.ListItem}>{children}</a>
  </Link>
);

export default ListItem;
