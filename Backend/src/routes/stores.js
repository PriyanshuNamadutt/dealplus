const express = require("express");
const router = express.Router();

const STORES = [
  { id: "amazon",    name: "Amazon India",      url: "https://amazon.in",          logo: "🛒", color: "#FF9900", active: true,  categories: ["all"] },
  { id: "flipkart",  name: "Flipkart",           url: "https://flipkart.com",       logo: "📦", color: "#2874f0", active: true,  categories: ["all"] },
  { id: "myntra",    name: "Myntra",             url: "https://myntra.com",         logo: "👗", color: "#FF3F6C", active: true,  categories: ["fashion", "footwear"] },
  { id: "croma",     name: "Croma",              url: "https://croma.com",          logo: "🏪", color: "#ED3237", active: true,  categories: ["electronics"] },
  { id: "reliance",  name: "Reliance Digital",   url: "https://reliancedigital.in", logo: "🏬", color: "#2563EB", active: true,  categories: ["electronics"] },
  { id: "nykaa",     name: "Nykaa",              url: "https://nykaa.com",          logo: "💄", color: "#FC2779", active: true,  categories: ["beauty", "fashion"] },
  { id: "tatacliq",  name: "Tata CLiQ",          url: "https://tatacliq.com",       logo: "🎁", color: "#E3000B", active: false, categories: ["all"] },
  { id: "snapdeal",  name: "Snapdeal",           url: "https://snapdeal.com",       logo: "🔖", color: "#E40046", active: false, categories: ["all"] },
  { id: "meesho",    name: "Meesho",             url: "https://meesho.com",         logo: "🛍️", color: "#9747FF", active: false, categories: ["fashion"] },
  { id: "ajio",      name: "AJIO",               url: "https://ajio.com",           logo: "👔", color: "#111111", active: false, categories: ["fashion"] },
];

/** GET /api/stores — list all stores */
router.get("/", (req, res) => {
  const { active } = req.query;
  const stores = active === "true"
    ? STORES.filter(s => s.active)
    : STORES;
  res.json({ success: true, total: stores.length, data: stores });
});

/** GET /api/stores/:id — single store info */
router.get("/:id", (req, res) => {
  const store = STORES.find(s => s.id === req.params.id);
  if (!store) return res.status(404).json({ success: false, error: "Store not found." });
  res.json({ success: true, data: store });
});

module.exports = router;