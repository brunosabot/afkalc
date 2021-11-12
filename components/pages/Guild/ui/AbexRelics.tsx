import React from "react";
import HeroClass from "../../../../types/HeroClass";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import styles from "./AbexRelics.module.css";

interface IProps {
  member: IFirebaseProfile;
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

const TabAbex: React.FC<IProps> = function TabAbex({ member }) {
  const ranks = {
    mage: member.abexCurrentRelics?.mage.reduce(reduceRank, defaultRank) ?? [0, 0],
    ranger: member.abexCurrentRelics?.ranger.reduce(reduceRank, defaultRank) ?? [0, 0],
    support: member.abexCurrentRelics?.support.reduce(reduceRank, defaultRank) ?? [0, 0],
    tank: member.abexCurrentRelics?.tank.reduce(reduceRank, defaultRank) ?? [0, 0],
    warrior: member.abexCurrentRelics?.warrior.reduce(reduceRank, defaultRank) ?? [0, 0],
  };

  return (
    <div className={styles.ClassList}>
      {Object.keys(HeroClass).map((key) => {
        const className = key as HeroClass;
        const [level, amount] = ranks[className];

        if (level === 0) return null;

        return (
          <React.Fragment key={className}>
            <img className={styles.Class} src={`/classes/${className}.png`} alt={`${className}`} />
            {amount === 6 ? `${level + 1}.0` : `${level}.${amount}`}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TabAbex;
