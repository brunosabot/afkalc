import React from "react";
import resources from "../../data/resources.json";
import Item from "../ui/afk/Item";
import styles from "./ChooseItem.module.css";

interface Props {
  onSelect: (value: string) => void;
  current: string;
}

const ChooseItem: React.FC<Props> = function ChooseItem({ current, onSelect }) {
  return (
    <div className={styles.ChooseItem}>
      {resources
        .filter((r) => r.cost !== undefined)
        .map(({ name, info, secondaryInfo }) => (
          <Item
            key={name}
            infos={info}
            name={name}
            secondaryInfos={secondaryInfo}
            onClick={() => onSelect(name)}
            highlight={current === name}
            size="large"
          />
        ))}
    </div>
  );
};

export default ChooseItem;
