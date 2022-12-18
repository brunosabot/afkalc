import { useTranslation } from "next-i18next";
import React, { useCallback, useState } from "react";
import styles from "./CardShare.module.css";

interface IProps {
  label: string;
  children: string;
  shouldCopy?: boolean;
  style?: React.CSSProperties;
}

const CardShare: React.FC<IProps> = function CardShare({
  label,
  children,
  shouldCopy = true,
  style = {},
}) {
  const { t } = useTranslation("common");
  const [copy, setCopy] = useState(false);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (shouldCopy) {
        (event.target as HTMLInputElement).select();
        document.execCommand("copy");
        setCopy(true);
        setTimeout(() => setCopy(false), 3000);
      }
    },
    [setCopy, shouldCopy]
  );

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Title}>{label}</div>

      {copy ? <div className={styles.Copy}>{t("label-copied")}</div> : null}

      <input readOnly className={styles.Content} onClick={onClick} value={children} style={style} />
    </div>
  );
};

export default CardShare;
