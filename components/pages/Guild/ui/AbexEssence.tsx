import { mdiChartLineVariant } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import { IGuildGuild } from "../../../providers/GuildContext";
import Svg from "../../../ui/Svg";
import styles from "./AbexTiles.module.css";

interface IProps {
  total: number;
  guild: IGuildGuild;
}

const AbexEssence: React.FC<IProps> = function AbexEssence({ total, guild }) {
  const { t } = useTranslation("guild");

  const isFarmOverload = total > guild.abexFarmLimit;

  return total ? (
    <span className={`${styles.EssenceCount} ${isFarmOverload ? styles.Overload : ""}`}>
      <Svg d={mdiChartLineVariant} />
      {total}
      {t("label-per-hour")}
    </span>
  ) : null;
};

export default AbexEssence;
