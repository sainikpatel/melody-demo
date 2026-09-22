"use client";

import Link from "next/link";
import { Tractor, Bell, User, Sprout, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { orders } = useStore();

  const pendingOrdersCount = orders.filter(
    (o) => o.status === "PLACED" || o.status === "CONFIRMED"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f3eb] flex flex-col">
      <nav className="sticky top-0 z-40 bg-[#0d2818] text-white border-b border-white/10 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/farmer"
              className="font-display font-black text-xl tracking-tight flex items-center gap-2 text-[#d4a852] hover:text-[#e0b96b] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white">
                <Tractor size={18} />
              </div>
              <span>Farmer Portal</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <Link
                href="/farmer"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  pathname === "/farmer"
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-emerald-100/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/farmer/orders"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all relative flex items-center gap-1.5 ${
                  pathname === "/farmer/orders"
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-emerald-100/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <ClipboardList size={13} />
                Orders
                {pendingOrdersCount > 0 && (
                  <span className="bg-[#e07c3a] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </Link>
              <Link
                href="/farmer/products"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  pathname === "/farmer/products"
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-emerald-100/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Sprout size={13} />
                Inventory
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/farmer/orders"
              className="p-2 rounded-xl text-emerald-100/80 hover:text-white hover:bg-white/10 transition-colors relative"
            >
              <Bell size={18} />
              {pendingOrdersCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#e07c3a] rounded-full ring-2 ring-[#0d2818]" />
              )}
            </Link>

            <div className="flex items-center gap-2.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-bold">
                GV
              </div>
              <span className="text-xs font-semibold text-emerald-100 hidden sm:inline">
                Green Valley Farm
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
}
