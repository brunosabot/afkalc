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

  const hasSelfRequirement =
    theHeroRequirement.ascend !== undefined ||
    theHeroRequirement.si !== undefined ||
    theHeroRequirement.fi !== undefined;

  // If no requirements has been set, it could not be valid
  if (hasSelfRequirement === false) {
    return false;
  }

  let isValidAscend = theHeroRequirement.ascend === undefined;
  let isValidFi = theHeroRequirement.ascend === undefined;
  let isValidSi = theHeroRequirement.ascend === undefined;

  if (theHeroRequirement.ascend !== undefined) {
    isValidAscend =
      theHeroLevels.ascend !== undefined && theHeroRequirement.ascend <= theHeroLevels.ascend;
  }
  if (theHeroRequirement.si !== undefined) {
    isValidSi = theHeroLevels.si !== undefined && theHeroRequirement.si <= theHeroLevels.si;
  }
  if (theHeroRequirement.fi !== undefined) {
    isValidFi = theHeroLevels.inn !== undefined && theHeroRequirement.fi <= theHeroLevels.inn;
  }

  const isSelfValid = isValidAscend && isValidSi && isValidFi;

  return isSelfValid;
}
