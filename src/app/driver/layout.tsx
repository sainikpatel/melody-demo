"use client";

import Link from "next/link";
import { Truck, Menu, Map, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { orders } = useStore();
  
  const activeDeliveriesCount = orders.filter(o => o.status === "READY_FOR_PICKUP" || o.status === "PICKED_UP" || o.status === "OUT_FOR_DELIVERY").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="sticky top-14 z-40 bg-blue-900 text-white border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-blue-300 hover:text-white">
              <Menu size={24} />
            </button>
            <Link href="/driver" className="font-bold text-xl text-blue-400 tracking-tight flex items-center gap-2">
              <Truck size={24} /> Driver Portal
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/driver" 
              className={`text-sm font-medium transition-colors ${pathname === '/driver' ? 'text-blue-400' : 'text-blue-200 hover:text-white'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/driver/deliveries" 
              className={`text-sm font-medium transition-colors relative ${pathname === '/driver/deliveries' ? 'text-blue-400' : 'text-blue-200 hover:text-white'}`}
            >
              Deliveries
              {activeDeliveriesCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeDeliveriesCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-blue-200">
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
