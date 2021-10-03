import { isValidSelf } from "../../../../lib/tiersList";
import IHeroDetails from "../../../../types/IHeroDetails";

export default function useIsValidSelf(
  theHeroRequirement: IHeroDetails,
  theHeroLevels?: IHeroDetails
) {
  return isValidSelf(theHeroRequirement, theHeroLevels);
}
