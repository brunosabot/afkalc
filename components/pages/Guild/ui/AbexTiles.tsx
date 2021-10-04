import { mdiChartLineVariant } from "@mdi/js";
import { useTranslation } from "next-i18next";
import React, { useContext } from "react";
import abexData from "../../../../data/abex.json";
import GuildContext from "../../../providers/GuildContext";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Svg from "../../../ui/Svg";
import styles from "./AbexTiles.module.css";

interface IProps {
  member: IFirebaseProfile;
}

const AbexTiles: React.FC<IProps> = ({ member }) => {
  const {
    values: { guild },
  } = useContext(GuildContext);

  /*
: {
        abexAwayTimeLimit,
        abexFarmLimit,
        abexTilesT1Limit,
        abexTilesT2Limit,
        abexTilesT3Limit,
        abexTilesT4Limit,
        abexTilesT5Limit,
        abexTilesT6Limit,
        abexTilesT7Limit,
        abexTilesT8Limit,
      }
*/

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

  const isFarmOverload = total > guild.abexFarmLimit;

  return (
    <div className={styles.Tiles}>
      {total ? (
        <span className={`${styles.EssenceCount} ${isFarmOverload ? styles.Overload : ""}`}>
          <Svg d={mdiChartLineVariant} />
          {total}
          {t("label-per-hour")}
        </span>
      ) : null}

      {Object.keys(tiles).map((tile) => {
        const tileId = +tile;

        if (tileId > 50) return null;
        if (tiles[tileId].amount === 0) return null;
        // @ts-ignore
        const isTileOverload = tiles[tileId].amount > guild[`abexTilesT${tile}Limit`];

        return (
          <React.Fragment key={tileId}>
            <span className={`${styles.TileLevel} ${isTileOverload ? styles.OverloadLevel : ""}`}>
              T{tileId}
            </span>
            <span className={isTileOverload ? styles.Overload : undefined}>
              {tiles[tileId].amount}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AbexTiles;
