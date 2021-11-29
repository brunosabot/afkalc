import React from "react";
import { IGuildGuild } from "../../../providers/GuildContext";
import { IFirebaseAbyssalExpeditionTilesList } from "../../../providers/types/IFirebaseAbyssalExpedition";
import styles from "./AbexTiles.module.css";

interface IProps {
  guild: IGuildGuild;
  tiles: IFirebaseAbyssalExpeditionTilesList;
  tile: string;
}

const AbexTile: React.FC<IProps> = function AbexTile({ guild, tiles, tile }) {
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
      <span className={isTileOverload ? styles.Overload : undefined}>{tiles[tileId].amount}</span>
    </React.Fragment>
  );
};

export default AbexTile;
