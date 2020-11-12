import React, { useCallback } from "react";
import styles from "./Enemi.module.css";

interface IProps {
  id: number;
  name: string;
  onClick?: (value: number) => void;
  highlight?: boolean;
  image?: string;
}

const Enemi: React.FC<IProps> = ({ image, id, name, onClick, highlight = false }) => {
  const enemiFileName = image || `${name.toLowerCase().replace(/[^a-z]/g, "")}.jpg`;
  const clickWithId = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);

  return (
    <button
      type="button"
      className={`${styles.Enemi} ${highlight ? styles.Highlight : ""}`}
      onClick={clickWithId}
    >
      <img src={`/enemies/${enemiFileName}`} className={styles.Image} alt={name} />
    </button>
  );
};

export default Enemi;
