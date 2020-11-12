import React, { useState } from "react";
import { useTranslation } from "../../../../i18n";
import CardTitle from "../../../ui/card/CardTitle";
import styles from "./ShareBanner.module.css";

interface IData {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
}

interface IProps {
  data: IData;
}

const ShareBanner: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation("top-team");
  const [copy, setCopy] = useState(false);

  const d1 = String.fromCharCode((data[1] || 0) + 48);
  const d2 = String.fromCharCode((data[2] || 0) + 48);
  const d3 = String.fromCharCode((data[3] || 0) + 48);
  const d4 = String.fromCharCode((data[4] || 0) + 48);
  const d5 = String.fromCharCode((data[5] || 0) + 48);
  const d6 = String.fromCharCode((data[6] || 0) + 48);
  const code = encodeURIComponent(`${d1}${d2}${d3}${d4}${d5}${d6}`);
  const value = `https://afkalc.heycoucou.com/top-team/${code}`;

  return (
    <CardTitle>
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="20" viewBox="0 0 300 20">
        <text x="3" y="16" className={styles.Label}>
          {t("label-share")}
        </text>
      </svg>

      {copy ? (
        <svg
          className={styles.Copy}
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="20"
          viewBox="0 0 100 20"
        >
          <text x="3" y="16" className={styles.Label}>
            {t("label-copied")}
          </text>
        </svg>
      ) : null}
      <input
        className={styles.Input}
        onClick={(e) => {
          (e.target as HTMLInputElement).select();
          document.execCommand("copy");
          setCopy(true);
          setTimeout(() => setCopy(false), 3000);
        }}
        value={value}
        readOnly
      />
    </CardTitle>
  );
};

export default ShareBanner;
