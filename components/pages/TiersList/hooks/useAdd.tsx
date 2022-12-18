import { useCallback } from "react";

export default function useAdd<T>(items: T[], setItems: (newItems: T[]) => void) {
  return useCallback(
    (itemToAdd: T) => {
      setItems([...items, itemToAdd]);
    },
    [items, setItems]
  );
}
