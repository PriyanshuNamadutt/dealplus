import { FOOTER_LINKS, STATS } from "../constants";
import React from "react";

/**
 * Footer
 * Dark-themed footer with working page and external links.
 *
 * Props:
 *   onNavigate  {function}  Called with page key when internal link is clicked
 */
export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1e1b4b", color: "#fff", padding: "56px 32px 24px", marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Top: brand + mini stats ── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 32, marginBottom: 48,
          borderBottom: "1px solid #312e81", paddingBottom: 40,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>
              <span style={{ color: "#818cf8" }}>Deal</span>
              <span style={{ color: "#F59E0B" }}>Plus</span>
            </div>
            <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.7, margin: 0 }}>
              India's smartest price comparison engine. We search 50+ stores so you don't have to — saving you time and money on every purchase.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { icon: "𝕏", url: "https://twitter.com",   label: "Twitter" },
                { icon: "in", url: "https://linkedin.com",  label: "LinkedIn" },
                { icon: "▶", url: "https://youtube.com",   label: "YouTube" },
                { icon: "📸", url: "https://instagram.com", label: "Instagram" },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 36, height: 36, background: "#312e81", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#a5b4fc",
                    textDecoration: "none", transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#4338ca")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#312e81")}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mini stats */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#818cf8" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Link columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32, marginBottom: 40,
        }}>
          {FOOTER_LINKS.map(col => (
            <div key={col.title}>
              <h4 style={{
                margin: "0 0 16px", fontSize: 11, fontWeight: 700,
                color: "#818cf8", textTransform: "uppercase", letterSpacing: 1.5,
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {col.items.map(item => (
                  <li key={item.label} style={{ marginBottom: 10 }}>
                    {item.page ? (
                      // Internal page link
                      <button
                        onClick={() => onNavigate(item.page)}
                        style={{
                          background: "none", border: "none", padding: 0,
                          fontSize: 13, color: "#9CA3AF", cursor: "pointer",
                          transition: "color 0.15s", textAlign: "left",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#e0e7ff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
                      >
                        {item.label}
                      </button>
                    ) : (
                      // External link
                      <a
                        href={item.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: 13, color: "#9CA3AF", textDecoration: "none",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#e0e7ff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
                      >
                        {item.label} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: "1px solid #312e81", paddingTop: 24,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "#6B7280" }}>
            © {year} DealPlus Technologies Pvt. Ltd. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: "#4B5563" }}>
            ⚠️ Prices shown may vary. Always verify on store website before purchase. We may earn affiliate commission.
          </span>
        </div>
      </div>
    </footer>
  );
}