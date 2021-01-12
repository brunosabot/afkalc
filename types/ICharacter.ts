import Class from "./Class";
import Faction from "./Faction";
import Role from "./Role";
import Type from "./Type";

export default interface ICharacter {
  name: string;
  id: number;
  type: Type;
  class: Class;
  role: Role;
  image: string;
  faction: Faction;
}
