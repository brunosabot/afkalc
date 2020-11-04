import { useCallback } from "react";

export default function useOnChangeNumber() {
  return useCallback((setter) => {
    return (e: string) => {
      const val = Number(e);
      if (!Number.isNaN(val) && val >= 0) {
        setter(val);
      }
    };
  }, []);
}
