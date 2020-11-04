import { useMemo } from "react";
import images from "../../../../../data/lootImage.json";
import stages from "../../../../../data/stages.json";
import ChestContentType from "../../../../../types/ChestContentType";

interface IChest {
  Content: ChestContentType;
  CD: number;
}

interface IStage {
  stage: string;
  chests: IChest[];
}

export default function useChestLevel(level: string) {
  const [chapter] = level.split("-").map((e) => parseInt(e, 10));
  const currentLevel = chapter >= 33 ? "33-1" : level;

  const chests = useMemo(() => {
    const stage = (stages as IStage[]).find((s) => s.stage === currentLevel);
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
  }, [currentLevel]);

  return chests;
}
