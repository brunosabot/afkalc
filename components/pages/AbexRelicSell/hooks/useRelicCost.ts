import { useMemo } from "react";
import relicDataJson from "../../../../data/abex-relics.json";

interface RelicData {
  [key: string]: {
    needs: number[];
    cost: number;
  };
}

const relicArtefact = relicDataJson.artefact as RelicData;

export default function useRelicCost(id: number) {
  return useMemo(() => {
    const theArtefact = relicArtefact[id];

    return theArtefact.cost;
  }, [id]);
}
