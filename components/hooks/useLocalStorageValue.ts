import { useCallback, useEffect, useMemo, useState } from "react";

export default function useLocalStorageValue<T>(
  localStoragePath: string,
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [localValue, setLocalValue] = useState<T>(defaultValue);
  const localStorageKey = useMemo(() => `${localStoragePath}.${key}`, [localStoragePath, key]);

  useEffect(() => {
    const storeValue: string = localStorage.getItem(localStorageKey) as string;
    let value: T;

    // Legacy code: Not everything was stringified
    try {
      value = JSON.parse(storeValue) as T;
    } catch (e) {
      value = defaultValue;
    }

    setLocalValue(value || defaultValue);
  }, [setLocalValue, localStorageKey, defaultValue]);

  const setValue = useCallback(
    (value: T) => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
      setLocalValue(value);
    },
    [localStorageKey, setLocalValue]
  );

  return [localValue, setValue];
}
