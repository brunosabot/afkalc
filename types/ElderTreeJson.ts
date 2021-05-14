import HeroClass from "./HeroClass";

export interface ElderTreeFactionLevel {
  level: number;
  cost: number;
  totalCost: number;
  hp: number;
  hpPerc: number;
  atk: number;
  atkPerc: number;
  def: number;
  defPerc: number;
  acc: number;
  dodge: number;
  haste: number;
  crit: number;
  ll: number;
}

export interface ElderTreeFaction {
  [key: number]: ElderTreeFactionLevel;
}

type ElderTreeJson = {
  [key in HeroClass]: ElderTreeFaction;
};

export default ElderTreeJson;
