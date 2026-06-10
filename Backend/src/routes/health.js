const express = require("express");
const cache = require("../utils/cache");
const router = express.Router();

/** GET /api/health — basic uptime + config status */
router.get("/", (req, res) => {
  const checks = {
    server: "ok",
    cache: "ok",
    rainforestApi: process.env.RAINFOREST_API_KEY ? "configured" : "missing_key",
    serpApi: process.env.SERPAPI_KEY ? "configured" : "missing_key",
  };

  const allOk = checks.server === "ok";

  res.status(allOk ? 200 : 503).json({
    status: allOk ? "healthy" : "degraded",
    uptime: Math.round(process.uptime()) + "s",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    checks,
    cacheStats: cache.stats(),
  });
});

module.exports = router;