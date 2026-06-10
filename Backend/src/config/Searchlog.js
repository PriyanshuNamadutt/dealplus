const mongoose = require("mongoose");

/**
 * ── SearchLogSchema ───────────────────────────────────────────────────
 * Logs every search query for analytics:
 *   - Power trending searches feature
 *   - Cache warming (pre-fetch popular queries)
 *   - Business intelligence dashboard
 */
const SearchLogSchema = new mongoose.Schema(
  {
    query: {
      type: String, required: true, trim: true, lowercase: true, index: true,
    },
    normalizedQuery: {
      // Cleaned version: lowercase, no punctuation, deduped spaces
      type: String, trim: true,
    },
    resultCount: {
      type: Number, default: 0,
    },
    storesQueried: {
      type: [String], default: [],
    },
    responseTimeMs: {
      type: Number, default: null,
    },
    cacheHit: {
      type: Boolean, default: false,
    },
    sortBy: {
      type: String, default: "price_asc",
    },
    category: {
      type: String, default: null,
    },

    // ── Session context ───────────────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: "User", default: null,
    },
    sessionId: {
      type: String, default: null,
    },
    ipHash: {
      // Hashed IP for rate-limit auditing — never store raw IPs
      type: String, default: null,
    },
    userAgent: {
      type: String, default: "",
    },
  },
  {
    timestamps: true,
    collection: "searchlogs",
  }
);

// TTL index — auto-delete logs older than 90 days to save storage
SearchLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 3600 });
SearchLogSchema.index({ query: 1, createdAt: -1 }); // Trending queries lookup

module.exports = mongoose.model("SearchLog", SearchLogSchema);