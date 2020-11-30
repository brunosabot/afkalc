import React from "react";
import Item from "../../../ui/afk/Item";
import InputField from "../../../ui/InputField";
import useItem from "../hooks/useItem";
import ItemPicker from "./ItemPicker";
import styles from "./ResourceDetail.module.css";

interface Props {
  resource?: string;
  value?: number;
  onSelect: (value: string) => void;
  onValue: (value: string) => void;
  side: number;
}

const ResourceDetail: React.FC<Props> = ({ resource, value = 0, onSelect, onValue, side }) => {
  const { getItem } = useItem();

  const itemCost = getItem(resource).cost ?? 0;
  const cost = Math.round(100 * value * itemCost) / 100;

  return (
    <div className={styles.ResourceDetail}>
      <ItemPicker item={resource} onSelect={onSelect} />
      <InputField
        label=""
        value={value}
        onChange={(v) => onValue(v || "0")}
        disabled={resource === ""}
        name={`resource-count-${side}-${resource}`}
      />
      {cost <= 0 ? null : (
        <div className={styles.Cost}>
          <Item name="diamond" size="small" />
          &nbsp;
          {cost}
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
