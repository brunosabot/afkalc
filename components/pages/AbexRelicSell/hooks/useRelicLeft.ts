import { useMemo } from "react";
import relicDataJson from "../../../../data/abex-relics.json";

interface RelicData {
  [key: string]: {
    needs: number[];
    cost: number;
  };
}

const relicArtefact = relicDataJson.artefact as RelicData;

function reduceDependencies(
  cost: number,
  dependencies: number[],
  artefactStock: number[]
): [number, number[], number[]] {
  let localCost = cost;
  const localArtefactStock = [...artefactStock];

  const leftDependencies = dependencies.reduce<number[]>((acc, val) => {
    if (localArtefactStock.includes(val)) {
      localArtefactStock.splice(localArtefactStock.indexOf(val), 1);
      localCost -= relicArtefact[val].cost;

      return acc;
    }

    if (relicArtefact[val].needs.length > 0) {
      return [...acc, ...relicArtefact[val].needs];
    }

    return [...acc, val];
  }, []);

  return [localCost, leftDependencies, localArtefactStock];
}

export default function useRelicLeft(id: number, artefacts: number[]) {
  return useMemo(() => {
    const theArtefact = relicArtefact[id];
    let dependencies = [...theArtefact.needs];
    let artefactStock = [...artefacts];
    let { cost } = theArtefact;

    // 4 iteration to convert from level 4 to level 1
    [cost, dependencies, artefactStock] = reduceDependencies(cost, dependencies, artefactStock);
    [cost, dependencies, artefactStock] = reduceDependencies(cost, dependencies, artefactStock);
    [cost, dependencies, artefactStock] = reduceDependencies(cost, dependencies, artefactStock);
    [cost, dependencies, artefactStock] = reduceDependencies(cost, dependencies, artefactStock);

    return cost;
  }, [artefacts, id]);
}
