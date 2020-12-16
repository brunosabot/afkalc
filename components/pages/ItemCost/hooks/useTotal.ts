import { useMemo } from "react";
import useItem from "./useItem";

export default function useTotal(resources: { [key: string]: number }) {
  const { getItem } = useItem();

  return useMemo(
    () =>
      Object.entries(resources).reduce((acc, [key, value]) => {
        const { cost } = getItem(key);

        return cost ? acc + Math.round(100 * value * cost) / 100 : acc;
      }, 0),
    [resources, getItem]
  );
}
