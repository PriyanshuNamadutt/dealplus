import { STATS } from "../constants";
import React from "react";

/**
 * StatsBar
 * Gradient bar showing headline numbers below the hero.
 */
export default function StatsBar() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6366f1, #8B5CF6)",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "center",
        gap: 60,
        flexWrap: "wrap",
      }}
    >
      {STATS.map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{s.value}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}