import { useCallback } from "react";

export default function useOnChangeNumber() {
  return useCallback(
    (setter: (val: number) => void) => (e: string) => {
      const val = Number(e);
      if (!Number.isNaN(val) && val >= 0) {
        setter(val);
      }
    },
    []
  );
}
