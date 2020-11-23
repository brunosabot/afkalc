import React, { useCallback } from "react";
import styles from "./Item.module.css";

interface IProps {
  id: number;
  image: string;
  onClick?: (value: number) => void;
  highlight?: boolean;
}

const Item: React.FC<IProps> = ({ id, image, onClick, highlight = false }) => {
  const clickWithId = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);

  return (
    <button
      type="button"
      className={`${styles.Item} ${highlight ? styles.Highlight : ""}`}
      onClick={clickWithId}
    >
      <img src={image} className={styles.Image} alt={name} />
    </button>
  );
};

export default Item;
