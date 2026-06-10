import React from "react";

/**
 * StarRating
 * Renders 5 stars filled up to `rating`, plus the numeric label.
 *
 * Props:
 *   rating  {number}  e.g. 4.3
 *   size    {number}  font-size in px (default 13)
 */
export default function StarRating({ rating, size = 13 }) {
  const filled = Math.round(rating);
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{ fontSize: size, color: i <= filled ? "#F59E0B" : "#D1D5DB" }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: size - 1, color: "#6B7280", marginLeft: 2 }}>
        {rating?.toFixed(1)}
      </span>
    </span>
  );
}