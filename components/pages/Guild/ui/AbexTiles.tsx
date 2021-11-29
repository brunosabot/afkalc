import React, { useContext } from "react";
import abexData from "../../../../data/abex.json";
import GuildContext from "../../../providers/GuildContext";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import AbexEssence from "./AbexEssence";
import AbexTile from "./AbexTile";
import styles from "./AbexTiles.module.css";

interface IProps {
  member: IFirebaseProfile;
}

const AbexTiles: React.FC<IProps> = function AbexTiles({ member }) {
  const {
    values: { guild },
  } = useContext(GuildContext);

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
      <AbexEssence total={total} guild={guild} />

      {Object.keys(tiles).map((tile) => (
        <AbexTile key={tile} guild={guild} tiles={tiles} tile={tile} />
      ))}
    </div>
  );
};

export default AbexTiles;
