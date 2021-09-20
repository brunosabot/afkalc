import IHeroDetails from "../../../../types/IHeroDetails";

export default function useIsValidSelf(
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
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
  let isValidSi = heroRequirementSi === 0;
  let isValidEngrave = heroRequirementEngrave === 0;

  if (heroRequirementAscend > 0) {
    isValidAscend = heroRequirementAscend <= heroLevelAscend;
  }
  if (heroRequirementSi > 0) {
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
