import React from "react";
import styles from "./MenuBurger.module.css";

interface IProps {
  setIsActive: (value: boolean) => void;
}

const MenuBurger: React.FC<IProps> = ({ setIsActive }) => {
  return (
    <svg className={styles.Burger} viewBox="0 0 24 24" onClick={() => setIsActive(true)}>
      <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>
  );
};

export default MenuBurger;
