"use client";

import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/customer/ProductCard";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  Leaf,
  Zap,
  ShieldCheck,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useState, useMemo } from "react";

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Top Rated", value: "rated" },
];

const CATEGORY_EMOJI: Record<string, string> = {
  All: "🛒",
  Vegetables: "🥦",
  Fruits: "🍎",
  "Leafy Greens": "🥬",
  Dairy: "🥛",
  "Honey & Spices": "🍯",
};

export default function ProductsPage() {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rated") result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Shop Banner ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 70%, #86efac 100%)",
        }}
        className="relative overflow-hidden border-b border-emerald-200"
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-8">

          <div>
            {/* Top label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                <Leaf size={12} className="text-emerald-600" />
                Farm Fresh · Harvested to Order
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                <Tag size={12} />
                Best Prices Guaranteed
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-1">
              Shop Fresh Produce
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-xl">
              {filteredProducts.length} products · straight from verified farms · zero middlemen
            </p>

            {/* Search Bar */}
            <div className="flex items-center gap-3 max-w-lg bg-white border border-emerald-300 rounded-2xl px-4 py-3 shadow-md shadow-emerald-100 focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
              <Search size={18} className="text-emerald-500 shrink-0" />
              <input
                type="text"
                placeholder="Search tomatoes, spinach, A2 milk…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 text-sm font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: Zap, label: "Harvested within 24h" },
                { icon: ShieldCheck, label: "100% vetted farmers" },
                { icon: TrendingUp, label: "80%+ farmer payout" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800"
                >
                  <Icon size={14} className="text-emerald-600" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo strip */}
        <div
          className="text-center text-xs font-bold py-2 tracking-wide"
          style={{ background: "#059669", color: "#fff" }}
        >
          🎉 Free delivery on orders above ₹499 · Use code&nbsp;
          <span className="underline underline-offset-2">FRESH50</span>
          &nbsp;for 10% off your first order
        </div>
      </div>

      {/* ── Filters + Grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category chips + sort row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200"
                    : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                <span>{CATEGORY_EMOJI[cat] ?? "🌿"}</span>
                {cat}
                {selectedCategory === cat && products.filter(p => cat === "All" || p.category === cat).length > 0 && (
                  <span className="ml-1 bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={15} className="text-slate-400" />
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 pl-3 pr-8 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-sm"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 font-medium mb-4">
          Showing <span className="font-bold text-slate-700">{filteredProducts.length}</span> products
          {selectedCategory !== "All" && (
            <> in <span className="font-bold text-emerald-700">{selectedCategory}</span></>
          )}
          {searchQuery && (
            <> for <span className="font-bold text-slate-700">&quot;{searchQuery}&quot;</span></>
          )}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🥦</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Try adjusting your search or switching categories to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-5 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

