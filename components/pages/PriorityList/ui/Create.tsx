import React from "react";
import { useTranslation } from "../../../../i18n";
import styles from "./Create.module.css";

interface Props {
  onClick: () => void
}

const Create: React.FC<Props> = ({onClick}) => {
  const { t } = useTranslation("priority-list");

  return(
    <button type="button" className={styles.Create} onClick={onClick}>
      <svg viewBox="0 0 24 24" style={{width: "24px", marginRight: "16px"}}>
        <path fill="currentColor" d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z" />
      </svg>

      {t("label-add")}
    </button>
);
}

export default Create;
