import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./PassNowLabel.module.css";

interface IProps {
  setPass: (value: string) => void;
}

const PassNowLabel: React.FC<IProps> = function PassNowLabel({ setPass }) {
  const { t } = useTranslation("loot");

  return (
    <span className={styles.PassNowLabel}>
      {t("label-stage-date")}
      <button type="button" onClick={() => setPass(dayjs().format("L LTS"))} className={styles.Now}>
        {t("label-stage-now")}
      </button>
    </span>
  );
};

export default PassNowLabel;
