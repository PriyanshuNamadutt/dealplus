import React from "react";

/**
 * About page
 * Full story of DealPlus — mission, how it works, team, and FAQ.
 *
 * Props:
 *   onNavigate  {function}  For CTA buttons that switch pages
 */
export default function About({ onNavigate }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)",
        padding: "80px 32px 72px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(139,92,246,0.15)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"rgba(245,158,11,0.1)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <span style={{
            display:"inline-block", background:"rgba(99,102,241,0.3)", border:"1px solid rgba(139,92,246,0.5)",
            borderRadius:100, padding:"6px 18px", fontSize:12, fontWeight:700, color:"#a5b4fc", marginBottom:20,
          }}>
            🇮🇳 Made in India · For Indian Shoppers
          </span>
          <h1 style={{ fontSize:48, fontWeight:900, color:"#fff", margin:"0 0 20px", lineHeight:1.1, letterSpacing:-1.5 }}>
            We help you shop <span style={{ color:"#F59E0B" }}>smarter</span>,<br />not harder.
          </h1>
          <p style={{ fontSize:18, color:"#a5b4fc", lineHeight:1.7, margin:"0 0 36px" }}>
            DealPlus scans prices from 50+ stores every hour so you always know
            you're paying the best price — whether it's a ₹299 charger or a ₹1,50,000 laptop.
          </p>
          <button
            onClick={() => onNavigate("home")}
            style={{
              background:"linear-gradient(135deg,#6366f1,#8B5CF6)", border:"none", borderRadius:12,
              color:"#fff", fontSize:15, fontWeight:700, padding:"14px 36px", cursor:"pointer",
            }}
          >
            Start Comparing →
          </button>
        </div>
      </div>

      {/* ── Mission numbers ── */}
      <div style={{ background:"#F9FAFB", padding:"48px 32px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24 }}>
          {[
            { value:"50+",    label:"Stores Connected",   icon:"🏪", desc:"From Amazon to Meesho" },
            { value:"2M+",    label:"Products Tracked",   icon:"📦", desc:"Updated every hour"    },
            { value:"₹12Cr+", label:"Saved by Users",     icon:"💰", desc:"In the last 12 months" },
            { value:"4.9★",   label:"App Store Rating",   icon:"⭐", desc:"Based on 28,000 reviews"},
            { value:"3 sec",  label:"Avg Search Time",    icon:"⚡", desc:"Blazing fast results"   },
            { value:"0 ₹",    label:"Free Forever",       icon:"🎁", desc:"No hidden charges"     },
          ].map(s => (
            <div key={s.label} style={{
              background:"#fff", borderRadius:16, padding:"24px 20px", textAlign:"center",
              border:"1.5px solid #e8eaf6", boxShadow:"0 4px 16px rgba(99,102,241,0.05)",
            }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:28, fontWeight:900, color:"#6366f1", lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1e1b4b", margin:"6px 0 4px" }}>{s.label}</div>
              <div style={{ fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div style={{ padding:"64px 32px", background:"#fff" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontSize:36, fontWeight:900, color:"#1e1b4b", margin:"0 0 12px" }}>
              How DealPlus Works
            </h2>
            <p style={{ fontSize:16, color:"#6B7280" }}>
              Three simple steps between you and the best price.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:32 }}>
            {[
              {
                step:"01", icon:"🔍", title:"You Search",
                body:"Type any product — phone, shoes, appliance. Our engine understands natural language.",
              },
              {
                step:"02", icon:"⚡", title:"We Compare",
                body:"We hit 50+ store APIs simultaneously and collect real-time prices, ratings, and availability.",
              },
              {
                step:"03", icon:"🛒", title:"You Save",
                body:"Results appear sorted by price. Click Buy Now and land directly on the store's product page.",
              },
            ].map(s => (
              <div key={s.step} style={{
                background:"linear-gradient(135deg,#fafbff,#fff)", borderRadius:20,
                border:"1.5px solid #e8eaf6", padding:"32px 28px",
                boxShadow:"0 4px 24px rgba(99,102,241,0.06)",
              }}>
                <div style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  width:48, height:48, borderRadius:14,
                  background:"linear-gradient(135deg,#6366f1,#8B5CF6)", marginBottom:16,
                  fontSize:22,
                }}>
                  {s.icon}
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:"#a5b4fc", letterSpacing:2, marginBottom:8 }}>
                  STEP {s.step}
                </div>
                <h3 style={{ fontSize:20, fontWeight:800, color:"#1e1b4b", margin:"0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize:14, color:"#6B7280", lineHeight:1.7, margin:0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stores we track ── */}
      <div style={{ padding:"56px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:32, fontWeight:900, color:"#1e1b4b", margin:"0 0 12px" }}>
            Stores We Track
          </h2>
          <p style={{ fontSize:15, color:"#6B7280", margin:"0 0 40px" }}>
            We compare prices from every major Indian and global e-commerce platform.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}>
            {[
              { name:"Amazon India",      url:"https://amazon.in",           color:"#FF9900", logo:"🛒" },
              { name:"Flipkart",          url:"https://flipkart.com",        color:"#2874f0", logo:"📦" },
              { name:"Myntra",            url:"https://myntra.com",          color:"#FF3F6C", logo:"👗" },
              { name:"Croma",             url:"https://croma.com",           color:"#ED3237", logo:"🏪" },
              { name:"Reliance Digital",  url:"https://reliancedigital.in",  color:"#2563EB", logo:"🏬" },
              { name:"Nykaa",             url:"https://nykaa.com",           color:"#FC2779", logo:"💄" },
              { name:"Tata CLiQ",         url:"https://tatacliq.com",        color:"#E3000B", logo:"🎁" },
              { name:"Snapdeal",          url:"https://snapdeal.com",        color:"#E40046", logo:"🔖" },
              { name:"Meesho",            url:"https://meesho.com",          color:"#9747FF", logo:"🛍️" },
              { name:"AJIO",              url:"https://ajio.com",            color:"#111111", logo:"👔" },
            ].map(store => (
              <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  background:"#fff", border:`1.5px solid ${store.color}30`,
                  borderRadius:12, padding:"10px 18px", textDecoration:"none",
                  transition:"all 0.2s", boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = store.color;
                  e.currentTarget.style.boxShadow = `0 4px 16px ${store.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${store.color}30`;
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                }}
              >
                <span style={{ fontSize:18 }}>{store.logo}</span>
                <span style={{ fontSize:13, fontWeight:700, color:store.color }}>{store.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div style={{ padding:"64px 32px", background:"#fff" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontSize:32, fontWeight:900, color:"#1e1b4b", margin:"0 0 12px" }}>
              Meet the Team
            </h2>
            <p style={{ fontSize:15, color:"#6B7280" }}>
              Built by shoppers who were tired of visiting 10 tabs to find the best price.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:24 }}>
            {[
              { name:"Arjun Sharma",    role:"CEO & Co-Founder",        avatar:"👨‍💼", location:"Delhi" },
              { name:"Priya Mehta",     role:"CTO & Co-Founder",        avatar:"👩‍💻", location:"Bangalore" },
              { name:"Rahul Verma",     role:"Head of Partnerships",    avatar:"🤝", location:"Mumbai" },
              { name:"Sneha Kapoor",    role:"Lead Designer",           avatar:"🎨", location:"Pune" },
            ].map(member => (
              <div key={member.name} style={{
                background:"linear-gradient(135deg,#fafbff,#fff)", borderRadius:20,
                border:"1.5px solid #e8eaf6", padding:"28px 20px", textAlign:"center",
              }}>
                <div style={{
                  width:64, height:64, borderRadius:20, margin:"0 auto 16px",
                  background:"linear-gradient(135deg,#EEF2FF,#e0e7ff)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:32,
                }}>
                  {member.avatar}
                </div>
                <div style={{ fontSize:15, fontWeight:800, color:"#1e1b4b", marginBottom:4 }}>{member.name}</div>
                <div style={{ fontSize:12, fontWeight:600, color:"#6366f1", marginBottom:6 }}>{member.role}</div>
                <div style={{ fontSize:11, color:"#9CA3AF" }}>📍 {member.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ padding:"56px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <h2 style={{ fontSize:32, fontWeight:900, color:"#1e1b4b", textAlign:"center", margin:"0 0 40px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[
              {
                q: "Is DealPlus free to use?",
                a: "100% free, always. We earn a small affiliate commission when you buy through our links — at no extra cost to you. This keeps the lights on.",
              },
              {
                q: "How often are prices updated?",
                a: "We refresh prices every 15–60 minutes depending on the store. For high-demand products, we update more frequently. You can also set a Price Alert to be notified instantly.",
              },
              {
                q: "Do you store my personal data?",
                a: "We only store what's needed for Price Alerts (your email and target price). We never sell your data. Read our Privacy Policy for details.",
              },
              {
                q: "Why does the price differ when I click Buy Now?",
                a: "Prices can change by the second on e-commerce platforms. We update every 30 minutes but the store may have changed it between updates. Always verify the final price at checkout.",
              },
              {
                q: "Can I track price history?",
                a: "Yes! Click on any product to see a 30-day price chart. This tells you whether the current price is actually a deal or has been lower before.",
              },
              {
                q: "How do I add DealPlus to my phone?",
                a: "Open dealplus.in in Chrome on Android or Safari on iPhone, then tap 'Add to Home Screen'. Works like a native app!",
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        padding:"64px 32px", textAlign:"center",
        background:"linear-gradient(135deg,#6366f1,#8B5CF6)",
      }}>
        <h2 style={{ fontSize:36, fontWeight:900, color:"#fff", margin:"0 0 16px", letterSpacing:-1 }}>
          Ready to stop overpaying?
        </h2>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.8)", margin:"0 0 32px" }}>
          Join 5 lakh+ Indians who shop smarter with DealPlus.
        </p>
        <button
          onClick={() => onNavigate("home")}
          style={{
            background:"#fff", border:"none", borderRadius:12,
            color:"#6366f1", fontSize:16, fontWeight:800,
            padding:"16px 40px", cursor:"pointer",
          }}
        >
          Compare Prices Now →
        </button>
      </div>

    </div>
  );
}

// ── Collapsible FAQ item ──────────────────────────────────────────────
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background:"#fff", borderRadius:14, border:"1.5px solid #e8eaf6",
      overflow:"hidden", transition:"box-shadow 0.2s",
      boxShadow: open ? "0 4px 20px rgba(99,102,241,0.12)" : "none",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"18px 22px", background:"none", border:"none", cursor:"pointer", textAlign:"left",
        }}
      >
        <span style={{ fontSize:15, fontWeight:700, color:"#1e1b4b" }}>{question}</span>
        <span style={{
          fontSize:18, color:"#6366f1", fontWeight:700, flexShrink:0, marginLeft:16,
          transform: open ? "rotate(45deg)" : "rotate(0deg)", transition:"transform 0.2s",
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding:"0 22px 20px", fontSize:14, color:"#6B7280", lineHeight:1.7 }}>
          {answer}
        </div>
      )}
    </div>
  );
}

// Need useState for FAQ accordion
import { useState } from "react";