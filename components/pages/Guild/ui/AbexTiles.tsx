import { mdiChartLineVariant } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React from "react";
import abexData from "../../../../data/abex.json";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Svg from "../../../ui/Svg";
import styles from "./AbexTiles.module.css";

interface IProps {
  member: IFirebaseProfile;
}

const AbexTiles: React.FC<IProps> = ({ member }) => {
  const { t } = useTranslation("guild");

  const total = abexData.campType.reduce((acc, camp) => {
    const amount = member.abexTiles?.[camp.id]?.amount ?? 0;
    const garrison = member.abexTiles?.[camp.id]?.garrison ?? 0;

    return (
      acc +
      amount * camp.essencePerHour +
      (garrison * camp.essencePerHour * camp.essenceBonusPercentage) / 100
    );
  }, 0);

  const tiles = member.abexTiles ?? {};

  return (
    <div className={styles.Tiles}>
      {total ? (
        <span className={styles.EssenceCount}>
          <Svg d={mdiChartLineVariant} />
          {total}
          {t("label-per-hour")}
        </span>
      ) : null}

      {Object.keys(tiles).map((tile) => {
        const tileId = +tile;

        if (tileId > 50) return null;
        if (tiles[tileId].amount === 0) return null;

        return (
          <React.Fragment key={tileId}>
            <span className={styles.TileLevel}>T{tileId}</span>
            {tiles[tileId].amount}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AbexTiles;
