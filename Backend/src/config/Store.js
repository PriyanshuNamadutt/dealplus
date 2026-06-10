const mongoose = require("mongoose");

/**
 * ── StoreSchema ───────────────────────────────────────────────────────
 * Each e-commerce store/platform tracked by DealPlus.
 * Used to manage which adapters are active, API keys, and rate limits.
 */
const StoreSchema = new mongoose.Schema(
  {
    // ── Identity ─────────────────────────────────────────────────────
    id: {
      type: String, required: true, unique: true, lowercase: true, trim: true,
      // e.g. "amazon_in", "flipkart", "myntra"
    },
    name: {
      type: String, required: true, trim: true,
      // e.g. "Amazon India", "Flipkart"
    },
    url: {
      type: String, required: true,
    },
    logo: {
      type: String, default: "🏪",
    },
    color: {
      // Hex brand color for UI
      type: String, default: "#6366f1",
    },
    country: {
      type: String, default: "IN", uppercase: true,
    },

    // ── Capabilities ─────────────────────────────────────────────────
    categories: {
      // Which product categories this store covers
      type: [String], default: ["all"],
    },
    adapterType: {
      type: String,
      enum: ["rainforest", "serpapi", "affiliate_api", "scraper", "manual"],
      default: "serpapi",
    },

    // ── Status ───────────────────────────────────────────────────────
    isActive: {
      type: Boolean, default: true, index: true,
    },
    isAffiliate: {
      // Do we earn commission from this store?
      type: Boolean, default: false,
    },
    affiliateTag: {
      // e.g. Amazon's "dealplus-21"
      type: String, default: "", select: false,
    },

    // ── Health / rate limit tracking ──────────────────────────────────
    avgResponseMs: {
      type: Number, default: null,
    },
    successRate: {
      // % of successful API calls in last 24h
      type: Number, default: 100, min: 0, max: 100,
    },
    lastChecked: {
      type: Date, default: null,
    },
    rateLimitPerMin: {
      type: Number, default: 60,
    },

    // ── Display priority ─────────────────────────────────────────────
    displayOrder: {
      // Lower number = shown first
      type: Number, default: 99,
    },
  },
  {
    timestamps: true,
    collection: "stores",
  }
);

module.exports = mongoose.model("Store", StoreSchema);