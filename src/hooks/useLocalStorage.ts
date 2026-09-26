import { useState, useEffect } from 'react';

// ============================================================
// GENERIC useLocalStorage HOOK
// ============================================================

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`useLocalStorage: Error setting key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`useLocalStorage: Error removing key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// ============================================================
// SYNCED useLocalStorage (updates on storage events)
// ============================================================

export function useSyncedLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue, removeValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? (JSON.parse(e.newValue) as T) : initialValue;
          setStoredValue(newValue);
        } catch {
          // Ignore parse errors from other tabs
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue, setStoredValue]);

  return [storedValue, setStoredValue, removeValue] as const;
}
