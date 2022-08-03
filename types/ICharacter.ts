import Faction from "./Faction";
import Class from "./HeroClass";
import Role from "./Role";
import Type from "./Type";

export default interface ICharacter {
  name?: string;
  id: number;
  type: Type;
  class: Class;
  role: Role;
  image: string;
  faction: Faction;
  slug: string;
  isAwakened: boolean;
}
