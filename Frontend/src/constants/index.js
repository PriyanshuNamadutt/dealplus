import React from "react";
// ── Store brand colors ──────────────────────────────────────────────
export const STORE_COLORS = {
  Amazon:           "#FF9900",
  Flipkart:         "#2874f0",
  Myntra:           "#FF3F6C",
  "Nike.com":       "#111111",
  Samsung:          "#1428A0",
  Walmart:          "#0071CE",
  Target:           "#CC0000",
  Dyson:            "#C62B36",
  Croma:            "#ED3237",
  "Reliance Digital": "#2563EB",
  "Levi's":         "#C41230",
  Currys:           "#734BD1",
};

// ── Dropdown sort options ───────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Lowest Price",       value: "price_asc"    },
  { label: "Highest Rated",      value: "rating_desc"  },
  { label: "Most Reviews",       value: "reviews_desc" },
  { label: "Price: High to Low", value: "price_desc"   },
];

// ── Category filter list ────────────────────────────────────────────
export const CATEGORIES = [
  "All", "Electronics", "Smartphones", "Footwear",
  "Kitchen", "Home", "Fashion", "Books",
];

// ── Trending search suggestions ─────────────────────────────────────
export const TRENDING_SEARCHES = [
  "iPhone 15", "Sony WH-1000XM5", "Nike Air Max", "Kindle", "Dyson Vacuum",
];

// ── Footer link columns ─────────────────────────────────────────────
export const FOOTER_LINKS = [
  {
    title: "Quick Links",
    items: ["Home", "All Deals", "Price Alerts", "Browser Extension"],
  },
  {
    title: "Stores",
    items: ["Amazon India", "Flipkart", "Myntra", "Croma", "Reliance Digital"],
  },
  {
    title: "Support",
    items: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
  },
];

// ── Stats bar data ──────────────────────────────────────────────────
export const STATS = [
  { value: "50+",   label: "Stores Connected"  },
  { value: "2M+",   label: "Products Tracked"  },
  { value: "₹12Cr+",label: "Saved by Users"    },
  { value: "4.9★",  label: "User Rating"       },
];

// ── Navbar links ────────────────────────────────────────────────────
export const NAV_LINKS = ["Deals", "Categories", "Price Alerts", "About"];

// ── API base URL (reads from .env) ──────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";