import React from "react";
import Svg from "../Svg";
import styles from "./CardAction.module.css";

interface Props {
  onClick: () => void;
  icon?: string;
  children: React.ReactNode;
}

const CardAction: React.FC<Props> = function CardAction({ onClick, children, icon }) {
  return (
    <button type="button" className={styles.CardAction} onClick={onClick}>
      {icon ? <Svg d={icon} /> : null}

      {children}
    </button>
  );
};

export default CardAction;
