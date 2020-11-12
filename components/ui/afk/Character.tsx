import React, { useCallback } from "react";
import styles from "./Character.module.css";

interface IProps {
  id: number;
  name: string;
  onClick?: (value: number) => void;
  highlight?: boolean;
}

const Character: React.FC<IProps> = ({ id, name, onClick, highlight = false }) => {
  const heroFileName = name.toLowerCase().replace(/[^a-z]/g, "");
  const clickWithId = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);

  return (
    <button
      type="button"
      className={`${styles.Character} ${highlight ? styles.Highlight : ""}`}
      onClick={clickWithId}
    >
      <img src={`/heroes/${heroFileName}.jpg`} className={styles.Image} alt={name} />
    </button>
  );
};

export default Character;
