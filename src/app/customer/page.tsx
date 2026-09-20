"use client";

import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck, Search, Star, MapPin, Award } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/customer/ProductCard";
import { useState } from "react";

export default function CustomerHome() {
  const { products, farmers } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Leafy Greens", "Dairy", "Honey & Spices"];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-16 bg-slate-50 min-h-screen">
      {/* Melody Banner */}
      <section className="relative bg-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80" 
            alt="Farm landscape background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-md text-emerald-200 border border-emerald-700/50 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
              <Leaf size={14} className="text-emerald-400" />
              Direct Farm-to-Consumer Marketplace
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              Fresh harvest, straight from verified farms to your door.
            </h1>
            
            <p className="text-lg sm:text-xl text-emerald-100/90 mb-8 max-w-2xl leading-relaxed">
              Zero middlemen. 100% transparent organic produce. Support local farming families with every order.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <Search size={20} className="text-emerald-300 shrink-0" />
                <input 
                  type="text"
                  placeholder="Search fresh tomatoes, Alphonso mangoes, A2 milk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder:text-emerald-200/70 focus:outline-none text-sm font-medium"
                />
              </div>
              <Link 
                href="/customer/products" 
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-900/40 shrink-0"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Leaf, title: "100% Fresh Harvest", desc: "Harvested after order confirmation within 24 hours." },
            { icon: ShieldCheck, title: "Verified Farmers", desc: "Direct relationship with vetted local farm owners." },
            { icon: Truck, title: "Transparent Delivery", desc: "Real-time updates from farm pickup to your doorstep." },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-3.5 rounded-xl text-emerald-600 shrink-0">
                <feature.icon size={26} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900">Explore Categories</h2>
          <Link href="/customer/products" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-2.5 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                activeCategory === cat 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20" 
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Fresh Produce Grid */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {activeCategory === "All" ? "Today's Farm Fresh Produce" : `${activeCategory} Harvest`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Directly sourced from verified regional farms</p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">No products found matching your search or category filter.</p>
          </div>
        )}
      </section>

      {/* Verified Farmer Spotlight */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-800/50 px-3 py-1 rounded-full mb-2 border border-emerald-700/50">
                <Award size={14} /> Verified Partner Network
              </div>
              <h2 className="text-2xl md:text-3xl font-black">Meet Our Verified Farmers</h2>
              <p className="text-emerald-200/80 text-sm mt-1">Empowering local farming families with fair price realization.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {farmers.map(farmer => (
              <div key={farmer.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-400/30 flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star size={12} className="fill-amber-400" />
                    <span>{farmer.rating}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-white">{farmer.name}</h3>
                
                <div className="flex items-center gap-1 text-xs text-emerald-200/80 mt-2">
                  <MapPin size={13} className="shrink-0 text-emerald-400" />
                  <span className="truncate">{farmer.location}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Partner Since</span>
                  <span className="font-semibold text-emerald-200">{farmer.joinedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
