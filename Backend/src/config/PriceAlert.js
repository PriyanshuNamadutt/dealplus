const mongoose = require("mongoose");

/**
 * ── PriceAlertSchema ─────────────────────────────────────────────────
 * A "notify me when price drops to ₹X" alert set by a user.
 * A background cron job checks current prices and triggers alerts.
 */
const PriceAlertSchema = new mongoose.Schema(
  {
    // ── Who & what ───────────────────────────────────────────────────
    userId: {
      // Optional — guests can set alerts with just an email
      type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true,
    },
    email: {
      type: String, required: true, lowercase: true, trim: true, index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true,
    },
    productTitle: {
      // Denormalised snapshot so we can show it in the email without a join
      type: String, required: true,
    },
    productImage: {
      type: String, default: "",
    },

    // ── Alert criteria ───────────────────────────────────────────────
    targetPrice: {
      type: Number, required: true, min: 1,
      // Alert fires when bestPrice <= targetPrice
    },
    targetStore: {
      // null = any store; "Amazon" = only when Amazon drops below
      type: String, default: null,
    },
    currency: {
      type: String, default: "INR", uppercase: true,
    },

    // ── State ────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["active", "triggered", "paused", "expired", "deleted"],
      default: "active",
      index: true,
    },
    triggeredAt: {
      type: Date, default: null,
    },
    triggeredPrice: {
      // What price triggered the alert
      type: Number, default: null,
    },
    triggeredStore: {
      type: String, default: null,
    },
    triggeredBuyUrl: {
      // Deep link included in the alert email
      type: String, default: "",
    },

    // ── Notification control ─────────────────────────────────────────
    notifyVia: {
      type: [String], enum: ["email", "push", "sms"], default: ["email"],
    },
    notificationSentAt: {
      type: Date, default: null,
    },
    repeatAlert: {
      // If true, alert re-arms after triggering
      type: Boolean, default: false,
    },

    // ── Expiry ───────────────────────────────────────────────────────
    expiresAt: {
      // Auto-expire old alerts (e.g. after 90 days)
      type: Date,
      default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      index: { expireAfterSeconds: 0 }, // MongoDB TTL index
    },

    // ── Price at time of creation (for context in email) ─────────────
    priceAtCreation: {
      type: Number, default: null,
    },
  },
  {
    timestamps: true,
    collection: "pricealerts",
  }
);

// ── Compound index for the cron job query ─────────────────────────────
// "Find all active alerts where product X has a target price"
PriceAlertSchema.index({ productId: 1, status: 1, targetPrice: 1 });

// ── Instance method: check if alert should fire ───────────────────────
PriceAlertSchema.methods.shouldTrigger = function (currentPrice, storeName) {
  if (this.status !== "active") return false;
  if (currentPrice > this.targetPrice) return false;
  if (this.targetStore && this.targetStore !== storeName) return false;
  return true;
};

module.exports = mongoose.model("PriceAlert", PriceAlertSchema);