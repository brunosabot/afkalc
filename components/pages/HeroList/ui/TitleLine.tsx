import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./TitleLine.module.css";

interface IProps {
  [key: string]: never;
}

const TitleLine: React.FC<IProps> = function TitleLine() {
  const { t } = useTranslation("hero-list");

  return (
    <div className={styles.TitleLine}>
      <span className={styles.Image} />
      <div className={styles.Name} />
      <div className={styles.Label}>{t("label-si")}</div>
      <div className={styles.Label}>{t("label-fi")}</div>
      <div className={styles.Placeholder} />
    </div>
  );
};

export default React.memo(TitleLine);
