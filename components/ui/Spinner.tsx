import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Spinner.module.css";

interface Props {
  [key: string]: never;
}

const Spinner: React.FC<Props> = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.Wrapper}>
      {t("loading")}
      <div className={styles.Spinner} />
    </div>
  );
};

export default Spinner;
