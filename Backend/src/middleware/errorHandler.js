const logger = require("../utils/logger");

/**
 * 404 – route not found
 */
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

/**
 * Global error handler — always returns JSON
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== "production";

  logger.error(`[${status}] ${err.message} — ${req.method} ${req.originalUrl}`);

  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};

/**
 * Async wrapper — removes try/catch boilerplate from controllers
 *   router.get("/", asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { notFound, errorHandler, asyncHandler };