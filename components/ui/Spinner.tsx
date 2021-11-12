import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./Spinner.module.css";

interface Props {
  [key: string]: never;
}

const Spinner: React.FC<Props> = function Spinner() {
  const { t } = useTranslation("common");
  return (
    <div className={styles.Wrapper}>
      {t("loading")}
      <div className={styles.Spinner} />
    </div>
  );
};

export default Spinner;
