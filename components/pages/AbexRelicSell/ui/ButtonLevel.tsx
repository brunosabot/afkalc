import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./ButtonLevel.module.css";

type RelicLevel = 1 | 2 | 3 | 4 | 5;

interface Props {
  current: number;
  level: RelicLevel;
  onClick: (level: RelicLevel) => void;
}

const ButtonLevel: React.FC<Props> = function ButtonLevel({ level, current, onClick }) {
  const { t } = useTranslation("abex-relic-sell");
  const levelClass = styles[`Button--${level}`];
  const activeClass = level === current ? styles.Current : "";

  return (
    <button
      type="button"
      className={`${styles.Button} ${levelClass} ${activeClass}`}
      onClick={() => onClick(level)}
    >
      {t(`elevation-level-${level}`)}
    </button>
  );
};

export default ButtonLevel;
