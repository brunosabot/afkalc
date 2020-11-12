import { useCallback, useMemo } from "react";
import fastRewardData from "../../../../data/fastReward.json";

interface IPlayerLevel {
  [key: string]: string;
}
interface IVipLevel {
  [key: string]: IPlayerLevel;
}
interface IDiams {
  [key: string]: IVipLevel;
}

const player = [0, 90, 95, 100, 105, 110, 120, 130, 140, 150, 160, 170, 180];

export default function useMaxLevel(diams: number, playerLevel: number, vipLevel: number): string {
  const fastRewardByDiams = useMemo<IVipLevel>(() => (fastRewardData as IDiams)[`${diams}`] || {}, [
    diams,
  ]);
  const fastRewardByVip = useMemo<IPlayerLevel>(() => fastRewardByDiams[`${vipLevel}`] || {}, [
    fastRewardByDiams,
    vipLevel,
  ]);

  const reducer = useCallback<(acc: string, value: number) => string>(
    (acc: string, value: number) => {
      const fastRewardByValue = fastRewardByVip[`${value}`];
      if (fastRewardByValue === undefined) return acc;

      return playerLevel >= value || acc === "" ? fastRewardByValue : acc;
    },
    [fastRewardByVip, playerLevel]
  );

  return useMemo<string>(() => player.reduce(reducer, ""), [reducer]);
}
