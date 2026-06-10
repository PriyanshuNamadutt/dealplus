const { searchAmazon } = require("./adapters/amazon");
const { searchGoogleShopping } = require("./adapters/googleShopping");
const logger = require("../utils/logger");
const cache = require("../utils/cache");

/**
 * Run all store adapters in parallel, merge results,
 * group by product name similarity, and return sorted.
 */
async function aggregateSearch(query, options = {}) {
  const cacheKey = `search:${query}:${JSON.stringify(options)}`;
  return cache.wrap(cacheKey, () => _fetchAndMerge(query, options));
}

async function _fetchAndMerge(query, options) {
  const { sortBy = "price_asc", page = 1 } = options;

  // Fire all adapters concurrently — if one fails, others still work
  const [amazonResults, googleResults] = await Promise.allSettled([
    searchAmazon(query, { page }),
    searchGoogleShopping(query),
  ]);

  const all = [
    ...(amazonResults.status === "fulfilled" ? amazonResults.value : []),
    ...(googleResults.status === "fulfilled" ? googleResults.value : []),
  ];

  if (amazonResults.status === "rejected") {
    logger.error("Amazon adapter failed: " + amazonResults.reason?.message);
  }
  if (googleResults.status === "rejected") {
    logger.error("Google Shopping adapter failed: " + googleResults.reason?.message);
  }

  // Group similar products by title similarity
  const grouped = groupByProduct(all);

  // Sort each product's store list
  grouped.forEach(product => {
    product.stores = sortStores(product.stores, sortBy);
    product.bestPrice = product.stores[0]?.price ?? null;
    product.bestStore = product.stores[0]?.store ?? null;
    product.maxRating = Math.max(...product.stores.map(s => s.rating || 0));
    product.totalReviews = product.stores.reduce((acc, s) => acc + (s.reviews || 0), 0);
  });

  // Sort products list
  return sortProducts(grouped, sortBy);
}

function groupByProduct(items) {
  const groups = [];
  const used = new Set();

  for (const item of items) {
    if (used.has(item.id)) continue;
    const similar = items.filter(
      other => !used.has(other.id) && isSimilarTitle(item.title, other.title)
    );
    similar.forEach(s => used.add(s.id));

    groups.push({
      id: item.id,
      title: item.title,
      image: item.image,
      category: inferCategory(item.title),
      stores: similar.map(s => ({
        store: s.store,
        storeUrl: s.storeUrl,
        price: s.price,
        currency: s.currency,
        rating: s.rating,
        reviews: s.reviews,
        badge: s.badge,
        buyUrl: s.buyUrl,
        inStock: s.inStock,
      })),
    });
  }
  return groups;
}

function isSimilarTitle(a, b) {
  if (!a || !b) return false;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  const wordsA = norm(a).split(" ").filter(Boolean);
  const wordsB = new Set(norm(b).split(" ").filter(Boolean));
  const overlap = wordsA.filter(w => wordsB.has(w)).length;
  return overlap / Math.max(wordsA.length, wordsB.size) > 0.6;
}

function sortStores(stores, sortBy) {
  return [...stores].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":    return (a.price ?? Infinity) - (b.price ?? Infinity);
      case "price_desc":   return (b.price ?? 0) - (a.price ?? 0);
      case "rating_desc":  return (b.rating ?? 0) - (a.rating ?? 0);
      case "reviews_desc": return (b.reviews ?? 0) - (a.reviews ?? 0);
      default:             return (a.price ?? Infinity) - (b.price ?? Infinity);
    }
  });
}

function sortProducts(products, sortBy) {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":    return (a.bestPrice ?? Infinity) - (b.bestPrice ?? Infinity);
      case "price_desc":   return (b.bestPrice ?? 0) - (a.bestPrice ?? 0);
      case "rating_desc":  return b.maxRating - a.maxRating;
      case "reviews_desc": return b.totalReviews - a.totalReviews;
      default:             return (a.bestPrice ?? Infinity) - (b.bestPrice ?? Infinity);
    }
  });
}

const CATEGORY_MAP = {
  Electronics: ["phone", "laptop", "headphone", "earphone", "tablet", "camera", "speaker", "tv", "monitor", "keyboard", "mouse"],
  Footwear:    ["shoe", "sneaker", "boot", "sandal", "slipper", "nike", "adidas", "puma", "reebok"],
  Fashion:     ["shirt", "jeans", "dress", "jacket", "kurta", "saree", "t-shirt", "trouser"],
  Kitchen:     ["cooker", "mixer", "grinder", "oven", "microwave", "blender", "toaster", "cookware"],
  Home:        ["vacuum", "iron", "fan", "ac", "heater", "lamp", "furniture", "mattress"],
  Books:       ["book", "kindle", "novel", "textbook", "comic"],
};

function inferCategory(title) {
  const lower = title.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some(k => lower.includes(k))) return cat;
  }
  return "General";
}

module.exports = { aggregateSearch };