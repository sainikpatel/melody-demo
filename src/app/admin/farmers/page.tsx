"use client";

import { useStore } from "@/context/StoreContext";
import { ShieldCheck, MapPin, Search } from "lucide-react";

export default function AdminFarmersPage() {
  const { farmers } = useStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Verified Farmers</h1>
          <p className="text-slate-500 mt-1">Manage farm partners and verification status</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search farmers..." 
            className="w-full md:w-64 bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {farmers.map(farmer => (
          <div key={farmer.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-emerald-600 to-emerald-400 relative">
              {farmer.isVerified && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/30">
                  <ShieldCheck size={14} /> Verified Partner
                </div>
              )}
            </div>
            <div className="p-6 relative pt-12">
              <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-2xl p-1 shadow-md border border-slate-100">
                <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-400">
                  {farmer.name.charAt(0)}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900">{farmer.name}</h2>
              <div className="flex items-center gap-1 text-slate-500 mt-1 mb-4 text-sm">
                <MapPin size={14} /> {farmer.location}
              </div>
              
              <div className="flex items-center gap-4 py-4 border-y border-slate-100 mb-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Rating</div>
                  <div className="font-bold text-slate-900">★ {farmer.rating}</div>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Joined</div>
                  <div className="font-bold text-slate-900">{new Date(farmer.joinedDate).getFullYear()}</div>
                </div>
              </div>
              
              <button className="w-full text-purple-600 font-medium text-sm py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                View Profile & Inventory
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
