import React from "react";
import Svg from "../../../ui/Svg";
import styles from "./RelicPlus.module.css";

interface Props {
  show: boolean;
  onClick: () => void;
  icon: string;
}

const RelicPlus: React.FC<Props> = function RelicPlus({ icon, show, onClick }) {
  if (show) {
    return (
      <button type="button" className={styles.RelicPlus} onClick={onClick}>
        <Svg d={icon} />
      </button>
    );
  }

  return <span className={styles.RelicPlus} />;
};

export default RelicPlus;
