import React from "react";
import Svg from "../Svg";
import styles from "./CardTitle.module.css";

interface IProps {
  icon?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const CardTitle: React.FC<IProps> = ({ action = undefined, icon, children }) => (
  <div className={`${styles.CardTitle} ${action ? styles.HasAction : ""}`}>
    {icon ?<Svg d={icon} />:null}
    {children}
    <div className={styles.Action}>{action}</div>
  </div>
);

export default CardTitle;
