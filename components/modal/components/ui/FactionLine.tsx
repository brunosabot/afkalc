import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import styles from "./FactionLine.module.css";

interface IProps {
  name: string;
}

const FactionLine: React.FC<IProps> = function FactionLine({ name }) {
  const { t } = useTranslation("hero-list");
  const fileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div className={styles.Faction}>
      <Image
        className={styles.Image}
        src={`/factions/${fileName}.png`}
        alt={name}
        height={64}
        width={64}
      />
      <div className={styles.Name}>{t(`faction-${name}`)}</div>
    </div>
  );
};

export default FactionLine;
