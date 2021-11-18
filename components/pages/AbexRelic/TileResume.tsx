import { mdiCity } from "@mdi/js";
import React, { useContext } from "react";
import ProfileContext from "../../providers/ProfileContext";
import Svg from "../../ui/Svg";
import styles from "./TileResume.module.css";

interface IProps {
  [key: string]: never;
}

const TileResume: React.FC<IProps> = function TileResume() {
  const { values } = useContext(ProfileContext);

  const totalCities = Object.values(values.abexTiles).reduce((acc, tile) => acc + tile.amount, 0);

  return (
    <div className={styles.Tiles}>
      {totalCities ? (
        <span className={styles.TilesCount}>
          <Svg d={mdiCity} />
          {totalCities}
        </span>
      ) : null}

      {Object.keys(values.abexTiles).map((tile) => {
        const tileId = +tile;

        if (values.abexTiles[tileId].amount === 0) return null;

        return (
          <React.Fragment key={tileId}>
            <span className={styles.TileLevel}>
              {tileId > 50 ? "P" : "T"}
              {tileId > 50 ? 100 - tileId : tileId}
            </span>
            {values.abexTiles[tileId].amount}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TileResume;
