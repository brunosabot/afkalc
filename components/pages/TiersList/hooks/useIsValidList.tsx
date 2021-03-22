import IHeroDetails from "../../../../types/IHeroDetails";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";

export default function useIsValidList(
  priorityList: IFirebasePriorityList,
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
  let isValidListSi = false;

  const priorityType = priorityList.requirement || "";
  const priorityValue = priorityList.requirement || 0;

  const heroRequirementAscend = theHeroRequirement.ascend || 0;
  const heroRequirementSi = theHeroRequirement.si || 0;
  const heroRequirementFi = theHeroRequirement.fi || 0;

  const hasSelfRequirement =
    heroRequirementAscend > 0 || heroRequirementSi > 0 || heroRequirementFi > 0;

  // If the list has no type or no value but the character has requirement. The list should not be invalid
  if ((priorityType || priorityValue === 0) && hasSelfRequirement) {
    return true;
  }

  // If the user has no levels for this character, it could not be valid
  if (theHeroLevels === undefined) {
    return false;
  }

  if (priorityList.requirement === "SI") {
    if (theHeroLevels.si === undefined) {
      isValidListSi = false;
    } else if (priorityList.requirementValue === undefined) {
      isValidListSi = true;
    } else {
      isValidListSi = priorityList.requirementValue <= theHeroLevels.si;
    }
  }

  let isValidListFi = false;
  if (priorityList.requirement === "FI") {
    if (theHeroLevels.inn === undefined) {
      isValidListFi = false;
    } else if (priorityList.requirementValue === undefined) {
      isValidListFi = true;
    } else {
      isValidListFi = priorityList.requirementValue <= theHeroLevels.inn;
    }
  }

  let isValidListAscend = false;
  if (priorityList.requirement === "ASCEND") {
    if (theHeroLevels.ascend === undefined) {
      isValidListAscend = false;
    } else if (priorityList.requirementValue === undefined) {
      isValidListAscend = true;
    } else {
      isValidListAscend = priorityList.requirementValue <= theHeroLevels.ascend;
    }
  }

  const isListValid = isValidListSi || isValidListFi || isValidListAscend;

  return isListValid;
}
