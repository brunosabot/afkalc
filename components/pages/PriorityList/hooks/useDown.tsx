import { useCallback } from "react";

export default function useDown<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback((itemToFind, currentIndex) => {
    const newHeroes = [...items];
    [newHeroes[currentIndex+1], newHeroes[currentIndex]] = [newHeroes[currentIndex], newHeroes[currentIndex+1]]
    setItems(newHeroes)
  }, [items, setItems]);
}