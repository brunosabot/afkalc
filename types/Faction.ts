enum Faction {
  none = "none",
  lightbearers = "lightbearers",
  maulers = "maulers",
  wilders = "wilders",
  graveborns = "graveborns",
  celestials = "celestials",
  hypogeans = "hypogeans",
  dimensionals = "dimensionals",
  draconis = "draconis",
}

export const factionNumberMap = {
  none: 0,
  lightbearers: 1,
  maulers: 2,
  wilders: 3,
  graveborns: 4,
  celestials: 5,
  hypogeans: 6,
  dimensionals: 7,
  draconis: 8,
};
export const factionFactionMap = {
  0: Faction.none,
  1: Faction.lightbearers,
  2: Faction.maulers,
  3: Faction.wilders,
  4: Faction.graveborns,
  5: Faction.celestials,
  6: Faction.hypogeans,
  7: Faction.dimensionals,
  8: Faction.draconis,
};

export const factionAsNumber = (faction: Faction) => factionNumberMap[faction] ?? 0;
export const factionNumberAsFaction = (faction: keyof typeof factionFactionMap) =>
  factionFactionMap[faction] ?? "none";

export default Faction;
