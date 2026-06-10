import { API_BASE_URL } from "../constants";

/**
 * Core fetch wrapper.
 * - Adds base URL
 * - Throws a friendly error on non-2xx responses
 * - Returns parsed JSON
 */
async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }

  return res.json();
}

// ── Search ───────────────────────────────────────────────────────────
export async function searchProducts(query, params = {}) {
  const qs = new URLSearchParams({ q: query, ...params }).toString();
  return apiFetch(`/search?${qs}`);
}

export async function fetchSuggestions(query) {
  const res = await apiFetch(`/search/suggestions?q=${encodeURIComponent(query)}`);
  return res.suggestions || [];
}

// ── Products ─────────────────────────────────────────────────────────
export async function fetchProduct(productId) {
  return apiFetch(`/products/${productId}`);
}

export async function fetchPriceHistory(productId, days = 30) {
  return apiFetch(`/products/${productId}/price-history?days=${days}`);
}

// ── Stores ────────────────────────────────────────────────────────────
export async function fetchStores(activeOnly = false) {
  return apiFetch(`/stores${activeOnly ? "?active=true" : ""}`);
}

// ── Alerts ────────────────────────────────────────────────────────────
export async function createAlert(payload) {
  return apiFetch("/alerts", { method: "POST", body: JSON.stringify(payload) });
}

export async function fetchAlerts(email) {
  return apiFetch(`/alerts?email=${encodeURIComponent(email)}`);
}

export async function deleteAlert(alertId) {
  return apiFetch(`/alerts/${alertId}`, { method: "DELETE" });
}

// ── Auth ──────────────────────────────────────────────────────────────
/**
 * Register a new user.
 * POST /api/auth/register
 * Body: { name, email, password }
 * Returns: { success, token, user }
 */
export async function registerUser(payload) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Log in with email + password.
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { success, token, user }
 */
export async function loginUser(payload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch the logged-in user's profile.
 * GET /api/auth/me
 * Requires a valid JWT passed as Authorization: Bearer <token>
 * Returns: { success, data: { id, name, email, createdAt } }
 */
export async function getProfile(token) {
  return apiFetch("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Health ────────────────────────────────────────────────────────────
export async function checkHealth() {
  return apiFetch("/health");
}