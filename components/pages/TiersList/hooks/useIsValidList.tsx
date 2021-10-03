import { isValidList } from "../../../../lib/tiersList";
import IHeroDetails from "../../../../types/IHeroDetails";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";

export default function useIsValidList(
  priorityList: IFirebasePriorityList,
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
  return isValidList(priorityList, theHeroRequirement, theHeroLevels);
}
