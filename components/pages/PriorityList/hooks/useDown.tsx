import { useCallback } from "react";

export default function useDown<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback((itemToFind) => {
    const index = items.indexOf(itemToFind);
    const newHeroes = [...items];
    [newHeroes[index+1], newHeroes[index]] = [newHeroes[index], newHeroes[index+1]]
    setItems(newHeroes)
  }, [items, setItems]);
}