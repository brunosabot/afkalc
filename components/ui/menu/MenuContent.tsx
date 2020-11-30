import React from "react";
import styles from "./MenuContent.module.css";

interface IProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  children: React.ReactNode;
}

const MenuContent: React.FC<IProps> = ({ isActive, setIsActive, children }) => {
  return (
    <div
      className={`${styles.Content} ${isActive ? styles.Active : ""}`}
      onClick={() => setIsActive(false)}
      role="button"
      tabIndex={-1}
      onKeyPress={() => setIsActive(false)}
    >
      {children}
    </div>
  );
};

export default MenuContent;
