import { useState } from "react";
import StoreTag from "./StoreTag";
import StoreRow from "./StoreRow";
import StarRating from "./StarRating";
import { formatPrice } from "../utils/formatters";
import React from "react";

/**
 * ProductCard
 * Displays a product with image, category, best price,
 * store tags, and an expandable list of store rows.
 *
 * Props:
 *   product  {object}  Product from the API / mock data
 *   sort     {string}  Current sort key (passed to sort store rows)
 */
export default function ProductCard({ product, sort }) {
  const [expanded, setExpanded] = useState(false);

  // Sort stores client-side so cards respond to sort changes instantly
  const sortedStores = [...(product.stores || [])].sort((a, b) => {
    if (sort === "price_asc")    return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sort === "price_desc")   return (b.price ?? 0) - (a.price ?? 0);
    if (sort === "rating_desc")  return (b.rating ?? 0) - (a.rating ?? 0);
    if (sort === "reviews_desc") return (b.reviews ?? 0) - (a.reviews ?? 0);
    return (a.price ?? Infinity) - (b.price ?? Infinity);
  });

  const bestStore    = sortedStores[0];
  const visibleRows  = expanded ? sortedStores : sortedStores.slice(0, 2);
  const hiddenCount  = sortedStores.length - 2;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff 0%, #fafbff 100%)",
        borderRadius: 20,
        border: "1.5px solid #e8eaf6",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        boxShadow: "0 4px 24px rgba(99,102,241,0.07)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.18)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.07)")}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={product.image}
          alt={product.title || product.name}
          style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
        />
        <span style={{ position:"absolute", top:12, left:12, background:"#6366f1", color:"#fff", borderRadius:8, fontSize:11, fontWeight:700, padding:"4px 10px", textTransform:"uppercase" }}>
          {product.category}
        </span>
        <span style={{ position:"absolute", top:12, right:12, background:"#10B981", color:"#fff", borderRadius:8, fontSize:12, fontWeight:700, padding:"4px 10px" }}>
          {sortedStores.length} Stores
        </span>
      </div>

      {/* Title + best price + store tags */}
      <div style={{ padding: "16px 18px 0" }}>
        <h3 style={{ margin:"0 0 10px", fontSize:15, fontWeight:700, color:"#1e1b4b", lineHeight:1.4 }}>
          {product.title || product.name}
        </h3>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <span style={{ fontSize:22, fontWeight:800, color:"#6366f1" }}>
              {formatPrice(bestStore?.price)}
            </span>
            <span style={{ fontSize:12, color:"#9CA3AF", marginLeft:4 }}>best price</span>
          </div>
          {bestStore?.rating && <StarRating rating={bestStore.rating} />}
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
          {sortedStores.map((s) => (
            <StoreTag key={s.store || s.name} name={s.store || s.name} />
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #EEF0FF", margin: "0 18px" }} />

      {/* Store rows */}
      {visibleRows.map((store, i) => (
        <StoreRow
          key={store.store || store.name}
          store={{ ...store, name: store.store || store.name }}
          isBest={i === 0}
          isLast={i === visibleRows.length - 1 && !(!expanded && hiddenCount > 0)}
        />
      ))}

      {/* Expand / collapse */}
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "100%", padding: "11px", background: "transparent",
            border: "none", borderTop: "1px solid #EEF0FF",
            color: "#6366f1", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          {expanded ? "▲ Show less" : `▼ See ${hiddenCount} more store${hiddenCount > 1 ? "s" : ""}`}
        </button>
      )}
    </div>
  );
}