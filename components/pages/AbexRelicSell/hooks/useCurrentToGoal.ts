import abexRelicData from "../../../../data/abex-relics.json";
import HeroClass from "../../../../types/HeroClass";
import Current from "../types/Current";

type Level = "1" | "2" | "3" | "4" | "5";

export default function useCurrentToGoal(currents: Current, goals: Current) {
  const neededRelics: number[] = [];

  Object.keys(goals).forEach((theClass) => {
    const theHeroClass = theClass as HeroClass;
    const theClassTree = abexRelicData.tree[theHeroClass];

    goals[theHeroClass].forEach((relic, index) => {
      if (currents[theHeroClass][index] !== relic) {
        const level = `${Math.floor(relic / 1000)}` as Level;
        const position = theClassTree[level].indexOf(relic);

        let newLevel = level;
        let theTree = theClassTree[newLevel];

        while (theTree && theTree.length) {
          neededRelics.push(theTree[position]);
          newLevel = `${parseInt(newLevel, 10) - 1}` as Level;
          theTree = theClassTree[newLevel];

          // The relic is the current one, we don't need to go further
          if (theTree[position] === currents[theHeroClass][position]) {
            break;
          }
        }
      }
    });
  });

  return neededRelics.filter((relic) => relic).sort();
}
