const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

/**
 * ── UserSchema ───────────────────────────────────────────────────────
 * Registered user of DealPlus.
 * Handles authentication and stores the user's saved products + search history.
 */
const UserSchema = new mongoose.Schema(
  {
    // ── Auth ─────────────────────────────────────────────────────────
    name: {
      type: String, required: true, trim: true, maxlength: 80,
    },
    email: {
      type: String, required: true, unique: true,
      lowercase: true, trim: true, index: true,
    },
    passwordHash: {
      type: String,
      // Not required — users who sign in via Google/Apple won't have a password
    },
    authProvider: {
      type: String, enum: ["email", "google", "apple"], default: "email",
    },
    googleId: { type: String, sparse: true, index: true },
    appleId:  { type: String, sparse: true, index: true },

    avatarUrl: {
      type: String, default: "",
    },

    // ── Account status ───────────────────────────────────────────────
    isVerified: {
      // Email verified?
      type: Boolean, default: false,
    },
    verifyToken:   { type: String, select: false }, // Hidden from queries by default
    resetToken:    { type: String, select: false },
    resetTokenExp: { type: Date,   select: false },

    // ── Preferences ──────────────────────────────────────────────────
    preferredCurrency: {
      type: String, default: "INR", uppercase: true,
    },
    notifications: {
      email:    { type: Boolean, default: true  },
      push:     { type: Boolean, default: false },
      priceAlert: { type: Boolean, default: true },
    },

    // ── Saved (wishlisted) products ──────────────────────────────────
    savedProducts: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        savedAt:   { type: Date, default: Date.now },
        note:      { type: String, default: "" },
      },
    ],

    // ── Recent searches ───────────────────────────────────────────────
    searchHistory: [
      {
        query:      { type: String },
        searchedAt: { type: Date, default: Date.now },
        resultCount:{ type: Number, default: 0 },
      },
    ],

    // ── Metadata ─────────────────────────────────────────────────────
    lastLoginAt: { type: Date },
    loginCount:  { type: Number, default: 0 },
    role: {
      type: String, enum: ["user", "admin"], default: "user",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// ── Hash password before save ─────────────────────────────────────────
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash") || !this.passwordHash) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// ── Instance method: verify password ─────────────────────────────────
UserSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

// ── Instance method: strip sensitive fields ───────────────────────────
UserSchema.methods.toPublic = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.verifyToken;
  delete obj.resetToken;
  delete obj.resetTokenExp;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);