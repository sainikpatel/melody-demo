"use client";

import { useStore } from "@/context/StoreContext";
import { Truck, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DriverDashboard() {
  const { orders } = useStore();
  const router = useRouter();
  
  // Filter for demo driver d1
  const assignedOrders = orders.filter(o => o.driverId === "d1");
  const activeOrders = assignedOrders.filter(o => ["READY_FOR_PICKUP", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(o.status));
  const completedOrders = assignedOrders.filter(o => o.status === "DELIVERED");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Driver Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-50 text-blue-500">
            <Truck size={28} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Active Deliveries</div>
            <div className="text-2xl font-bold text-slate-900">{activeOrders.length}</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-500">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Completed Today</div>
            <div className="text-2xl font-bold text-slate-900">{completedOrders.length}</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-amber-50 text-amber-500">
            <MapPin size={28} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">Distance Covered</div>
            <div className="text-2xl font-bold text-slate-900">42 km</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to hit the road?</h2>
        <p className="text-slate-500 mb-8">You have {activeOrders.length} active delivery tasks pending. Check your deliveries page to start navigation and update status.</p>
        <button 
          onClick={() => router.push("/driver/deliveries")}
          className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors items-center gap-2"
        >
          View Deliveries <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
