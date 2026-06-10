const mongoose = require("mongoose");

/**
 * ── StoreListingSchema ───────────────────────────────────────────────
 * One store's listing for a product (sub-document inside Product).
 * e.g. Amazon selling iPhone 15 at ₹1,34,900
 */
const StoreListingSchema = new mongoose.Schema(
  {
    store: {
      type: String, required: true, trim: true,
      // e.g. "Amazon", "Flipkart", "Myntra"
    },
    storeId: {
      type: String, trim: true,
      // Internal store identifier e.g. "amazon_in"
    },
    price: {
      type: Number, required: true, min: 0,
    },
    currency: {
      type: String, default: "INR", uppercase: true,
    },
    originalPrice: {
      // MRP / strikethrough price
      type: Number, default: null,
    },
    discountPercent: {
      type: Number, default: null,
    },
    rating: {
      type: Number, min: 0, max: 5, default: null,
    },
    reviews: {
      type: Number, default: 0, min: 0,
    },
    badge: {
      // "Prime", "No Cost EMI", "Best Seller", etc.
      type: String, default: "",
    },
    buyUrl: {
      // Deep link to product page on the store
      type: String, required: true,
    },
    inStock: {
      type: Boolean, default: true,
    },
    logo: {
      type: String, default: "",
    },
    lastChecked: {
      // When we last refreshed this store's price
      type: Date, default: Date.now,
    },
  },
  { _id: false } // Embedded sub-doc, no separate _id needed
);

/**
 * ── PriceHistorySchema ───────────────────────────────────────────────
 * One price snapshot for a store on a given date.
 */
const PriceHistorySchema = new mongoose.Schema(
  {
    store:    { type: String, required: true },
    price:    { type: Number, required: true },
    date:     { type: Date,   default: Date.now },
    inStock:  { type: Boolean, default: true },
  },
  { _id: false }
);

/**
 * ── ProductSchema ────────────────────────────────────────────────────
 * The main product document. One product = one comparison page.
 * All stores selling that product are embedded in `stores[]`.
 */
const ProductSchema = new mongoose.Schema(
  {
    // ── Identifiers ──────────────────────────────────────────────────
    asin: {
      // Amazon ASIN — used as canonical cross-store ID
      type: String, trim: true, sparse: true, index: true,
    },
    externalIds: {
      // Other platform IDs mapped by store name
      // e.g. { flipkart: "MOBGTAGPTB3VS23G", myntra: "12345678" }
      type: Map, of: String,
    },

    // ── Core product info ────────────────────────────────────────────
    title: {
      type: String, required: true, trim: true, index: "text",
    },
    brand: {
      type: String, trim: true, default: "",
    },
    model: {
      type: String, trim: true, default: "",
    },
    category: {
      type: String, trim: true, default: "General",
      enum: ["Electronics","Smartphones","Footwear","Fashion","Kitchen","Home","Books","Beauty","Sports","Toys","General"],
    },
    subcategory: {
      type: String, trim: true, default: "",
    },
    description: {
      type: String, default: "",
    },
    features: {
      type: [String], default: [],
    },
    image: {
      type: String, default: "",
    },
    images: {
      type: [String], default: [],
    },
    tags: {
      // For search / filtering: ["wireless", "noise-cancelling", "over-ear"]
      type: [String], default: [], index: true,
    },

    // ── Store listings (current prices) ─────────────────────────────
    stores: {
      type: [StoreListingSchema], default: [],
    },

    // ── Aggregated fields (computed, updated on each price refresh) ──
    bestPrice: {
      type: Number, default: null, index: true,
    },
    bestStore: {
      type: String, default: null,
    },
    bestBuyUrl: {
      // The buy link of the cheapest store
      type: String, default: "",
    },
    lowestEver: {
      price: { type: Number, default: null },
      store: { type: String, default: null },
      date:  { type: Date,   default: null },
    },
    highestPrice: {
      type: Number, default: null,
    },
    avgRating: {
      type: Number, default: null,
    },
    totalReviews: {
      type: Number, default: 0,
    },

    // ── Price history ────────────────────────────────────────────────
    priceHistory: {
      type: [PriceHistorySchema], default: [],
    },

    // ── Metadata ─────────────────────────────────────────────────────
    isActive: {
      type: Boolean, default: true, index: true,
    },
    isTrending: {
      type: Boolean, default: false, index: true,
    },
    viewCount: {
      type: Number, default: 0,
    },
    searchCount: {
      // How many times this product appeared in search
      type: Number, default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: "products",
  }
);

// ── Indexes ───────────────────────────────────────────────────────────
ProductSchema.index({ title: "text", brand: "text", tags: "text" }); // Full-text search
ProductSchema.index({ category: 1, bestPrice: 1 });                   // Category + price filter
ProductSchema.index({ isTrending: 1, bestPrice: 1 });                 // Hot deals page
ProductSchema.index({ "stores.store": 1 });                           // Filter by store

// ── Instance method: recompute aggregated fields ──────────────────────
ProductSchema.methods.recomputeAggregates = function () {
  const active = this.stores.filter((s) => s.inStock && s.price > 0);
  if (!active.length) return;

  const prices  = active.map((s) => s.price);
  const best    = active.reduce((a, b) => (a.price < b.price ? a : b));

  this.bestPrice    = best.price;
  this.bestStore    = best.store;
  this.bestBuyUrl   = best.buyUrl;
  this.highestPrice = Math.max(...prices);
  this.avgRating    = active.reduce((sum, s) => sum + (s.rating || 0), 0) / active.length;
  this.totalReviews = active.reduce((sum, s) => sum + (s.reviews || 0), 0);

  if (!this.lowestEver.price || best.price < this.lowestEver.price) {
    this.lowestEver = { price: best.price, store: best.store, date: new Date() };
  }
};

// ── Virtual: discount percentage off best price vs highest ────────────
ProductSchema.virtual("dealStrength").get(function () {
  if (!this.bestPrice || !this.highestPrice || this.highestPrice === this.bestPrice) return 0;
  return Math.round(((this.highestPrice - this.bestPrice) / this.highestPrice) * 100);
});

module.exports = mongoose.model("Product", ProductSchema);