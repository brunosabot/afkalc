import React from "react";
import styles from "./CardTab.module.css";

interface IProps {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const CardTab: React.FC<IProps> = function CardTab({ active = false, children, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.CardTab} ${active ? styles.Active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CardTab;
