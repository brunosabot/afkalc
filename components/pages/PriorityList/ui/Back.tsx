import React from "react";
import { useTranslation } from "../../../../i18n";
import styles from "./Back.module.css";

interface Props {
  onDelete: ()=>void;
}

const Back: React.FC<Props> = ({onDelete}) => {
  const { t } = useTranslation("priority-list");

  return(
    <div className={styles.Back}>
      <a href="/priority-list" className={styles.Link}>
        <svg viewBox="0 0 24 24" className={styles.Icon}>
          <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>

        {t("label-back")}
      </a>

      <svg className={styles.Delete} viewBox="0 0 24 24" onClick={onDelete}>
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>
    </div>
  );
}

export default Back;
