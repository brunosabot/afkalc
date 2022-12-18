import { mdiContentCopy } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useCallback, useState } from "react";
import Svg from "../Svg";
import styles from "./CardShareNew.module.css";

interface IProps {
  children: string;
  shouldCopy?: boolean;
  style?: React.CSSProperties;
}

const CardShareNew: React.FC<IProps> = function CardShareNew({
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
      {copy ? <div className={styles.Copy}>{t("label-copied")}</div> : null}

      <div className={styles.Icon}>
        <Svg d={mdiContentCopy} />
      </div>
      <input readOnly className={styles.Content} onClick={onClick} value={children} style={style} />
    </div>
  );
};

export default CardShareNew;
