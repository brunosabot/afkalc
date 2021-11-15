import { mdiChartLineVariant } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import abexData from "../../../data/abex.json";
import ProfileContext from "../../providers/ProfileContext";
import Svg from "../../ui/Svg";
import styles from "./EssenceResume.module.css";

interface IProps {
  [key: string]: never;
}

const EssenceResume: React.FC<IProps> = function EssenceResume() {
  const { t } = useTranslation("abex-relic");
  const { values } = useContext(ProfileContext);

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
    </span>
  ) : null;
};

export default EssenceResume;
