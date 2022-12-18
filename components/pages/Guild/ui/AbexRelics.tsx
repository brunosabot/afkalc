import Image from "next/image";
import React from "react";
import { getRelicRank } from "../../../../lib/abex";
import HeroClass from "../../../../types/HeroClass";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import styles from "./AbexRelics.module.css";

interface IProps {
  member: IFirebaseProfile;
}

const TabAbex: React.FC<IProps> = function TabAbex({ member }) {
  return (
    <div className={styles.ClassList}>
      {Object.keys(HeroClass).map((key) => {
        const className = key as HeroClass;
        const rank = getRelicRank(member.abexCurrentRelics?.[className] || [0, 0, 0, 0, 0, 0]);

        if (rank === "") return null;

        return (
          <React.Fragment key={className}>
            <Image
              className={styles.Class}
              src={`/classes/${className}.png`}
              alt={`${className}`}
              height={20}
              width={20}
            />
            {rank}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TabAbex;
