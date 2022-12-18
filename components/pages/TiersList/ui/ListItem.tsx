import Link from "next/link";
import React from "react";
import styles from "./ListItem.module.css";

interface IProps {
  href: string;
  children: React.ReactNode;
}

const ListItem: React.FC<IProps> = function ListItem({ href, children }) {
  return (
    <Link href={href} className={styles.ListItem}>
      {children}
    </Link>
  );
};

export default ListItem;
