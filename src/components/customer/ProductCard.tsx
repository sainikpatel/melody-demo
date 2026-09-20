"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Star, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { farmers, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const farmer = farmers.find(f => f.id === product.farmerId);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
      {/* Product Image */}
      <Link href={`/customer/products/${product.id}`} className="relative h-52 overflow-hidden block bg-slate-50">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isOrganic && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              🌱 Organic
            </span>
          )}
          {product.stock <= 30 && (
            <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Only {product.stock} left
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm border border-slate-100">
          {product.category}
        </span>
      </Link>
      
      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-1 text-xs text-slate-500 mb-1">
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="truncate">{farmer?.name || "Verified Farm"}</span>
          </div>
          {farmer?.rating && (
            <div className="flex items-center gap-0.5 text-amber-500 font-semibold shrink-0">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{farmer.rating}</span>
            </div>
          )}
        </div>

        <Link href={`/customer/products/${product.id}`} className="font-bold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1 text-base mb-1">
          {product.name}
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing & Add Button */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900">₹{product.price}</span>
              <span className="text-xs text-slate-400 font-medium">/ {product.unit}</span>
            </div>
          </div>
          
          <button 
            onClick={handleAdd}
            className={`h-10 px-4 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
              added 
                ? "bg-emerald-600 text-white" 
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white"
            }`}
          >
            {added ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <Plus size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
