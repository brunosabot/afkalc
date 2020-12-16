import Link from "next/link";
import React from "react";
import styles from "./MenuToolbarLink.module.css";

interface IProps {
  children: React.ReactNode;
  image: string;
  to: string;
}

const MenuToolbarLink: React.FC<IProps> = ({ image, children, to }) => (
  <Link href={to}>
    <div className={styles.MenuToolbarLink}>
      <img
        src={image}
        style={{ width: "30px", marginBottom: "4px", borderRadius: "16px" }}
        alt=""
      />
      {children}
    </div>
  </Link>
);

export default MenuToolbarLink;
