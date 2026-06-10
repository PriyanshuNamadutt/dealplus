/**
 * Format a number as Indian Rupees (₹).
 * Examples:
 *   formatPrice(24990)  → "₹24,990"
 *   formatPrice(134900) → "₹1,34,900"
 *   formatPrice(null)   → "N/A"
 */
export function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,   // No paise — cleaner for product prices
  }).format(price);
}

/**
 * Compact review count.
 * Examples:
 *   formatReviews(42310)  → "42.3k"
 *   formatReviews(1200000)→ "1.2M"
 */
export function formatReviews(count) {
  if (!count) return "0";
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000)     return (count / 1_000).toFixed(1) + "k";
  return count.toString();
}

/**
 * Truncate a string to maxLength characters, appending "…".
 */
export function truncate(str, maxLength = 60) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
}