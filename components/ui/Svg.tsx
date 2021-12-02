import React from "react";
import styles from "./Svg.module.css";

interface IProps {
  d: string;
  onClick?: () => void;
  className?: string;
}

const Svg: React.FC<IProps> = function Svg({ className = "", d, onClick = undefined }) {
  return (
    <svg
      className={`${styles.Svg} ${onClick ? styles.OnClick : ""} ${className}`}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path fill="currentColor" d={d} />
    </svg>
  );
};

export default Svg;
