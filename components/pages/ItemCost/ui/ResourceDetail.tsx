import React from "react";
import { useTranslation } from "react-i18next";
import useItem from "../hooks/useItem";
import ItemPicker from "./ItemPicker";
import styles from "./ResourceDetail.module.css";

interface Props {
  resource?: number;
  value?: number;
  onSelect: (value: number) => void;
  onValue: (value: number) => void;
}

const ResourceDetail: React.FC<Props> = ({ resource, value = 0, onSelect, onValue }) => {
  const { t } = useTranslation("item-cost");
  const { getItem } = useItem();

  const cost = Math.round(100 * value * (getItem(resource) || { cost: 0 }).cost) / 100;

  return (
    <div className={styles.ResourceDetail}>
      <ItemPicker item={resource} onSelect={onSelect} />
      <input
        className={styles.Input}
        value={value}
        onChange={(e) => onValue(parseInt(e.target.value || "0", 10))}
      />
      {cost <= 0 ? null : (
        <div className={styles.Cost}>
          <img className={styles.Diamond} src="/loot/diamond.jpg" />
          {cost}
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
