import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import styles from "./BuyMeACoffee.module.css";

interface IProps {
  [key: string]: never;
}

const BuyMeACoffee: React.FC<IProps> = () => {
  const { t } = useTranslation("common");
  const { values } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <span className={styles.Earning}>
        <span className={styles.Label}>{t("earnings")}</span>+{values.earning}&euro;
      </span>
      <a
        href="https://www.buymeacoffee.com/brunosabot"
        target="_blank"
        rel="noreferrer"
        className={styles.BuyMeACoffee}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
          alt="Buy Me A Coffee"
          className={styles.BuyMeACoffeeImage}
        />
      </a>
      <span className={styles.Spending}>
        <span className={styles.Label}>{t("spendings")}</span>-{values.spending}&euro;
      </span>
    </div>
  );
};

export default BuyMeACoffee;
