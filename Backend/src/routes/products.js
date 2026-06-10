const express = require("express");
const { param } = require("express-validator");
const { getAmazonProduct } = require("../services/adapters/amazon");
const { asyncHandler } = require("../middleware/errorHandler");
const cache = require("../utils/cache");

const router = express.Router();

/**
 * GET /api/products/:id
 * Fetch full product details + price comparison across stores.
 * :id is an Amazon ASIN for now (extend for other stores).
 */
router.get(
  "/:id",
  [param("id").trim().notEmpty().isAlphanumeric()],
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    const product = await cache.wrap(cacheKey, () => getAmazonProduct(id), 600);

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found." });
    }

    res.json({ success: true, data: product });
  })
);

/**
 * GET /api/products/:id/price-history
 * Returns last 30 days of price data (mock — integrate Keepa API for real data).
 */
router.get(
  "/:id/price-history",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const days = parseInt(req.query.days || "30");

    // Mock price history — replace with Keepa API: https://keepa.com/#!api
    const history = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 86400000).toISOString().split("T")[0],
      amazon: Math.round(2800 + Math.random() * 400),
      flipkart: Math.round(2900 + Math.random() * 350),
    }));

    res.json({
      success: true,
      productId: id,
      days,
      history,
      lowestEver: { price: 2799, date: "2024-11-15", store: "Amazon" },
    });
  })
);

module.exports = router;