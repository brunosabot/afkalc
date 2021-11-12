import React from "react";
import styles from "./FlexGap.module.css";

interface IProps {
  children: React.ReactNode;
  gap: number;
}

const FlexGap: React.FC<IProps> = function FlexGap({ children, gap = 0 }) {
  return (
    <div className={styles.FlexGap} style={{ gap: `${gap}px` }}>
      {children}
    </div>
  );
};

export default FlexGap;
