const express = require("express");
const { body, validationResult } = require("express-validator");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

// In-memory store — swap for MongoDB/PostgreSQL in production
const alerts = new Map();
let alertIdCounter = 1;

/**
 * POST /api/alerts
 * Create a price drop alert.
 * Body: { productId, productTitle, targetPrice, email, storeId? }
 */
router.post(
  "/",
  [
    body("productId").trim().notEmpty(),
    body("productTitle").trim().notEmpty(),
    body("targetPrice").isFloat({ min: 1 }),
    body("email").isEmail().normalizeEmail(),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { productId, productTitle, targetPrice, email, storeId } = req.body;
    const id = alertIdCounter++;

    const alert = {
      id,
      productId,
      productTitle,
      targetPrice,
      email,
      storeId: storeId || "all",
      createdAt: new Date().toISOString(),
      triggered: false,
    };

    alerts.set(id, alert);

    // TODO: Store in DB, set up a cron job to check prices and email user
    // Libraries: node-cron + nodemailer

    res.status(201).json({
      success: true,
      message: `Alert set! We'll email ${email} when price drops below ₹${targetPrice}.`,
      data: alert,
    });
  })
);

/** GET /api/alerts?email=user@example.com */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, error: "email param required." });

    const userAlerts = [...alerts.values()].filter(a => a.email === email);
    res.json({ success: true, total: userAlerts.length, data: userAlerts });
  })
);

/** DELETE /api/alerts/:id */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!alerts.has(id)) {
      return res.status(404).json({ success: false, error: "Alert not found." });
    }
    alerts.delete(id);
    res.json({ success: true, message: "Alert deleted." });
  })
);

module.exports = router;