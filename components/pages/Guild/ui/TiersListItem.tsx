import { mdiAccountCheck, mdiAccountRemove } from "@mdi/js";
import React from "react";
import ListItem from "../../../ui/list/ListItem";
import styles from "./TiersListItem.module.css";

interface IProps {
  name?: string;
  percentage: number;
  heroName?: string;
  href: string;
}

const TiersListItem: React.FC<IProps> = ({ href, name, percentage, heroName }) => (
  <ListItem icon={percentage === 100 ? mdiAccountCheck : mdiAccountRemove} href={href}>
    <div className={styles.Title}>
      {name}
      {heroName !== "" ? <div className={styles.Subtitle}>{heroName}</div> : null}
    </div>
    <b>{percentage.toFixed()}%</b>
  </ListItem>
);

export default TiersListItem;
