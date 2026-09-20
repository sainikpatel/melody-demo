"use client";

import Link from "next/link";
import { Tractor, Menu, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useStore();
  
  const pendingOrdersCount = orders.filter(o => o.status === "PLACED" || o.status === "CONFIRMED").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="sticky top-14 z-40 bg-[#1e293b] text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-300 hover:text-white">
              <Menu size={24} />
            </button>
            <Link href="/farmer" className="font-bold text-xl text-amber-500 tracking-tight flex items-center gap-2">
              <Tractor size={24} /> Farmer Portal
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/farmer" 
              className={`text-sm font-medium transition-colors ${pathname === '/farmer' ? 'text-amber-500' : 'text-slate-300 hover:text-white'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/farmer/orders" 
              className={`text-sm font-medium transition-colors relative ${pathname === '/farmer/orders' ? 'text-amber-500' : 'text-slate-300 hover:text-white'}`}
            >
              Orders
              {pendingOrdersCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </Link>
            <Link 
              href="/farmer/products" 
              className={`text-sm font-medium transition-colors ${pathname === '/farmer/products' ? 'text-amber-500' : 'text-slate-300 hover:text-white'}`}
            >
              Inventory
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-slate-300 hover:text-white relative">
              <Bell size={20} />
              {pendingOrdersCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
