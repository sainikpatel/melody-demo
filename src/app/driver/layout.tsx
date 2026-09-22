"use client";

import Link from "next/link";
import { Truck, Navigation, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { orders } = useStore();

  const activeDeliveriesCount = orders.filter(
    (o) =>
      o.status === "READY_FOR_PICKUP" ||
      o.status === "PICKED_UP" ||
      o.status === "OUT_FOR_DELIVERY"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f3eb] flex flex-col">
      <nav className="sticky top-0 z-40 bg-[#0d2818] text-white border-b border-white/10 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/driver"
              className="font-display font-black text-xl tracking-tight flex items-center gap-2 text-[#d4a852] hover:text-[#e0b96b] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white">
                <Truck size={18} />
              </div>
              <span>Driver Portal</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <Link
                href="/driver"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  pathname === "/driver"
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-emerald-100/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/driver/deliveries"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all relative flex items-center gap-1.5 ${
                  pathname === "/driver/deliveries"
                    ? "bg-[#2d6a4f] text-white shadow-sm"
                    : "text-emerald-100/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Navigation size={13} />
                Deliveries
                {activeDeliveriesCount > 0 && (
                  <span className="bg-[#d4a852] text-[#1b2e1c] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {activeDeliveriesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-bold">
                RK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-emerald-100 leading-none">
                  Ramesh Kumar
                </p>
                <p className="text-[10px] text-emerald-200/60 mt-0.5 leading-none">
                  EV Scooter (MH 12 AB 1234)
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">{children}</div>
    </div>
  );
}
