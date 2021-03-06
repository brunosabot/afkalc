import React from "react";
import styles from "./FlexGap.module.css";

interface IProps {
  children: React.ReactNode;
  gap: number;
}

const FlexGap: React.FC<IProps> = ({ children, gap = 0 }) => (
  <div className={styles.FlexGap} style={{ gap: `${gap}px` }}>
    {children}
  </div>
);

export default FlexGap;
