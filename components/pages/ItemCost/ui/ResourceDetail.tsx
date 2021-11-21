import { mdiDelete } from "@mdi/js";
import React from "react";
import Item from "../../../ui/afk/Item";
import InputField from "../../../ui/InputField";
import Svg from "../../../ui/Svg";
import useItem from "../hooks/useItem";
import ItemPicker from "./ItemPicker";
import styles from "./ResourceDetail.module.css";

interface Props {
  resource?: string;
  value?: number;
  onDelete: () => void;
  onSelect: (value: string) => void;
  onValue: (value: string) => void;
  side: number;
}

const ResourceDetail: React.FC<Props> = function ResourceDetail({
  resource,
  value = 0,
  onSelect,
  onValue,
  onDelete,
  side,
}) {
  const { getItem } = useItem();

  const itemCost = getItem(resource).cost ?? 0;
  const cost = Math.round(100 * value * itemCost) / 100;

  return (
    <div className={styles.ResourceDetail}>
      <ItemPicker item={resource} onSelect={onSelect} />
      <InputField
        small
        label=""
        value={value}
        onChange={(v) => onValue(v || "0")}
        name={`resource-count-${side}-${resource}`}
        style={{ width: "90px" }}
      />
      <div className={styles.Cost}>
        {cost <= 0 ? null : (
          <>
            <Item name="diamond" size="small" />
            {cost}
          </>
        )}
      </div>
      <Svg d={mdiDelete} onClick={onDelete} />
    </div>
  );
};

export default ResourceDetail;
