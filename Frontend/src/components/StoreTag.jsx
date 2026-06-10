import { STORE_COLORS } from "../constants";
import React from "react";

/**
 * StoreTag
 * Coloured pill badge showing a store name.
 *
 * Props:
 *   name  {string}  Store name e.g. "Amazon"
 */
export default function StoreTag({ name }) {
  const color = STORE_COLORS[name] || "#6366f1";
  return (
    <span
      style={{
        background: color + "18",
        color,
        border: `1px solid ${color}40`,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        fontFamily: "monospace",
        letterSpacing: 0.3,
      }}
    >
      {name}
    </span>
  );
}