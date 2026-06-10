const axios  = require("axios");
const logger = require("../../utils/logger");

const BASE   = process.env.RAINFOREST_BASE_URL || "https://api.rainforestapi.com/request";
const KEY    = process.env.RAINFOREST_API_KEY;
const DOMAIN = process.env.AMAZON_DOMAIN || "amazon.in";

/**
 * Build a real Amazon product deep link.
 *   - If ASIN is available → https://www.amazon.in/dp/B0CHX2FGFD  (exact product page)
 *   - Otherwise            → https://www.amazon.in/s?k=Sony+WH-1000XM5  (search page)
 */
function buildAmazonUrl(asin, title) {
  if (asin && asin.trim()) {
    return `https://www.${DOMAIN}/dp/${asin.trim()}`;
  }
  return `https://www.${DOMAIN}/s?k=${encodeURIComponent(title || "")}`;
}

/**
 * Search Amazon products via Rainforest API.
 * Docs: https://www.rainforestapi.com/docs/product-data-api/parameters/search
 *
 * Falls back to realistic mock data when RAINFOREST_API_KEY is not set.
 */
async function searchAmazon(query, { page = 1 } = {}) {
  if (!KEY) {
    logger.warn("RAINFOREST_API_KEY not set — returning mock Amazon data");
    return getMockAmazon(query);
  }

  try {
    const { data } = await axios.get(BASE, {
      params: {
        api_key:       KEY,
        type:          "search",
        amazon_domain: DOMAIN,
        search_term:   query,
        page,
        sort_by:       "featured",
      },
      timeout: 10000,
    });

    return (data.search_results || []).map((item) => ({
      store:    "Amazon",
      storeUrl: `https://www.${DOMAIN}`,
      id:       item.asin,
      title:    item.title,
      image:    item.image,
      price:    item.price?.value    ?? null,
      currency: item.price?.currency ?? "INR",
      rating:   item.rating          ?? null,
      reviews:  item.ratings_total   ?? 0,
      badge:    item.is_prime ? "Prime" : (item.badge?.text || ""),
      buyUrl:   buildAmazonUrl(item.asin, item.title),   // ✅ real product page
      inStock:  item.is_available !== false,
      logo:     "🛒",
    }));
  } catch (err) {
    logger.error(`Amazon search failed: ${err.message}`);
    return getMockAmazon(query);   // graceful fallback
  }
}

/**
 * Fetch full product details for a single ASIN.
 */
async function getAmazonProduct(asin) {
  if (!KEY) return null;

  try {
    const { data } = await axios.get(BASE, {
      params: { api_key: KEY, type: "product", amazon_domain: DOMAIN, asin },
      timeout: 10000,
    });

    const p = data.product;
    return {
      store:       "Amazon",
      id:          p.asin,
      title:       p.title,
      image:       p.main_image?.link,
      price:       p.buybox_winner?.price?.value,
      currency:    "INR",
      rating:      p.rating,
      reviews:     p.ratings_total,
      description: p.description,
      features:    p.feature_bullets || [],
      buyUrl:      buildAmazonUrl(p.asin, p.title),   // ✅ real product page
    };
  } catch (err) {
    logger.error(`Amazon product fetch failed: ${err.message}`);
    return null;
  }
}

// ── Mock fallback (when API key is missing) ──────────────────────────
function getMockAmazon(query) {
  const encoded = encodeURIComponent(query);
  return [
    {
      store:    "Amazon",
      storeUrl: `https://www.${DOMAIN}`,
      id:       `amz_mock_${Date.now()}`,
      title:    `${query} — Top Result`,
      image:    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      price:    24990,
      currency: "INR",
      rating:   4.5,
      reviews:  18430,
      badge:    "Prime",
      buyUrl:   `https://www.${DOMAIN}/s?k=${encoded}`,   // ✅ real search URL even in mock
      inStock:  true,
      logo:     "🛒",
    },
  ];
}

module.exports = { searchAmazon, getAmazonProduct };