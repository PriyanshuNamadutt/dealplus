const express  = require("express");
const { body, validationResult } = require("express-validator");
const { asyncHandler } = require("../middleware/errorHandler");
const { signToken, protect } = require("../middleware/auth");

const router = express.Router();

/**
 * In-memory user store for development.
 * ── REPLACE with Mongoose User model in production ──
 *
 *   const User = require("../models/User");
 *   // then use User.create(), User.findOne() etc.
 */
const users = new Map();   // email → { id, name, email, passwordHash, createdAt }
let   uid   = 1;

const bcryptjs = require("bcryptjs");

// ─────────────────────────────────────────────────────────────────────
//  POST /api/auth/register
// ─────────────────────────────────────────────────────────────────────
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ characters"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { name, email, password } = req.body;

    if (users.has(email))
      return res.status(409).json({ success: false, error: "Email already registered. Please sign in." });

    const passwordHash = await bcryptjs.hash(password, 12);
    const user = { id: uid++, name, email, passwordHash, createdAt: new Date().toISOString() };
    users.set(email, user);

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  })
);

// ─────────────────────────────────────────────────────────────────────
//  POST /api/auth/login
// ─────────────────────────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { email, password } = req.body;
    const user = users.get(email);

    if (!user)
      return res.status(401).json({ success: false, error: "No account found with this email." });

    const valid = await bcryptjs.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ success: false, error: "Incorrect password. Please try again." });

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    res.json({
      success: true,
      message: "Signed in successfully!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  })
);

// ─────────────────────────────────────────────────────────────────────
//  GET /api/auth/me   (protected)
// ─────────────────────────────────────────────────────────────────────
router.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware
    const user = users.get(req.user.email);
    if (!user)
      return res.status(404).json({ success: false, error: "User not found." });

    res.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
    });
  })
);

module.exports = router;