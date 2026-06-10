import { useRef } from "react";
import { TRENDING_SEARCHES } from "../constants";
import { useSuggestions } from "../hooks/useSuggestions";
import React from "react";

/**
 * Hero
 * Full-width hero section with search box, suggestions, and trending tags.
 *
 * Props:
 *   query      {string}
 *   setQuery   {function}
 *   onSearch   {function}  Called with optional query string
 */
export default function Hero({ query, setQuery, onSearch }) {
  const inputRef = useRef(null);
  const { suggestions, showSuggestions, setShowSuggestions } = useSuggestions(query);

  const handleKey = (e) => {
    if (e.key === "Enter") { setShowSuggestions(false); onSearch(); }
    if (e.key === "Escape") setShowSuggestions(false);
  };

  const pickSuggestion = (s) => {
    setQuery(s);
    setShowSuggestions(false);
    onSearch(s);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f0f0ff 0%, #fdf4ff 50%, #fff8ed 100%)",
        padding: "72px 32px 56px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"rgba(99,102,241,0.08)" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:250, height:250, borderRadius:"50%", background:"rgba(245,158,11,0.08)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow tag */}
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #EEF2FF, #FEF3C7)",
            border: "1px solid #c7d2fe", borderRadius: 100,
            padding: "6px 18px", fontSize: 13, fontWeight: 600,
            color: "#6366f1", marginBottom: 20,
          }}
        >
          🔍 Compare prices across 50+ stores in real-time
        </div>

        <h1
          style={{
            fontSize: 52, fontWeight: 900, letterSpacing: -2,
            color: "#1e1b4b", margin: "0 0 14px", lineHeight: 1.1,
          }}
        >
          Find the <span style={{ color: "#6366f1" }}>Best Deal.</span>
          <br />Every. Single. Time.
        </h1>

        <p style={{ color: "#6B7280", fontSize: 18, margin: "0 0 40px" }}>
          Compare prices, ratings &amp; reviews from Amazon, Flipkart, Myntra &amp; 50+ stores instantly.
        </p>

        {/* Search box */}
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              display: "flex", background: "#fff", borderRadius: 16,
              border: "2px solid #c7d2fe",
              boxShadow: "0 8px 32px rgba(99,102,241,0.15)",
              overflow: "hidden",
            }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => suggestions.length && setShowSuggestions(true)}
              placeholder="Search iPhone, Nike shoes, Sony headphones..."
              style={{
                flex: 1, border: "none", outline: "none",
                padding: "18px 22px", fontSize: 15, fontWeight: 500,
                color: "#1e1b4b", background: "transparent",
              }}
            />
            <button
              onClick={() => { setShowSuggestions(false); onSearch(); }}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8B5CF6)",
                border: "none", color: "#fff", padding: "0 32px",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              Search Deals ✦
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {showSuggestions && (
            <ul
              style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "#fff", border: "1.5px solid #c7d2fe",
                borderRadius: 12, listStyle: "none", margin: "6px 0 0",
                padding: "6px 0", boxShadow: "0 8px 24px rgba(99,102,241,0.12)",
                zIndex: 200,
              }}
            >
              {suggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => pickSuggestion(s)}
                  style={{
                    padding: "10px 20px", fontSize: 14, cursor: "pointer",
                    color: "#374151", textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#EEF2FF")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Trending tags */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:20, flexWrap:"wrap" }}>
          {TRENDING_SEARCHES.map((t) => (
            <button
              key={t}
              onClick={() => { setQuery(t); onSearch(t); }}
              style={{
                background: "#fff", border: "1px solid #c7d2fe",
                borderRadius: 100, padding: "6px 14px", fontSize: 12,
                fontWeight: 600, color: "#6366f1", cursor: "pointer",
              }}
            >
              🔥 {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}