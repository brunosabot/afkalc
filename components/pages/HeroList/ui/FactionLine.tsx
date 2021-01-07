import React from "react";
import { useTranslation } from "../../../../i18n";
import styles from "./FactionLine.module.css";

interface IProps {
  name: string;
}

const FactionLine: React.FC<IProps> = ({ name }) => {
  const { t } = useTranslation("hero-list");
  const fileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className={styles.FactionLine}>
      <img className={styles.Image} src={`/factions/${fileName}.png`} alt={name} />
      <div className={styles.Name}>{t(`faction-${name}`)}</div>
      <div className={styles.Label}>{t("label-si")}</div>
      <div className={styles.Label}>{t("label-inn")}</div>
      <div className={styles.Placeholder} />
    </div>
  );
};

export default FactionLine;
