import { NAV_LINKS } from "../constants";
import React from "react";

/**
 * Navbar
 * Props:
 *   currentPage  {string}
 *   onNavigate   {function}
 *   user         {object|null}
 *   onOpenAuth   {function}
 *   onLogout     {function}
 */
export default function Navbar({ currentPage, onNavigate, user, onOpenAuth, onLogout }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid #e8eaf6",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 32px",
      }}>

        {/* Logo */}
        <button onClick={() => onNavigate("home")}
          style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <div style={{
            width:36, height:36, borderRadius:10, flexShrink:0,
            background:"linear-gradient(135deg,#6366f1,#8B5CF6)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, fontWeight:900, color:"#fff",
          }}>D</div>
          <span style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5, lineHeight:1 }}>
            <span style={{ color:"#6366f1" }}>Deal</span>
            <span style={{ color:"#F59E0B" }}>Plus</span>
          </span>
          <span style={{
            fontSize:10, background:"#FEF3C7", color:"#D97706",
            borderRadius:6, padding:"2px 7px", fontWeight:700, flexShrink:0,
          }}>BETA</span>
        </button>

        {/* Links + auth */}
        <div style={{ display:"flex", alignItems:"center", gap:2 }}>
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === item.page
              && item.label !== "Hot Deals"
              && item.label !== "Categories";
            return (
              <button key={item.label} onClick={() => onNavigate(item.page)}
                style={{
                  background: isActive ? "#EEF2FF" : "none",
                  border:"none", borderRadius:8,
                  fontSize:13, fontWeight:600,
                  color: isActive ? "#6366f1" : "#6B7280",
                  cursor:"pointer", padding:"8px 14px",
                  transition:"background 0.15s, color 0.15s",
                  whiteSpace:"nowrap",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background="#F3F4F6"; e.currentTarget.style.color="#374151"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background="none"; e.currentTarget.style.color="#6B7280"; }}}
              >{item.label}</button>
            );
          })}

          <div style={{ width:1, height:24, background:"#E5E7EB", margin:"0 8px", flexShrink:0 }} />

          {user ? (
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                background:"linear-gradient(135deg,#6366f1,#8B5CF6)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:15, fontWeight:800, color:"#fff",
              }}>
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div style={{ display:"flex", flexDirection:"column", lineHeight:1.3 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#1e1b4b" }}>
                  {user.name?.split(" ")[0] || "User"}
                </span>
                <button onClick={onLogout}
                  style={{ background:"none", border:"none", padding:0, fontSize:11, color:"#EF4444", cursor:"pointer", fontWeight:600, textAlign:"left" }}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>

    <button
      onClick={() => onNavigate("about")}
      style={{
        background:"#FFFFFF",
        border:"1px solid #E5E7EB",
        borderRadius:10,
        color:"#374151",
        fontSize:13,
        fontWeight:700,
        padding:"9px 20px",
        cursor:"pointer",
        transition:"all 0.2s",
        whiteSpace:"nowrap",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background="#F9FAFB";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background="#FFFFFF";
      }}
    >
      About
    </button>

    <button
      onClick={onOpenAuth}
      style={{
        background:"linear-gradient(135deg,#6366f1,#8B5CF6)",
        border:"none",
        borderRadius:10,
        color:"#fff",
        fontSize:13,
        fontWeight:700,
        padding:"9px 20px",
        cursor:"pointer",
        boxShadow:"0 2px 12px rgba(99,102,241,0.3)",
        transition:"opacity 0.2s",
        whiteSpace:"nowrap",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity="0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity="1")}
    >
      Sign In
    </button>

  </div>
)}
        </div>
      </div>
    </nav>
  );
}