import { useCallback } from "react";

export default function useUpdate<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback(
    (itemToFind: T, index: number) => {
      const newHeroes = [...items];
      newHeroes[index] = itemToFind;
      setItems(newHeroes);
    },
    [items, setItems]
  );
}
