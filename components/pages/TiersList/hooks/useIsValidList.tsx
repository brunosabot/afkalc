import IHeroDetails from "../../../../types/IHeroDetails";
import IFirebasePriorityList from "../../../providers/types/IFirebasePriorityList";

export default function useIsValidList(
  priorityList: IFirebasePriorityList,
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
  let isValidListSi = false;

  let priorityType = priorityList.requirement || "";
  let priorityValue = priorityList.requirementValue || 0;

  if (priorityType === "" && priorityValue === 0) {
    priorityType = "SI";
    priorityValue = 1;
  }

  const heroRequirementAscend = theHeroRequirement.ascend || 0;
  const heroRequirementSi = theHeroRequirement.si || 0;
  const heroRequirementFi = theHeroRequirement.fi || 0;

  const hasSelfRequirement =
    heroRequirementAscend > 0 || heroRequirementSi > 0 || heroRequirementFi > 0;

  // If the list has no type or no value but the character has requirement. The list should not be invalid
  if ((priorityType === "" || priorityValue === 0) && hasSelfRequirement) {
    return true;
  }

  // If the user has no levels for this character, it could not be valid
  if (theHeroLevels === undefined) {
    return false;
  }

  if (priorityType === "SI") {
    if (theHeroLevels.si === undefined) {
      isValidListSi = false;
    } else {
      isValidListSi = priorityValue <= theHeroLevels.si;
    }
  }

  let isValidListFi = false;
  if (priorityType === "FI") {
    if (theHeroLevels.fi === undefined) {
      isValidListFi = false;
    } else {
      isValidListFi = priorityValue <= theHeroLevels.fi;
    }
  }

  let isValidListAscend = false;
  if (priorityType === "ASCEND") {
    if (theHeroLevels.ascend === undefined) {
      isValidListAscend = false;
    } else {
      isValidListAscend = priorityValue <= theHeroLevels.ascend;
    }
  }

  const isListValid = isValidListSi || isValidListFi || isValidListAscend;

  return isListValid;
}
