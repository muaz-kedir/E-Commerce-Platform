"use client";
import { useState, useEffect } from "react";

/**
 * Delay updating a value until the user stops typing.
 * Useful for search inputs — prevents firing an API call on every keystroke.
 *
 * @param value   - The raw value to debounce
 * @param delay   - Debounce delay in ms (default 400)
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
