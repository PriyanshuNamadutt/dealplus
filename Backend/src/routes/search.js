const express = require("express");
const { query, validationResult } = require("express-validator");
const { aggregateSearch } = require("../services/aggregator");
const { asyncHandler } = require("../middleware/errorHandler");
const cache = require("../utils/cache");

const router = express.Router();

/**
 * GET /api/search
 * Query params:
 *   q        — search term (required)
 *   sortBy   — price_asc | price_desc | rating_desc | reviews_desc
 *   category — filter by category
 *   page     — pagination page (default 1)
 *   minPrice — minimum price filter
 *   maxPrice — maximum price filter
 */
router.get(
  "/",
  [
    query("q").trim().notEmpty().withMessage("Search term 'q' is required").isLength({ max: 200 }),
    query("sortBy").optional().isIn(["price_asc", "price_desc", "rating_desc", "reviews_desc"]),
    query("page").optional().isInt({ min: 1, max: 50 }).toInt(),
    query("minPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("maxPrice").optional().isFloat({ min: 0 }).toFloat(),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { q, sortBy = "price_asc", category, page = 1, minPrice, maxPrice } = req.query;

    let results = await aggregateSearch(q, { sortBy, page });

    // Filter by category
    if (category && category !== "All") {
      results = results.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range (based on best price)
    if (minPrice !== undefined) {
      results = results.filter(p => p.bestPrice !== null && p.bestPrice >= minPrice);
    }
    if (maxPrice !== undefined) {
      results = results.filter(p => p.bestPrice !== null && p.bestPrice <= maxPrice);
    }

    res.json({
      success: true,
      query: q,
      total: results.length,
      page,
      sortBy,
      data: results,
      meta: {
        cacheStats: cache.stats(),
        storesSearched: ["Amazon", "Flipkart", "Croma", "Reliance Digital", "Myntra"],
        timestamp: new Date().toISOString(),
      },
    });
  })
);

/**
 * GET /api/search/suggestions?q=ip
 * Autocomplete suggestions
 */
router.get(
  "/suggestions",
  asyncHandler(async (req, res) => {
    const { q = "" } = req.query;
    const SUGGESTIONS = [
      "iPhone 15", "iPhone 14", "Samsung Galaxy S24", "OnePlus 12",
      "Sony WH-1000XM5", "JBL Earphones", "Apple AirPods",
      "Nike Air Max", "Adidas Ultraboost", "Puma Running Shoes",
      "Instant Pot", "Dyson Vacuum", "Kindle Paperwhite",
      "MacBook Pro", "Dell XPS 15", "HP Envy Laptop",
      "Samsung 55 inch TV", "LG OLED TV",
    ];
    const matches = SUGGESTIONS.filter(s =>
      s.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 8);
    res.json({ success: true, suggestions: matches });
  })
);

module.exports = router;