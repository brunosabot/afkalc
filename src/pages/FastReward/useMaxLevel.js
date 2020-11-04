import { useMemo } from "react";
import fastRewardData from "../../data/fastReward.json";

const player = [0, 90, 95, 100, 105, 110, 120, 130, 140, 150, 160, 170, 180];

export default function useMaxLevel(diams, playerLevel, vipLevel) {
  return useMemo(() => {
    return player.reduce((acc, value) => {
      if (
        fastRewardData[diams][vipLevel][value] !== undefined &&
        (playerLevel >= value || acc === undefined)
      ) {
        return fastRewardData[diams][vipLevel][value];
      }
      return acc;
    }, undefined);
  }, [playerLevel, vipLevel, diams]);
}
