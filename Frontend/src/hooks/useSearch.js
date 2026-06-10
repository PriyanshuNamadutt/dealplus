import { useState, useCallback } from "react";
import { searchProducts } from "../services/api";

/**
 * useSearch
 * Manages all search state: loading, results, errors, filters.
 *
 * Usage:
 *   const { results, loading, error, runSearch, sort, setSort, ... } = useSearch();
 */
export function useSearch() {
  const [results,     setResults]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [searched,    setSearched]    = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const [sort,        setSort]        = useState("price_asc");
  const [category,    setCategory]    = useState("All");
  const [totalStores, setTotalStores] = useState(0);

  const runSearch = useCallback(async (query, overrides = {}) => {
    const q = query?.trim();
    if (!q) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setActiveQuery(q);

    try {
      const params = {
        sortBy: overrides.sort || sort,
        ...(overrides.category && overrides.category !== "All"
          ? { category: overrides.category }
          : {}),
      };

      const data = await searchProducts(q, params);
      setResults(data.data || []);
      setTotalStores(
        (data.data || []).reduce((acc, p) => acc + (p.stores?.length || 0), 0)
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [sort]);

  // Filter results client-side by category
  const filteredResults =
    category === "All"
      ? results
      : results.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );

  return {
    results: filteredResults,
    rawResults: results,
    loading,
    error,
    searched,
    activeQuery,
    totalStores,
    sort,      setSort,
    category,  setCategory,
    runSearch,
  };
}