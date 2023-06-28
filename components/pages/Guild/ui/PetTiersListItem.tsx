import { mdiAccountCheck, mdiAccountRemove } from "@mdi/js";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import ListItem from "../../../ui/list/ListItem";
import styles from "./PetTiersListItem.module.css";

interface IProps {
  name?: string;
  percentage: number;
  petName?: string;
  href: string;
  lastUpdate?: string;
}

const PetTiersListItem: React.FC<IProps> = function PetTiersListItem({
  href,
  name,
  percentage,
  petName,
  lastUpdate,
}) {
  const lastUpdateAgo = useMemo(() => dayjs(new Date(lastUpdate ?? 0)).fromNow(), [lastUpdate]);

  return (
    <ListItem icon={percentage === 100 ? mdiAccountCheck : mdiAccountRemove} href={href}>
      <div className={styles.Title}>
        {name}
        {petName !== "" ? <div className={styles.Subtitle}>{petName}</div> : null}
      </div>

      {lastUpdate !== undefined ? <div className={styles.Update}>{lastUpdateAgo}</div> : null}

      <b className={styles.Value}>{percentage.toFixed()}%</b>
    </ListItem>
  );
};

export default PetTiersListItem;
