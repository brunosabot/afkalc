import React from "react";
import x23 from "./2x3.png";
import styles from "./Board.module.css";

interface Props {
  children: React.ReactNode;
}

const Board: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.BoardWrapper}>
      <img src={x23} className={styles.Placeholder} alt="" />
      <div className={styles.Content}>
        <div className={styles.Board}>{children}</div>
      </div>
    </div>
  );
};

export default Board;
