import { useMemo } from "react";
import stages from "../../../../data/stages.json";

type ChestContentType =
  | "Mythic+ Stone"
  | "Mythic Gear"
  | "Faction Emblems"
  | "Legendary Gear"
  | "Elite+ Gear"
  | "Elite Gear"
  | "Invigorating Essence"
  | "Amplifying Emblem"
  | "Primal Emblem"
  | "Dura Shards"
  | "Dust x1"
  | "Crude";

interface IChest {
  Content: ChestContentType;
  CD: number;
}

interface IStage {
  stage: string;
  chests: IChest[];
}

const images = {
  "Mythic+ Stone": "MythicStone.jpg",
  "Mythic Gear": "MythicGear.jpg",
  "Faction Emblems": "GbEmblem.jpg",
  "Legendary Gear": "LegendaryGear.jpg",
  "Elite+ Gear": "ElitePGear.jpg",
  "Elite Gear": "EliteGear.jpg",
  "Invigorating Essence": "InvigoratingEssence.jpg",
  "Amplifying Emblem": "ApmEmblem.jpg",
  "Primal Emblem": "PrimEmb.jpg",
  "Dura Shards": "DuraShards.jpg",
  "Dust x1": "Dust.jpg",
  Crude: "crude.jpg",
};

export default function useChestLevel(level: string) {
  const chests = useMemo(() => {
    const stage = (stages as IStage[]).find((s) => s.stage === level);
    if (stage) {
      return stage.chests
        .sort((a, b) => b.CD - a.CD)
        .map((chest) => {
          return {
            ...chest,
            image: images[chest.Content],
          };
        });
    }
    return [];
  }, [level]);

  return chests;
}
