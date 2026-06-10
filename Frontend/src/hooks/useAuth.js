import { useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../services/api";

const TOKEN_KEY = "dealplus_token";

/**
 * useAuth
 * Manages sign-in / sign-up / sign-out state.
 *
 * Returns:
 *   user         — current user object or null
 *   token        — JWT string or null
 *   loading      — initial profile load in progress
 *   authError    — last error message
 *   login()      — call with { email, password }
 *   register()   — call with { name, email, password }
 *   logout()     — clears everything
 */
export function useAuth() {
  const [user,      setUser]      = useState(null);
  const [token,     setToken]     = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading,   setLoading]   = useState(false);
  const [authError, setAuthError] = useState(null);

  // On mount — if we have a stored token, fetch profile to verify it's still valid
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getProfile(token)
      .then(res => setUser(res.data))
      .catch(() => {
        // Token expired or invalid — clear it
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const _saveSession = (jwt, userData) => {
    localStorage.setItem(TOKEN_KEY, jwt);
    setToken(jwt);
    setUser(userData);
    setAuthError(null);
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await loginUser({ email, password });
      _saveSession(res.token, res.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message || "Login failed. Check your credentials.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await registerUser({ name, email, password });
      _saveSession(res.token, res.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message || "Registration failed. Try again.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthError(null);
  };

  return { user, token, loading, authError, login, register, logout };
}