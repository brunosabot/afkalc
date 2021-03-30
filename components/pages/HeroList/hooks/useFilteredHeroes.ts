import { useMemo } from "react";
import factions from "../../../../data/heroFaction.json";
import ICharacter from "../../../../types/ICharacter";
import { State } from "./useFilters";
import useGetValue from "./useGetValue";

interface IHeroLevels {
  fi?: number;
  si?: number;
  ascend?: number;
  link?: number;
}

const sortChars = (a: ICharacter, b: ICharacter) => {
  if (factions[a.faction] < factions[b.faction]) {
    return -1;
  }
  if (factions[a.faction] > factions[b.faction]) {
    return 1;
  }
  return a.name.localeCompare(b.name);
};

function compare(direction: string, a: number, b: number) {
  if (direction === ">") return a > b;
  if (direction === ">=") return a >= b;
  if (direction === "=") return a === b;
  if (direction === "<=") return a <= b;
  if (direction === "<") return a < b;

  return false;
}

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
          link: getValue(c.id, "link"),
        }))
        .filter((c) => filters.type === "" || c.type === filters.type)
        .filter((c) => filters.class === "" || c.class === filters.class)
        .filter((c) => filters.role === "" || c.role === filters.role)
        .filter((c) => filters.faction === "" || c.faction === filters.faction)
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
        .sort(sortChars),
    [
      heroes,
      getValue,
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
    ]
  );

  return characters;
}
