import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./MenuToolbarLink.module.css";

interface IProps {
  children: React.ReactNode;
  image: string;
  to: string;
}

const MenuToolbarLink: React.FC<IProps> = function MenuToolbarLink({ image, children, to }) {
  return (
    <Link href={to} className={styles.MenuToolbarLink}>
      <Image
        src={image}
        style={{ marginBottom: "4px", borderRadius: "16px" }}
        alt=""
        height={30}
        width={30}
      />
      {children}
    </Link>
  );
};

export default MenuToolbarLink;
