import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./RelicFilter.module.css";

interface Props {
  onClick: (value: number) => void;
  level: number;
  isActive?: boolean;
}

const RelicFilter: React.FC<Props> = function RelicFilter({ isActive = false, level, onClick }) {
  const { t } = useTranslation("abex-relic-sell");

  return (
    <button
      type="button"
      className={`${styles.RelicFilter} ${styles[`RelicFilter--${level}`]} ${
        isActive ? styles.Active : ""
      }`}
      onClick={() => onClick(level)}
    >
      {t(`elevation-level-${level}`)}
    </button>
  );
};

export default RelicFilter;
