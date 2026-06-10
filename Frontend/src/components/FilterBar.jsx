import { CATEGORIES, SORT_OPTIONS } from "../constants";
import React from "react";

/**
 * FilterBar
 * Category filter chips + sort dropdown shown above search results.
 *
 * Props:
 *   total       {number}
 *   activeQuery {string}
 *   category    {string}    setCategory {function}
 *   sort        {string}    setSort     {function}
 *   totalStores {number}
 */
export default function FilterBar({
  total, activeQuery, category, setCategory, sort, setSort, totalStores,
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, marginBottom: 28,
      }}
    >
      {/* Result count */}
      <div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1e1b4b" }}>
          {total} results
          {activeQuery && (
            <span style={{ color: "#6B7280", fontWeight: 400 }}> for "{activeQuery}"</span>
          )}
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9CA3AF" }}>
          Prices compared across {totalStores} store listings
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {/* Category chips */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                cursor: "pointer", border: "1.5px solid",
                borderColor: category === cat ? "#6366f1" : "#E5E7EB",
                background:  category === cat ? "#EEF2FF"  : "#fff",
                color:       category === cat ? "#6366f1"  : "#6B7280",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: "1.5px solid #E5E7EB", background: "#fff",
            color: "#374151", cursor: "pointer", outline: "none",
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}