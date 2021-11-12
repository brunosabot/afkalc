import React from "react";
import styles from "./Preview.module.css";

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Preview: React.FC<IProps> = function Preview({ onClick, children }) {
  return (
    <button type="button" className={styles.Preview} onClick={onClick}>
      {children}
    </button>
  );
};

export default Preview;
