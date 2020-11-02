import { useMemo } from "react";
import stages from "../../../../data/stages.json";

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

export default function useChestLevel(level) {
  const chests = useMemo(() => {
    const stage = stages.find((s) => s.stage === level);
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
