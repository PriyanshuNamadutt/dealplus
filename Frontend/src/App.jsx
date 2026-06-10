import { useState } from "react";
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Home      from "./pages/Home";
import About     from "./pages/About";
import { useAuth } from "./hooks/useAuth";
import React from "react";

/**
 * App — root component
 *
 * Handles:
 *  • Page routing  (home | about | alerts) via useState
 *  • Auth state    via useAuth hook
 *  • AuthModal     open/close
 *
 * To upgrade to React Router later:
 *   npm install react-router-dom
 *   Replace the switch below with <BrowserRouter><Routes>…
 */
export default function App() {
  const [page,          setPage]          = useState("home");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user, loading: authLoading, authError, login, register, logout } = useAuth();

  // ── Page renderer ─────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case "about":
        return <About onNavigate={setPage} />;
      case "alerts":
        return (
          <Home
            onNavigate={setPage}
            user={user}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        );
      default:
        return (
          <Home
            onNavigate={setPage}
            user={user}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        );
    }
  };

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", minHeight:"100vh", background:"#F9FAFB" }}>

      {/* ── Navbar — passes auth state and handlers ── */}
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={logout}
      />

      {/* ── Page content ── */}
      <main>{renderPage()}</main>

      {/* ── Footer ── */}
      <Footer onNavigate={setPage} />

      {/* ── Auth Modal — shown when Sign In is clicked ── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={login}
        onRegister={register}
        authError={authError}
        loading={authLoading}
      />
    </div>
  );
}