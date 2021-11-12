import { mdiCheckBold, mdiCloseThick } from "@mdi/js";
import React from "react";
import Svg from "../../../ui/Svg";
import styles from "./ApplicationListItem.module.css";

interface IProps {
  children: string;
  id: string;
  onReject: (id: string) => void;
  onAccept: (id: string) => void;
}

const ApplicationListItem: React.FC<IProps> = function ApplicationListItem({
  children,
  id,
  onReject,
  onAccept,
}) {
  return (
    <div className={styles.ApplicationListItem}>
      <span className={styles.Name}>{children}</span>
      <Svg d={mdiCloseThick} onClick={() => onReject(id)} />
      <Svg d={mdiCheckBold} onClick={() => onAccept(id)} />
    </div>
  );
};

export default ApplicationListItem;
