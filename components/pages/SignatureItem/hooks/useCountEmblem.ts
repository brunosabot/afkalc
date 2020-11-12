import { useMemo } from "react";
import emblemLevel from "../../../../data/emblemLevel.json";
import EmblemType from "../../../../types/EmblemType";

interface IEmblemLevel {
  type: EmblemType;
  count: number;
}

interface IEmblemLevels {
  [key: number]: IEmblemLevel;
}

const items = emblemLevel as IEmblemLevels;

export default function useCountEmblem(
  max: number,
  currentLevel: number
): [number, number, number, number] {
  return useMemo(() => {
    let primordial = 0;
    let amplifying = 0;
    let faction = 0;
    let celest = 0;
    for (let i = currentLevel + 1; i <= max; i += 1) {
      if (items[i].type === "primordial") {
        primordial += items[i].count;
      } else if (items[i].type === "amplifying") {
        amplifying += items[i].count;
      } else if (items[i].type === "faction") {
        faction += items[i].count;
      } else if (items[i].type === "celest") {
        celest += items[i].count;
      }
    }

    return [primordial, amplifying, faction, celest];
  }, [max, currentLevel]);
}
