/**
 * Static hot-deals shown on the homepage before the user searches.
 * buyUrl fields are real affiliate-style deep links per store.
 * In production, replace this with: GET /api/search?q=trending
 */
export const HOT_DEALS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    stores: [
      {
        store: "Amazon", logo: "🛒", price: 24990, rating: 4.8, reviews: 42310,
        badge: "Prime",
        buyUrl: "https://www.amazon.in/s?k=Sony+WH-1000XM5",
      },
      {
        store: "Flipkart", logo: "📦", price: 25999, rating: 4.7, reviews: 18920,
        badge: "No Cost EMI",
        buyUrl: "https://www.flipkart.com/search?q=Sony+WH-1000XM5",
      },
      {
        store: "Croma", logo: "🏪", price: 26490, rating: 4.6, reviews: 5420,
        badge: "",
        buyUrl: "https://www.croma.com/searchB?q=Sony+WH-1000XM5",
      },
    ],
  },
  {
    id: 2,
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
    stores: [
      {
        store: "Amazon", logo: "🛒", price: 134900, rating: 4.9, reviews: 87430,
        badge: "Prime",
        buyUrl: "https://www.amazon.in/s?k=iPhone+15+Pro+Max+256GB",
      },
      {
        store: "Flipkart", logo: "📦", price: 134900, rating: 4.7, reviews: 62000,
        badge: "Bank Offer",
        buyUrl: "https://www.flipkart.com/search?q=iPhone+15+Pro+Max+256GB",
      },
      {
        store: "Reliance Digital", logo: "🏬", price: 135900, rating: 4.8, reviews: 31200,
        badge: "",
        buyUrl: "https://www.reliancedigital.in/search?q=iPhone+15+Pro+Max",
      },
    ],
  },
  {
    id: 3,
    title: "Nike Air Max 270 Men's Running Shoes",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    stores: [
      {
        store: "Nike.com", logo: "✔️", price: 12795, rating: 4.6, reviews: 29100,
        badge: "Official Store",
        buyUrl: "https://www.nike.com/in/search/results/?q=air+max+270",
      },
      {
        store: "Amazon", logo: "🛒", price: 11999, rating: 4.5, reviews: 44200,
        badge: "Deal",
        buyUrl: "https://www.amazon.in/s?k=Nike+Air+Max+270",
      },
      {
        store: "Myntra", logo: "👗", price: 12495, rating: 4.4, reviews: 21300,
        badge: "Extra 10% Off",
        buyUrl: "https://www.myntra.com/nike%20air%20max%20270",
      },
    ],
  },
  {
    id: 4,
    title: "Samsung 55\" 4K QLED Smart TV (2024)",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
    stores: [
      {
        store: "Samsung", logo: "📺", price: 79990, rating: 4.7, reviews: 11200,
        badge: "Official",
        buyUrl: "https://www.samsung.com/in/televisions-audio-video/televisions/",
      },
      {
        store: "Amazon", logo: "🛒", price: 74999, rating: 4.6, reviews: 28900,
        badge: "Lightning Deal",
        buyUrl: "https://www.amazon.in/s?k=Samsung+55+inch+4K+QLED",
      },
      {
        store: "Flipkart", logo: "📦", price: 76999, rating: 4.5, reviews: 19800,
        badge: "",
        buyUrl: "https://www.flipkart.com/search?q=Samsung+55+inch+4K+QLED+TV",
      },
    ],
  },
  {
    id: 5,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6L",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
    stores: [
      {
        store: "Amazon", logo: "🛒", price: 7499, rating: 4.7, reviews: 130500,
        badge: "Amazon's Choice",
        buyUrl: "https://www.amazon.in/s?k=Instant+Pot+Duo+7+in+1",
      },
      {
        store: "Flipkart", logo: "📦", price: 7799, rating: 4.6, reviews: 48000,
        badge: "",
        buyUrl: "https://www.flipkart.com/search?q=Instant+Pot+Duo+pressure+cooker",
      },
    ],
  },
  {
    id: 6,
    title: "Kindle Paperwhite 11th Gen 8GB — Waterproof, 300 ppi",
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    stores: [
      {
        store: "Amazon", logo: "🛒", price: 13999, rating: 4.8, reviews: 92400,
        badge: "Best Seller",
        buyUrl: "https://www.amazon.in/s?k=Kindle+Paperwhite+11th+Gen",
      },
      {
        store: "Flipkart", logo: "📦", price: 14499, rating: 4.7, reviews: 31200,
        badge: "",
        buyUrl: "https://www.flipkart.com/search?q=Kindle+Paperwhite+11th+gen",
      },
    ],
  },
  {
    id: 7,
    title: "Dyson V15 Detect Absolute Cordless Vacuum Cleaner",
    category: "Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    stores: [
      {
        store: "Dyson", logo: "✔️", price: 62900, rating: 4.8, reviews: 9800,
        badge: "Official",
        buyUrl: "https://www.dyson.in/vacuum-cleaners",
      },
      {
        store: "Amazon", logo: "🛒", price: 58999, rating: 4.7, reviews: 34200,
        badge: "Save ₹3900",
        buyUrl: "https://www.amazon.in/s?k=Dyson+V15+Detect",
      },
      {
        store: "Croma", logo: "🏪", price: 60490, rating: 4.6, reviews: 8100,
        badge: "",
        buyUrl: "https://www.croma.com/searchB?q=Dyson+V15",
      },
    ],
  },
  {
    id: 8,
    title: "Levi's 511 Slim Fit Men's Jeans",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
    stores: [
      {
        store: "Levi's", logo: "✔️", price: 4499, rating: 4.5, reviews: 67200,
        badge: "Official",
        buyUrl: "https://www.levi.in/search?q=511+slim",
      },
      {
        store: "Myntra", logo: "👗", price: 3999, rating: 4.4, reviews: 42100,
        badge: "Extra 10% Off",
        buyUrl: "https://www.myntra.com/levis%20511",
      },
      {
        store: "Amazon", logo: "🛒", price: 4199, rating: 4.3, reviews: 29800,
        badge: "",
        buyUrl: "https://www.amazon.in/s?k=Levis+511+slim+jeans",
      },
    ],
  },
];