import React, { useContext } from "react";
import HeroClass from "../../../../types/HeroClass";
import GuildContext from "../../../providers/GuildContext";
import ListItem from "../../../ui/list/ListItem";
import styles from "./TabAbex.module.css";

interface IProps {
  [key: string]: never;
}

function reduceRank(acc: [number, number], value: number): [number, number] {
  const rank = Math.floor(value / 1000);
  if (acc[0] < rank) {
    return [rank, 1];
  }
  if (acc[0] === rank) {
    return [rank, acc[1] + 1];
  }
  return acc;
}

const defaultRank: [number, number] = [0, 0];

const TabAbex: React.FC<IProps> = () => {
  const { values } = useContext(GuildContext);

  return (
    <div>
      {values.members.map((member) => {
        const ranks = {
          mage: member.abexCurrentRelics?.mage.reduce(reduceRank, defaultRank) ?? [0, 0],
          ranger: member.abexCurrentRelics?.ranger.reduce(reduceRank, defaultRank) ?? [0, 0],
          support: member.abexCurrentRelics?.support.reduce(reduceRank, defaultRank) ?? [0, 0],
          tank: member.abexCurrentRelics?.tank.reduce(reduceRank, defaultRank) ?? [0, 0],
          warrior: member.abexCurrentRelics?.warrior.reduce(reduceRank, defaultRank) ?? [0, 0],
        };

        const tiles = member.abexTiles ?? {};

        return (
          <ListItem key={member.id}>
            {member.playerName}

            <div className={styles.Values}>
              <div className={styles.ClassList}>
                {Object.keys(HeroClass).map((key) => {
                  const className = key as HeroClass;
                  const [level, amount] = ranks[className];

                  if (level === 0) return null;

                  return (
                    <React.Fragment key={className}>
                      <img
                        className={styles.Class}
                        src={`/classes/${className}.png`}
                        alt={`${className}`}
                      />
                      {level}.{amount}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className={styles.Tiles}>
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
            </div>
          </ListItem>
        );
      })}
    </div>
  );
};

export default TabAbex;
