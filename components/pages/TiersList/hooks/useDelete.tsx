import { useCallback } from "react";

export default function useDelete<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback(
    (itemToFind: T, currentIndex: number) => {
      const newItems = [...items];
      newItems.splice(currentIndex, 1);

      setItems(newItems);
    },
    [items, setItems]
  );
}
