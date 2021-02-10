import React from "react";
import Svg from "../Svg";
import styles from "./CardAction.module.css";

interface Props {
  onClick: () => void;
  icon?: string;
}

const CardAction: React.FC<Props> = ({ onClick, children, icon }) => (
  <button type="button" className={styles.CardAction} onClick={onClick}>
    {icon ? (
      <Svg d={icon} />
    ) : null}

    {children}
  </button>
);

export default CardAction;
