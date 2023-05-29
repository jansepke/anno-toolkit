import { useEffect, useState } from "react";

export function useStateWithLocalStorage<T>(
  storageKey: string,
  initial: T
): [T, (arg: T) => void] {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (value !== initial) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, initial, storageKey]);

  useEffect(() => {
    const storageValue = localStorage.getItem(storageKey);
    if (storageValue) {
      setValue(JSON.parse(storageValue));
    }
  }, [storageKey]);

  return [value, setValue];
}
