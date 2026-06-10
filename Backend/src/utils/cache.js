const NodeCache = require("node-cache");
const logger = require("./logger");

const TTL = parseInt(process.env.CACHE_TTL_SECONDS || "300");

const cache = new NodeCache({ stdTTL: TTL, checkperiod: 60 });

const cacheService = {
  /**
   * Get a cached value. Returns null on miss.
   */
  get(key) {
    const val = cache.get(key);
    if (val !== undefined) {
      logger.info(`Cache HIT: ${key}`);
      return val;
    }
    logger.info(`Cache MISS: ${key}`);
    return null;
  },

  /**
   * Set a value. ttl overrides default.
   */
  set(key, value, ttl = TTL) {
    cache.set(key, value, ttl);
    logger.info(`Cache SET: ${key} (TTL ${ttl}s)`);
  },

  /**
   * Manually invalidate a key.
   */
  del(key) {
    cache.del(key);
    logger.info(`Cache DEL: ${key}`);
  },

  /**
   * Wrap an async function — returns cached result if available.
   *   const data = await cacheService.wrap("key", () => fetchExpensiveData(), 600);
   */
  async wrap(key, fn, ttl = TTL) {
    const cached = this.get(key);
    if (cached !== null) return cached;
    const result = await fn();
    this.set(key, result, ttl);
    return result;
  },

  stats() {
    return cache.getStats();
  },
};

module.exports = cacheService;