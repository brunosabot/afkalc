import HeroClass from "../../../../types/HeroClass";

export default interface Current {
  [HeroClass.mage]: [number, number, number, number, number, number];
  [HeroClass.ranger]: [number, number, number, number, number, number];
  [HeroClass.support]: [number, number, number, number, number, number];
  [HeroClass.tank]: [number, number, number, number, number, number];
  [HeroClass.warrior]: [number, number, number, number, number, number];
}
