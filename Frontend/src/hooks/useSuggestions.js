import { useState, useEffect, useRef } from "react";
import { fetchSuggestions } from "../services/api";

/**
 * useSuggestions
 * Debounced autocomplete for the search input.
 *
 * Usage:
 *   const { suggestions, showSuggestions, setShowSuggestions } = useSuggestions(query);
 */
export function useSuggestions(query, debounceMs = 300) {
  const [suggestions,     setSuggestions]     = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        const list = await fetchSuggestions(query);
        setSuggestions(list);
        setShowSuggestions(list.length > 0);
      } catch {
        setSuggestions([]);
      }
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  return { suggestions, showSuggestions, setShowSuggestions };
}