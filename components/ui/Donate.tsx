import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import styles from "./Donate.module.css";

interface IProps {
  [key: string]: never;
}

const Donate: React.FC<IProps> = function Donate() {
  const { t } = useTranslation("common");
  const { values } = useContext(FirebaseContext);

  return (
    <div className={styles.Wrapper}>
      <span className={styles.Earning}>
        <span className={styles.Label}>{t("earnings")}</span>+{values.earning}&euro;
      </span>
      <Link href="/donate">
        <a className={styles.Donate}>Donate</a>
      </Link>
      <span className={styles.Spending}>
        <span className={styles.Label}>{t("spendings")}</span>-{values.spending}&euro;
      </span>
    </div>
  );
};

export default Donate;
