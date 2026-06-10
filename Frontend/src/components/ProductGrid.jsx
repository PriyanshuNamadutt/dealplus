import ProductCard from "./ProductCard";
import React from "react";

/**
 * ProductGrid
 * Renders the results grid, loading spinner, error state, or empty state.
 *
 * Props:
 *   products  {array}
 *   loading   {boolean}
 *   error     {string|null}
 *   sort      {string}
 */
export default function ProductGrid({ products, loading, error, sort }) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div
          style={{
            width: 48, height: 48,
            border: "4px solid #EEF2FF",
            borderTop: "4px solid #6366f1",
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#6B7280", fontWeight: 600 }}>
          Comparing prices across 50+ stores…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <h3 style={{ color: "#374151" }}>Oops — something went wrong</h3>
        <p style={{ color: "#9CA3AF" }}>{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h3 style={{ color: "#374151" }}>No products found</h3>
        <p style={{ color: "#9CA3AF" }}>Try a different search term or category</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
        gap: 24,
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} sort={sort} />
      ))}
    </div>
  );
}