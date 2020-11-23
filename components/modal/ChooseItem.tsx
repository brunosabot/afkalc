import React from "react";
import resources from "../../data/resources.json";
import Item from "../ui/afk/Item";
import styles from "./ChooseItem.module.css";

interface Props {
  onSelect: (value: number) => void;
  current: number;
}

const ChooseItem: React.FC<Props> = ({ current, onSelect }) => {
  return (
    <div className={styles.ChooseItem}>
      {resources.map(({ id, image }) => (
        <Item key={id} id={id} image={image} onClick={onSelect} highlight={current === id} />
      ))}
    </div>
  );
};

export default ChooseItem;
