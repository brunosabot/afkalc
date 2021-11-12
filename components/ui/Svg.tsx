import React from "react";
import styles from "./Svg.module.css";

interface IProps {
  d: string;
  onClick?: () => void;
}

const Svg: React.FC<IProps> = function Svg({ d, onClick = undefined }) {
  return (
    <svg
      className={`${styles.Svg} ${onClick ? styles.OnClick : ""}`}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path fill="currentColor" d={d} />
    </svg>
  );
};

export default Svg;
