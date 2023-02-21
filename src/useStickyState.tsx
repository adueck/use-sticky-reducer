import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Returns a stateful value, and a function to update it. Persists state in localStorage. If an initialization function is provided, it we be called on any saved state before initialization.
 *
 * @param {(string|number|object|boolean|undefined|null)} defaultValue The default value to use if there was nothing saved previously
 * @param {string} key The key for storing the value in localStorage
 * @param {function} [initialization] An optional function to be applied to the saved state before initialization
 */
export default function useStickyState<T extends SaveableData>(
  defaultValue: T,
  key: string,
  initialization?: (savedValue: T) => T
): [value: T, setValue: Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const v =
      typeof localStorage === 'object' ? localStorage.getItem(key) : null;
    if (v === null) {
      return defaultValue;
    }
    try {
      const saved = JSON.parse(v) as T;
      return initialization ? initialization(saved) : saved;
    } catch (e) {
      console.error('error parsing saved state from useStickyState');
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof localStorage === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
