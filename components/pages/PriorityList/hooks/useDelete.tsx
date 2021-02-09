import { useCallback } from "react";

export default function useDelete<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback((itemToFind) => {
    setItems(
      items.filter(item=> item!== itemToFind)
    );
  }, [items, setItems]);
}