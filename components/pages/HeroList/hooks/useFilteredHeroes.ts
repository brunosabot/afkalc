import { useMemo } from "react";
import factions from "../../../../data/heroFaction.json";
import Faction from "../../../../types/Faction";
import ICharacter from "../../../../types/ICharacter";
import { State } from "./useFilters";
import useGetValue from "./useGetValue";

interface IHeroLevels {
  fi?: number;
  si?: number;
  ascend?: number;
  engrave?: number;
  link?: number;
  linkkey?: number;
}

interface IEnrichedCharacter extends ICharacter {
  ascend: number;
  si: number;
  fi: number;
  engrave: number;
  link: number;
  linkkey: number;
}

const sortChars = (a: IEnrichedCharacter, b: IEnrichedCharacter) => {
  if (a.ascend < b.ascend) return 1;
  if (a.ascend > b.ascend) return -1;
  if (a.si < b.si) return 1;
  if (a.si > b.si) return -1;
  if (a.fi < b.fi) return 1;
  if (a.fi > b.fi) return -1;
  if (a.engrave < b.engrave) return 1;
  if (a.engrave > b.engrave) return -1;
  if (a.faction === Faction.none) return -1;
  if (b.faction === Faction.none) return 1;
  if (factions[a.faction] < factions[b.faction]) return -1;
  if (factions[a.faction] > factions[b.faction]) return 1;

  return a.slug.localeCompare(b.slug);
};

function compare(direction: string, a: number, b: number) {
  if (direction === ">") return a > b;
  if (direction === ">=") return a >= b;
  if (direction === "=") return a === b;
  if (direction === "<=") return a <= b;
  if (direction === "<") return a < b;

  return false;
}

const parts: ("partbody" | "partboots" | "parthead" | "partweapon")[] = [
  "partbody",
  "partboots",
  "parthead",
  "partweapon",
];

export default function useFilteredHeroes(
  heroes: ICharacter[],
  levels: { [key: number]: IHeroLevels },
  filters: State
) {
  const getValue = useGetValue(levels);

  const characters = useMemo(
    () =>
      heroes
        .map((c) => ({
          ...c,
          ascend: getValue(c.id, "ascend"),
          si: getValue(c.id, "si"),
          fi: getValue(c.id, "fi"),
          engrave: getValue(c.id, "engrave"),
          link: getValue(c.id, "link"),
          linkkey: getValue(c.id, "linkkey"),
          partbody: getValue(c.id, "partbody"),
          partboots: getValue(c.id, "partboots"),
          parthead: getValue(c.id, "parthead"),
          partweapon: getValue(c.id, "partweapon"),
          partbodyfaction: getValue(c.id, "partbodyfaction"),
          partbootsfaction: getValue(c.id, "partbootsfaction"),
          partheadfaction: getValue(c.id, "partheadfaction"),
          partweaponfaction: getValue(c.id, "partweaponfaction"),
        }))
        .filter(
          (c) => filters.name === "" || c.name?.toLowerCase().includes(filters.name.toLowerCase())
        )
        .filter((c) => filters.type.length === 0 || filters.type.includes(c.type))
        .filter((c) => filters.class.length === 0 || filters.class.includes(c.class))
        .filter((c) => filters.role.length === 0 || filters.role.includes(c.role))
        .filter((c) => filters.faction.length === 0 || filters.faction.includes(c.faction))
        .filter(
          (c) => filters.si === "" || compare(filters.directionSi, c.si, parseInt(filters.si, 10))
        )
        .filter(
          (c) => filters.fi === "" || compare(filters.directionFi, c.fi, parseInt(filters.fi, 10))
        )
        .filter(
          (c) =>
            filters.ascend === "" ||
            compare(filters.directionAscend, c.ascend, parseInt(filters.ascend, 10))
        )
        .filter(
          (c) =>
            filters.engrave === "" ||
            compare(filters.directionEngrave, c.engrave, parseInt(filters.engrave, 10))
        )
        .filter(
          (c) =>
            filters.equip === "" ||
            parts.every((p) => compare(filters.directionEquip, c[p], parseInt(filters.equip, 10)))
        )
        .sort(sortChars),
    [
      heroes,
      getValue,
      filters.name,
      filters.type,
      filters.class,
      filters.role,
      filters.faction,
      filters.si,
      filters.directionSi,
      filters.fi,
      filters.directionFi,
      filters.ascend,
      filters.directionAscend,
      filters.engrave,
      filters.directionEngrave,
      filters.directionEquip,
      filters.equip,
    ]
  );

  return characters;
}
