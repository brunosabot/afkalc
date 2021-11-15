import React, { useState } from "react";
import abexRelicData from "../../../../data/abex-relics.json";
import { IFirebaseAbyssalExpeditionClassRelics } from "../../../providers/types/IFirebaseAbyssalExpedition";
import useCurrentToGoal from "../hooks/useCurrentToGoal";
import useRelicOffset from "../hooks/useRelicOffset";
import Relic from "./Relic";
import RelicFilter from "./RelicFilter";
import styles from "./RelicList.module.css";

interface Props {
  goal: IFirebaseAbyssalExpeditionClassRelics;
  current: IFirebaseAbyssalExpeditionClassRelics;
  inventory: { [key: number]: number };
  setInventory: (value: { [key: number]: number }) => void;
}

const RelicList: React.FC<Props> = function RelicList({ current, goal, inventory, setInventory }) {
  const [filter, setFilter] = useState(0);

  const flatRelics = Object.keys(inventory).reduce<number[]>((acc, key) => {
    const intKey = parseInt(key, 10);

    if (intKey > 0) {
      return [...acc, ...new Array(inventory[intKey]).fill(intKey)];
    }

    return acc;
  }, []);

  const relicsForGoal = useCurrentToGoal(current, goal);

  const d = useRelicOffset(relicsForGoal, flatRelics);
  const offsetByRelic = d.reduce<{ [key: number]: number }>(
    (acc, e) => ({
      ...acc,
      [e]: acc[e] ? acc[e] + 1 : 1,
    }),
    {}
  );

  return (
    <>
      <div className={styles.Filters}>
        <RelicFilter isActive={filter === 0} level={0} onClick={setFilter} />
        <RelicFilter isActive={filter === 1} level={1} onClick={setFilter} />
        <RelicFilter isActive={filter === 2} level={2} onClick={setFilter} />
        <RelicFilter isActive={filter === 3} level={3} onClick={setFilter} />
        <RelicFilter isActive={filter === 4} level={4} onClick={setFilter} />
      </div>

      <div className={styles.Relics}>
        {Object.keys(abexRelicData.artefact).map((relic: string) => {
          const relicId = parseInt(relic, 10);
          const relicLevel = Math.floor(relicId / 1000);

          if (relicId === 0 || (filter !== 0 && relicLevel !== filter) || relicLevel === 5) {
            return null;
          }

          return (
            <Relic
              key={relicId}
              setQuantity={(id, quantity) => {
                setInventory({ ...inventory, [id]: quantity });
              }}
              quantity={inventory[relicId]}
              relic={relicId}
              level={relicLevel}
              counter={offsetByRelic[relicId]}
            />
          );
        })}
      </div>
    </>
  );
};

export default RelicList;
