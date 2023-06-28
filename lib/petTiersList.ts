import { IFirebasePetListStep } from "../components/providers/types/IFirebasePetList";
import { IFirebasePetsPet } from "../components/providers/types/IFirebasePets";

export default true;

export function isValidSelf(
  thePetRequirement: IFirebasePetListStep,
  thePetLevels?: IFirebasePetsPet
) {
  // If the user has no levels for this character, it could not be valid
  if (thePetLevels === undefined) {
    return false;
  }

  // If the priority list has no levels for this character, it could not be valid
  if (thePetRequirement === undefined) {
    return false;
  }

  const total =
    thePetLevels.agilityBuff + thePetLevels.intelligenceBuff + thePetLevels.strengthBuff;
  const required = thePetRequirement.level;

  return total >= required;
}
