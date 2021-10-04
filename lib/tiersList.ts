import IFirebasePriorityList from "../components/providers/types/IFirebasePriorityList";
import IHeroDetails from "../types/IHeroDetails";

export function isValidList(
  priorityList: IFirebasePriorityList,
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
  let isValidListSi = false;

  let priorityType = priorityList.requirement || "";
  let priorityValue = priorityList.requirementValue || 0;

  if (priorityType === "" && priorityValue === 0) {
    priorityType = "ASCEND";
    priorityValue = 1;
  }

  const heroRequirementAscend = theHeroRequirement.ascend || 0;
  const heroRequirementSi = theHeroRequirement.si || 0;
  const heroRequirementFi = theHeroRequirement.fi || 0;
  const heroRequirementEngrave = theHeroRequirement.engrave || 0;

  const hasSelfRequirement =
    heroRequirementAscend > 0 ||
    heroRequirementSi > 0 ||
    heroRequirementFi > 0 ||
    heroRequirementEngrave > 0;

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

  let isValidListEngrave = false;
  if (priorityType === "ENGRAVE") {
    if (theHeroLevels.engrave === undefined) {
      isValidListEngrave = false;
    } else {
      isValidListEngrave = priorityValue <= theHeroLevels.engrave;
    }
  }

  const isListValid = isValidListSi || isValidListFi || isValidListAscend || isValidListEngrave;

  return isListValid;
}

export function isValidSelf(theHeroRequirement: IHeroDetails, theHeroLevels?: IHeroDetails) {
  // If the user has no levels for this character, it could not be valid
  if (theHeroLevels === undefined) {
    return false;
  }

  // If the priority list has no levels for this character, it could not be valid
  if (theHeroRequirement === undefined) {
    return false;
  }

  const heroLevelAscend = theHeroLevels.ascend || 0;
  const heroLevelSi = theHeroLevels.si || 0;
  const heroLevelFi = theHeroLevels.fi || 0;
  const heroLevelEngrave = theHeroLevels.engrave || 0;

  const heroRequirementAscend = theHeroRequirement.ascend || 0;
  const heroRequirementSi = theHeroRequirement.si || 0;
  const heroRequirementFi = theHeroRequirement.fi || 0;
  const heroRequirementEngrave = theHeroRequirement.engrave || 0;

  const hasSelfRequirement =
    heroRequirementAscend > 0 ||
    heroRequirementSi > 0 ||
    heroRequirementFi > 0 ||
    heroRequirementEngrave > 0;

  // If no requirements has been set, it could not be valid
  if (hasSelfRequirement === false) {
    return false;
  }

  let isValidAscend = heroRequirementAscend === 0;
  let isValidFi = heroRequirementFi === 0;
  let isValidSi = heroRequirementSi === -1;
  let isValidEngrave = heroRequirementEngrave === 0;

  if (heroRequirementAscend > 0) {
    isValidAscend = heroRequirementAscend <= heroLevelAscend;
  }
  if (heroRequirementSi > -1) {
    isValidSi = heroRequirementSi <= heroLevelSi;
  }
  if (heroRequirementFi > 0) {
    isValidFi = heroRequirementFi <= heroLevelFi;
  }
  if (heroRequirementEngrave > 0) {
    isValidEngrave = heroRequirementEngrave <= heroLevelEngrave;
  }

  const isSelfValid = isValidAscend && isValidSi && isValidFi && isValidEngrave;

  return isSelfValid;
}
