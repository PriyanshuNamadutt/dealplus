import { useState } from "react";
import React from "react";

/**
 * AuthModal
 * Full sign-in / sign-up modal overlay.
 *
 * Props:
 *   isOpen    {boolean}
 *   onClose   {function}
 *   onLogin   {function}   async ({ email, password }) → { success, error }
 *   onRegister{function}   async ({ name, email, password }) → { success, error }
 *   authError {string|null}
 *   loading   {boolean}
 */
export default function AuthModal({ isOpen, onClose, onLogin, onRegister, authError, loading }) {
  const [mode,     setMode]     = useState("login");   // "login" | "register"
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [localErr, setLocalErr] = useState("");

  if (!isOpen) return null;

  const reset = () => {
    setName(""); setEmail(""); setPassword("");
    setLocalErr(""); setShowPwd(false);
  };

  const switchMode = (m) => { setMode(m); reset(); };

  const validate = () => {
    if (!email.includes("@"))      { setLocalErr("Enter a valid email address."); return false; }
    if (password.length < 6)       { setLocalErr("Password must be at least 6 characters."); return false; }
    if (mode === "register" && !name.trim()) { setLocalErr("Please enter your name."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setLocalErr("");
    if (!validate()) return;

    const result = mode === "login"
      ? await onLogin({ email, password })
      : await onRegister({ name, email, password });

    if (result.success) { reset(); onClose(); }
    // Error is shown via authError prop from useAuth
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  const errorMsg = localErr || authError;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(15,14,40,0.55)",
          backdropFilter: "blur(4px)", zIndex: 999,
        }}
      />

      {/* ── Modal panel ── */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 1000,
        background: "#fff", borderRadius: 24,
        padding: "40px 36px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 24px 64px rgba(99,102,241,0.22)",
      }}>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 18,
            background: "#F3F4F6", border: "none", borderRadius: 8,
            width: 32, height: 32, fontSize: 18, cursor: "pointer",
            color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, margin: "0 auto 12px",
            background: "linear-gradient(135deg, #6366f1, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 900, color: "#fff",
          }}>D</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1e1b4b" }}>
            {mode === "login" ? "Welcome back!" : "Create account"}
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#9CA3AF" }}>
            {mode === "login"
              ? "Sign in to track deals & price alerts"
              : "Join 5 lakh+ smart shoppers on DealPlus"}
          </p>
        </div>

        {/* Mode tabs */}
        <div style={{
          display: "flex", background: "#F3F4F6", borderRadius: 12,
          padding: 4, marginBottom: 24,
        }}>
          {["login", "register"].map(m => (
            <button key={m} onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: "9px 0", borderRadius: 9, border: "none",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: mode === m ? "#fff" : "transparent",
                color:      mode === m ? "#6366f1" : "#9CA3AF",
                boxShadow:  mode === m ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <Field label="Full Name" value={name} onChange={setName}
              placeholder="Rahul Sharma" type="text" onKeyDown={handleKey} />
          )}
          <Field label="Email" value={email} onChange={setEmail}
            placeholder="you@example.com" type="email" onKeyDown={handleKey} />
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                onKeyDown={handleKey}
                style={inputStyle}
              />
              <button
                type="button" onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, color: "#9CA3AF", padding: 0,
                }}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <div style={{
            marginTop: 14, padding: "10px 14px",
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 10, fontSize: 13, color: "#DC2626",
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", marginTop: 22, padding: "14px 0",
            background: loading ? "#c7d2fe" : "linear-gradient(135deg, #6366f1, #8B5CF6)",
            border: "none", borderRadius: 12, color: "#fff",
            fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {loading
            ? "Please wait…"
            : mode === "login" ? "Sign In →" : "Create Account →"}
        </button>

        {/* Social login hint */}
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>or continue with</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Google",   icon: "G", bg: "#fff", border: "#E5E7EB", color: "#374151" },
              { label: "Facebook", icon: "f", bg: "#1877F2", border: "#1877F2", color: "#fff" },
            ].map(s => (
              <button key={s.label}
                onClick={() => setLocalErr("Social login — coming soon!")}
                style={{
                  flex: 1, padding: "10px 0", background: s.bg,
                  border: `1.5px solid ${s.border}`, borderRadius: 10,
                  fontSize: 13, fontWeight: 700, color: s.color, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                <span style={{ fontWeight: 900 }}>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forgot password */}
        {mode === "login" && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onClick={() => setLocalErr("Password reset email sent! (feature coming soon)")}
              style={{ background: "none", border: "none", fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 600 }}
            >
              Forgot password?
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Small helper components ───────────────────────────────────────────
const inputStyle = {
  width: "100%", boxSizing: "border-box",
  padding: "11px 14px", border: "1.5px solid #E5E7EB",
  borderRadius: 10, fontSize: 14, color: "#1e1b4b",
  outline: "none", background: "#FAFAFA",
};

function Field({ label, value, onChange, placeholder, type, onKeyDown }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        style={inputStyle}
        onFocus={e  => (e.target.style.borderColor = "#6366f1")}
        onBlur={e   => (e.target.style.borderColor = "#E5E7EB")}
      />
    </div>
  );
}