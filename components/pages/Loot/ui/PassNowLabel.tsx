import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "../../../../i18n";
import styles from "./PassNowLabel.module.css";

interface IProps {
  setPass: (value: string) => void;
}

const PassNowLabel: React.FC<IProps> = ({ setPass }) => {
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
