import { mdiAccountCancel, mdiAccountPlus } from "@mdi/js";
import React from "react";
import Svg from "../../../ui/Svg";
import styles from "./GuildListItem.module.css";

interface IProps {
  children: string;
  id: string;
  onApply: (id: string) => void;
  isApplied?: boolean;
}

const GuildListItem: React.FC<IProps> = function GuildListItem({
  children,
  id,
  onApply,
  isApplied = false,
}) {
  return (
    <div className={styles.GuildListItem}>
      <span className={styles.Name}>{children}</span>
      <Svg d={isApplied ? mdiAccountCancel : mdiAccountPlus} onClick={() => onApply(id)} />
    </div>
  );
};

export default GuildListItem;
