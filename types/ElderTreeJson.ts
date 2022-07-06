import HeroClass from "./HeroClass";

export interface ElderTreeFactionLevel {
  cost: number;
  totalcost: number;
  hp: number;
  atk: number;
  arm: number;
  "hp.pr": number;
  "atk.pr": number;
  "arm.pr": number;
  crit?: number;
  hit?: number;
  dodg?: number;
  mspd?: number;
  hast?: number;
  lfs?: number;
}

export interface ElderTreeFaction {
  [key: string]: ElderTreeFactionLevel;
}

type ElderTreeJson = {
  [key in HeroClass]: ElderTreeFaction;
};

export default ElderTreeJson;
