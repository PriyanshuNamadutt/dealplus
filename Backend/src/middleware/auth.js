const jwt = require("jsonwebtoken");

/**
 * Protect routes that need a logged-in user.
 * Attach decoded payload to req.user.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }
};

/**
 * Generate a signed JWT (used in auth controller)
 */
const signToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", { expiresIn });

module.exports = { protect, signToken };