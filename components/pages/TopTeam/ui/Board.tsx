import React from "react";
import styles from "./Board.module.css";

interface Props {
  children: React.ReactNode;
}

const Board: React.FC<Props> = ({ children }) => (
  <div className={styles.BoardWrapper}>
    <img src="/2x3.png" className={styles.Placeholder} alt="" />
    <div className={styles.Content}>
      <div className={styles.Board}>{children}</div>
    </div>
  </div>
);

export default Board;
