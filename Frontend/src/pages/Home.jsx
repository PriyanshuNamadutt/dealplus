import { useState } from "react";
import Hero      from "../components/Hero";
import StatsBar  from "../components/StatsBar";
import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import { useSearch } from "../hooks/useSearch";
import React from "react";

// Fallback hot-deals shown before the user searches anything
import { HOT_DEALS } from "../constants/hotDeals";

/**
 * Home page
 * Wires together the search hook, hero, filter bar, and product grid.
 */
export default function Home() {
  const [query, setQuery] = useState("");

  const {
    results, loading, error, searched, activeQuery, totalStores,
    sort, setSort, category, setCategory, runSearch,
  } = useSearch();

  const handleSearch = (overrideQuery) => {
    const q = overrideQuery || query;
    if (q.trim()) runSearch(q);
  };

  return (
    <>
      <Hero query={query} setQuery={setQuery} onSearch={handleSearch} />
      <StatsBar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {searched ? (
          <>
            <FilterBar
              total={results.length}
              activeQuery={activeQuery}
              category={category} setCategory={setCategory}
              sort={sort}       setSort={setSort}
              totalStores={totalStores}
            />
            <ProductGrid
              products={results}
              loading={loading}
              error={error}
              sort={sort}
            />
          </>
        ) : (
          <>
            <h2 style={{ textAlign:"center", fontSize:28, fontWeight:800, color:"#1e1b4b", marginBottom:8 }}>
              🔥 Today's Hot Deals
            </h2>
            <p style={{ textAlign:"center", color:"#9CA3AF", marginBottom:36 }}>
              Handpicked deals updated every hour
            </p>
            <ProductGrid products={HOT_DEALS} loading={false} error={null} sort="price_asc" />
          </>
        )}
      </div>
    </>
  );
}