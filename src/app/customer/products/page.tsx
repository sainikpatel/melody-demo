"use client";

import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/customer/ProductCard";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const { products, farmers } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
          <p className="text-slate-500 mt-1">Fresh from local farmers</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter size={16} /> Filters
          </button>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 px-4 py-2 pr-10 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? "bg-emerald-600 text-white" 
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
