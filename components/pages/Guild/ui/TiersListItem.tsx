import { mdiAccountCheck, mdiAccountRemove } from "@mdi/js";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import ListItem from "../../../ui/list/ListItem";
import styles from "./TiersListItem.module.css";

interface IProps {
  name?: string;
  percentage: number;
  heroName?: string;
  href: string;
  lastUpdate?: string;
}

const TiersListItem: React.FC<IProps> = function TiersListItem({
  href,
  name,
  percentage,
  heroName,
  lastUpdate,
}) {
  const lastUpdateAgo = useMemo(() => dayjs(new Date(lastUpdate ?? 0)).fromNow(), [lastUpdate]);

  return (
    <ListItem icon={percentage === 100 ? mdiAccountCheck : mdiAccountRemove} href={href}>
      <div className={styles.Title}>
        {name}
        {heroName !== "" ? <div className={styles.Subtitle}>{heroName}</div> : null}
      </div>

      {lastUpdate !== undefined ? <div className={styles.Update}>{lastUpdateAgo}</div> : null}

      <b className={styles.Value}>{percentage.toFixed()}%</b>
    </ListItem>
  );
};

export default TiersListItem;
