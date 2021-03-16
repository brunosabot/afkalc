import { useMemo } from "react";
import stages from "../../../../data/stages.json";
import ChestContentType from "../../../../types/ChestContentType";

interface IChest {
  item: ChestContentType;
  CD: number;
}

interface IStage {
  stage: string;
  chests: IChest[];
}

export default function useChestLevel(level: string) {
  const [chapter, stage] = level.split("-").map((e) => parseInt(e, 10));
  const currentLevel = chapter >= 33 ? "33-1" : `${chapter}-${stage}`;

  const chests = useMemo(() => {
    const stageRewards = (stages as IStage[]).find((s) => s.stage === currentLevel);
    if (stageRewards) {
      return stageRewards.chests.sort((a, b) => b.CD - a.CD);
    }
    return [];
  }, [currentLevel]);

  return chests;
}
