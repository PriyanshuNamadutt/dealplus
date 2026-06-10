import StarRating from "./StarRating";
import { formatPrice, formatReviews } from "../utils/formatters";
import { STORE_COLORS } from "../constants";
import React from "react";

/**
 * StoreRow
 * One row inside a ProductCard showing price, rating, and a real Buy Now link.
 *
 * Props:
 *   store    {object}   { name, logo, price, rating, reviews, badge, buyUrl }
 *   isBest   {boolean}  Highlights the best-deal row
 *   isLast   {boolean}  Hides bottom border on last row
 */
export default function StoreRow({ store, isBest, isLast }) {
  const storeName  = store.store || store.name;
  const storeColor = STORE_COLORS[storeName] || "#6366f1";

  // Build the best possible buy URL:
  // 1. Use explicit buyUrl if available
  // 2. Otherwise fall back to the store's home URL
  const buyLink = store.buyUrl || store.storeUrl || "#";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
        background: isBest ? "#F0F0FF" : "transparent",
        borderBottom: isLast ? "none" : "1px solid #EEF0FF",
      }}
    >
      {/* Left: store logo + name + badges + rating */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {/* Coloured store dot */}
          <span
            style={{
              display: "inline-block",
              width: 8, height: 8,
              borderRadius: "50%",
              background: storeColor,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
            {store.logo} {storeName}
          </span>
          {isBest && (
            <span style={{
              fontSize: 10, background: "#DCFCE7", color: "#166534",
              borderRadius: 4, padding: "1px 6px", fontWeight: 700,
            }}>
              ✦ BEST DEAL
            </span>
          )}
          {store.badge && (
            <span style={{
              fontSize: 10, background: "#EFF6FF", color: "#1D4ED8",
              borderRadius: 4, padding: "1px 6px", fontWeight: 600,
            }}>
              {store.badge}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StarRating rating={store.rating} />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>
            {formatReviews(store.reviews)} reviews
          </span>
        </div>
      </div>

      {/* Right: price + Buy Now button (real link) */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <span style={{
            display: "block",
            fontSize: 17, fontWeight: 800,
            color: isBest ? "#6366f1" : "#374151",
          }}>
            {formatPrice(store.price)}
          </span>
          {isBest && (
            <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>
              lowest price
            </span>
          )}
        </div>

        {/* Real product buy link opens in new tab */}
        <a
          href={buyLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          title={`Buy on ${storeName}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: isBest
              ? `linear-gradient(135deg, ${storeColor}, #8B5CF6)`
              : "#F3F4F6",
            color: isBest ? "#fff" : "#374151",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 12,
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
            border: isBest ? "none" : `1px solid #E5E7EB`,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Buy Now
          <span style={{ fontSize: 11 }}>↗</span>
        </a>
      </div>
    </div>
  );
}