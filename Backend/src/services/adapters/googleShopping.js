const axios  = require("axios");
const logger = require("../../utils/logger");

const BASE = "https://serpapi.com/search";
const KEY  = process.env.SERPAPI_KEY;

/**
 * Maps a domain string to a human-readable store name.
 */
const DOMAIN_TO_NAME = {
  "flipkart.com":       "Flipkart",
  "myntra.com":         "Myntra",
  "croma.com":          "Croma",
  "reliancedigital.in": "Reliance Digital",
  "nykaa.com":          "Nykaa",
  "tatacliq.com":       "Tata CLiQ",
  "snapdeal.com":       "Snapdeal",
  "meesho.com":         "Meesho",
  "ajio.com":           "AJIO",
};

/**
 * Per-store URL builders for mock mode and fallback.
 * Each takes the raw search query and returns a working search/results URL.
 */
const STORE_SEARCH_URLS = {
  "Flipkart":         (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`,
  "Myntra":           (q) => `https://www.myntra.com/${encodeURIComponent(q)}`,
  "Croma":            (q) => `https://www.croma.com/searchB?q=${encodeURIComponent(q)}`,
  "Reliance Digital": (q) => `https://www.reliancedigital.in/search?q=${encodeURIComponent(q)}`,
  "Nykaa":            (q) => `https://www.nykaa.com/search/result/?q=${encodeURIComponent(q)}`,
  "Tata CLiQ":        (q) => `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(q)}`,
  "Snapdeal":         (q) => `https://www.snapdeal.com/search?keyword=${encodeURIComponent(q)}`,
  "Meesho":           (q) => `https://www.meesho.com/search?q=${encodeURIComponent(q)}`,
  "AJIO":             (q) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`,
};

const STORE_LOGOS = {
  "Flipkart":         "📦",
  "Myntra":           "👗",
  "Croma":            "🏪",
  "Reliance Digital": "🏬",
  "Nykaa":            "💄",
  "Tata CLiQ":        "🎁",
  "Snapdeal":         "🔖",
  "Meesho":           "🛍️",
  "AJIO":             "👔",
};

function extractStoreName(source) {
  if (!source) return "Online Store";
  const lower = source.toLowerCase();
  for (const [domain, name] of Object.entries(DOMAIN_TO_NAME)) {
    if (lower.includes(domain)) return name;
  }
  // Capitalise first letter of unknown store
  return source.charAt(0).toUpperCase() + source.slice(1);
}

/**
 * Build the best buy URL for a result, in priority order:
 *   1. item.link from SerpAPI  → actual product page (best)
 *   2. STORE_SEARCH_URLS       → store-specific search page
 *   3. Generic https://domain  → fallback
 */
function buildBuyUrl(item, storeName, query) {
  if (item.link && item.link.startsWith("http")) return item.link;
  const builder = STORE_SEARCH_URLS[storeName];
  if (builder) return builder(query);
  return `https://${item.source || "flipkart.com"}`;
}

/**
 * Search Google Shopping via SerpAPI.
 * Returns listings from Flipkart, Myntra, Croma, Reliance Digital, etc.
 * Docs: https://serpapi.com/shopping-results
 */
async function searchGoogleShopping(query, { country = "in", currency = "INR" } = {}) {
  if (!KEY) {
    logger.warn("SERPAPI_KEY not set — returning mock store data");
    return getMockStores(query);
  }

  try {
    const { data } = await axios.get(BASE, {
      params: {
        api_key:  KEY,
        engine:   "google_shopping",
        q:        query,
        gl:       country,
        hl:       "en",
        currency,
      },
      timeout: 12000,
    });

    return (data.shopping_results || []).map((item) => {
      const storeName = extractStoreName(item.source);
      const rawPrice  = String(item.price || "0").replace(/[^0-9.]/g, "");

      return {
        store:    storeName,
        storeUrl: `https://${item.source || ""}`,
        id:       item.product_id || `gs_${Math.random().toString(36).slice(2, 9)}`,
        title:    item.title,
        image:    item.thumbnail,
        price:    parseFloat(rawPrice) || null,
        currency,
        rating:   item.rating  ?? null,
        reviews:  item.reviews ?? 0,
        badge:    item.tag      || "",
        buyUrl:   buildBuyUrl(item, storeName, query),   // ✅ real product page
        inStock:  true,
        logo:     STORE_LOGOS[storeName] || "🛍️",
      };
    });
  } catch (err) {
    logger.error(`Google Shopping search failed: ${err.message}`);
    return getMockStores(query);   // graceful fallback
  }
}

// ── Mock fallback (when API key is missing) ──────────────────────────
function getMockStores(query) {
  return [
    {
      store: "Flipkart", storeUrl: "https://flipkart.com",
      id: `fk_${Date.now()}`,
      title: `${query} — Flipkart`,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      price: 25999, currency: "INR", rating: 4.3, reviews: 8400, badge: "No Cost EMI",
      buyUrl: STORE_SEARCH_URLS["Flipkart"](query),   // ✅ real search URL
      inStock: true, logo: "📦",
    },
    {
      store: "Croma", storeUrl: "https://croma.com",
      id: `cr_${Date.now() + 1}`,
      title: `${query} — Croma`,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      price: 26990, currency: "INR", rating: 4.1, reviews: 2100, badge: "",
      buyUrl: STORE_SEARCH_URLS["Croma"](query),      // ✅ real search URL
      inStock: true, logo: "🏪",
    },
    {
      store: "Reliance Digital", storeUrl: "https://reliancedigital.in",
      id: `rd_${Date.now() + 2}`,
      title: `${query} — Reliance Digital`,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      price: 27490, currency: "INR", rating: 4.0, reviews: 1800, badge: "",
      buyUrl: STORE_SEARCH_URLS["Reliance Digital"](query),
      inStock: true, logo: "🏬",
    },
  ];
}

module.exports = { searchGoogleShopping };