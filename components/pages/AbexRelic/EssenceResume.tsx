import { mdiChartLineVariant } from "@mdi/js";
import { TFunction, useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import abexData from "../../../data/abex.json";
import ProfileContext from "../../providers/ProfileContext";
import InputField from "../../ui/InputField";
import Svg from "../../ui/Svg";
import styles from "./EssenceResume.module.css";

interface IProps {
  [key: string]: never;
}

function formatTime(sec: number, t: TFunction) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60);

  const hoursText = hours ? `${hours}${t("label-h")}` : "";
  const minutesText = minutes ? `${minutes}${t("label-m")}` : "";
  const secondsText = seconds ? `${seconds}${t("label-s")}` : "";

  return `${hoursText} ${minutesText} ${secondsText}`;
}

const EssenceResume: React.FC<IProps> = function EssenceResume() {
  const { t } = useTranslation("abex-relic");
  const { values } = useContext(ProfileContext);
  const [target, setTarget] = useState(0);

  const total = abexData.campType.reduce((acc, camp) => {
    const amount = values.abexTiles[camp.id]?.amount ?? 0;
    const garrison = values.abexTiles[camp.id]?.garrison ?? 0;

    return (
      acc +
      amount * camp.essencePerHour +
      (garrison * camp.essencePerHour * camp.essenceBonusPercentage) / 100
    );
  }, 0);

  return total ? (
    <span className={styles.EssenceCount}>
      <Svg d={mdiChartLineVariant} />
      {total}
      {t("label-per-hour")}

      <InputField
        label=""
        name="target"
        small
        placeholder={t("target") as string}
        style={{ width: "70px", marginLeft: "16px" }}
        value={target}
        maxLength={7}
        onChange={(value) => setTarget(Number(value))}
      />

      {formatTime((target / total) * 3600, t)}
    </span>
  ) : null;
};

export default EssenceResume;
