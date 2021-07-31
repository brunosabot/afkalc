import HeroClass from "./HeroClass";

export interface ElderTreeFactionLevel {
  cost: number;
  totalcost: number;
  basegs: number;
  hp: number;
  atk: number;
  arm: number;
  prgs: number;
  "hp.pr": number;
  "atk.pr": number;
  "arm.pr": number;
  dodg?: number;
  mspd?: number;
  hast?: number;
  hit?: number;
  lfs?: number;
  crit?: number;
  mcrit?: number;
}

export interface ElderTreeFaction {
  [key: string]: ElderTreeFactionLevel;
}

type ElderTreeJson = {
  [key in HeroClass]: ElderTreeFaction;
};

export default ElderTreeJson;
