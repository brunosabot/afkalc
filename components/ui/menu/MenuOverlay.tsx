import React from "react";
import styles from "./MenuOverlay.module.css";

interface IProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const MenuOverlay: React.FC<IProps> = ({ isActive, setIsActive }) => {
  return (
    <button
      className={`${styles.Overlay} ${isActive ? styles.Active : ""}`}
      onClick={() => setIsActive(false)}
      type="button"
      aria-label="Menu close overlay"
    />
  );
};

export default MenuOverlay;
