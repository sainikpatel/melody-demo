"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart, Heart, Search, Menu } from "lucide-react";

export function CustomerNavbar() {
  const { cart } = useStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-14 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-slate-600 hover:text-emerald-600">
            <Menu size={24} />
          </button>
          <Link href="/customer" className="font-bold text-xl text-emerald-600 tracking-tight">
            Melody<span className="text-emerald-400">.</span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for fresh tomatoes, spinach..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/customer/orders" className="hidden md:flex text-sm font-medium text-slate-600 hover:text-emerald-600">
            My Orders
          </Link>
          <Link href="/customer" className="hidden md:flex text-sm font-medium text-slate-600 hover:text-emerald-600">
            Wishlist
          </Link>
          <Link href="/customer/cart" className="relative text-slate-600 hover:text-emerald-600">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
