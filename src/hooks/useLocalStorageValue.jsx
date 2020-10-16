import { useEffect, useCallback, useMemo, useState } from "react";

export default function useLocalStorageValue(localStoragePath, key, defaultValue) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const localStorageKey = useMemo(() => `${localStoragePath}.${key}`, [localStoragePath, key]);

  useEffect(() => {
    const storeValue = localStorage.getItem(localStorageKey);
    let value = storeValue;

    // Legacy code: Not everything was stringified
    try {
      value = JSON.parse(storeValue);
    } catch (e) {
      value = defaultValue;
    }

    setLocalValue(value || defaultValue);
  }, [setLocalValue, localStorageKey, defaultValue]);

  const setValue = useCallback(
    (value) => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
      setLocalValue(value || defaultValue);
    },
    [localStorageKey, defaultValue, setLocalValue]
  );

  return [localValue, setValue];
}
