import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./FactionLine.module.css";

interface IProps {
  name: string;
}

const FactionLine: React.FC<IProps> = ({ name }) => {
  const { t } = useTranslation("hero-list");
  const fileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className={styles.Faction}>
      <img className={styles.Image} src={`/factions/${fileName}.png`} alt={name} />
      <div className={styles.Name}>{t(`faction-${name}`)}</div>
    </div>
  );
};

export default FactionLine;
