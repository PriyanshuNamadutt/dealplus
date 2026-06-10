// ── Crypto polyfill ───────────────────────────────────────────────────
// Mongoose 7+ uses crypto.webcrypto internally.
// Node 18 has it but it's not always globally available — this ensures it is.
if (!globalThis.crypto) {
  globalThis.crypto = require("crypto").webcrypto;
}

const mongoose = require("mongoose");
const logger   = require("../utils/logger");

/**
 * connectDB
 * Connects to MongoDB Atlas (or local MongoDB).
 * Called once at server startup. Non-blocking — app runs in mock mode if DB is absent.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    logger.warn("⚠️  MONGODB_URI not set — running in mock data mode (no DB)");
    return;
  }

  // Validate URI format before attempting connection
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    logger.error("❌ MONGODB_URI looks wrong. Must start with mongodb:// or mongodb+srv://");
    logger.error("   Check your .env file — no extra spaces or quote marks around the value.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName:             process.env.MONGODB_DB_NAME || "dealplus",
      serverSelectionTimeoutMS: 8000,   // fail fast if Atlas unreachable
      socketTimeoutMS:          30000,
    });

    logger.info(`✅ MongoDB connected → ${mongoose.connection.host}`);
    logger.info(`🗄️  Database         → ${mongoose.connection.name}`);
  } catch (err) {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);

    // Give useful hints for common errors
    if (err.message.includes("bad auth") || err.message.includes("Authentication failed")) {
      logger.error("   → Wrong username or password in MONGODB_URI");
      logger.error("   → Fix: Atlas → Database Access → edit user password");
    } else if (err.message.includes("ECONNREFUSED")) {
      logger.error("   → Cannot reach MongoDB. Check your IP is whitelisted in Atlas → Network Access");
    } else if (err.message.includes("querySrv")) {
      logger.error("   → DNS lookup failed. Check the cluster URL in MONGODB_URI");
    }

    // In development — warn and continue with mock data
    // In production — crash immediately so the issue is obvious
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    } else {
      logger.warn("⚠️  Continuing without database — using mock/in-memory data");
    }
  }

  mongoose.connection.on("disconnected", () => logger.warn("⚠️  MongoDB disconnected"));
  mongoose.connection.on("reconnected",  () => logger.info("✅ MongoDB reconnected"));
  mongoose.connection.on("error",        (e) => logger.error(`MongoDB error: ${e.message}`));
}

module.exports = connectDB;