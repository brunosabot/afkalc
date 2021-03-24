import abexRelicData from "../../../../data/abex-relics.json";
import HeroClass from "../../../../types/HeroClass";
import { IFirebaseAbyssalExpeditionClassRelics } from "../../../providers/types/IFirebaseAbyssalExpedition";

type Level = "1" | "2" | "3" | "4" | "5";

export default function useCurrentToGoal(
  currents: IFirebaseAbyssalExpeditionClassRelics,
  goals: IFirebaseAbyssalExpeditionClassRelics
) {
  const neededRelics: number[] = [];

  Object.keys(goals).forEach((theClass) => {
    const theHeroClass = theClass as HeroClass;
    const theClassTree = abexRelicData.tree[theHeroClass];

    goals[theHeroClass].forEach((relic, index) => {
      const goalRelicLevel = Math.floor(relic / 1000);
      const currentRelicLevel = Math.floor(currents[theHeroClass][index] / 1000);

      if (goalRelicLevel > currentRelicLevel) {
        const level = `${goalRelicLevel}` as Level;
        const position = theClassTree[level].indexOf(relic);

        let newLevel = level;
        let theTree = theClassTree[newLevel];

        while (theTree && theTree.length) {
          neededRelics.push(theTree[position]);
          newLevel = `${parseInt(newLevel, 10) - 1}` as Level;
          theTree = theClassTree[newLevel];

          // The relic is the current one, we don't need to go further
          if (theTree && theTree[position] === currents[theHeroClass][position]) {
            break;
          }
        }
      }
    });
  });

  return neededRelics.filter((relic) => relic).sort();
}
