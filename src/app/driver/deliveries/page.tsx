"use client";

import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/types";
import { CheckCircle2, MapPin, Truck, Navigation } from "lucide-react";

export default function DriverDeliveriesPage() {
  const { orders, updateOrderStatus, farmers, customers } = useStore();
  const assignedOrders = orders.filter(o => o.driverId === "d1");
  const activeOrders = assignedOrders.filter(o => ["READY_FOR_PICKUP", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(o.status));
  const completedOrders = assignedOrders.filter(o => o.status === "DELIVERED");

  const getNextAction = (status: OrderStatus, orderId: string) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "PICKED_UP")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MapPin size={20} /> Mark as Picked Up
          </button>
        );
      case "PICKED_UP":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "OUT_FOR_DELIVERY")}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Navigation size={20} /> Start Delivery Route
          </button>
        );
      case "OUT_FOR_DELIVERY":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "DELIVERED")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} /> Mark Delivered
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Active Deliveries</h1>
      
      <div className="space-y-6 mb-12">
        {activeOrders.map(order => {
          const farmer = farmers.find(f => f.id === order.farmerId);
          const customer = customers.find(c => c.id === order.customerId);
          
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-lg">Order #{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'OUT_FOR_DELIVERY' ? 'bg-amber-100 text-amber-700' : 'bg-blue-200 text-blue-800'
                }`}>
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
              
              <div className="p-6">
                <div className="relative pl-8 pb-6 border-l-2 border-dashed border-blue-200 ml-3">
                  <div className="absolute w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center -left-[13px] top-0 border-2 border-white">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-slate-900">Pickup</h3>
                  <p className="text-slate-600 mt-1">{farmer?.name}</p>
                  <p className="text-sm text-slate-500">{farmer?.location}</p>
                </div>
                
                <div className="relative pl-8 ml-3">
                  <div className="absolute w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center -left-[13px] top-0 border-2 border-white">
                    <MapPin size={12} className="text-emerald-600 fill-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Drop-off</h3>
                  <p className="text-slate-600 mt-1">{customer?.name}</p>
                  <p className="text-sm text-slate-500">{order.deliveryAddress}</p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{customer?.phone}</p>
                </div>
              </div>

              {order.status === "OUT_FOR_DELIVERY" && (
                <div className="bg-slate-100 h-32 relative border-y border-slate-200 overflow-hidden flex items-center justify-center">
                  {/* Simulated Map */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="text-slate-500 font-medium z-10 bg-white/80 px-4 py-2 rounded-full shadow-sm text-sm flex items-center gap-2">
                    <Navigation size={16} className="text-blue-500" /> Simulated GPS Route Active
                  </div>
                  <div className="absolute inset-x-0 top-1/2 h-1 bg-blue-500/20 -translate-y-1/2">
                    <div className="absolute left-0 top-0 h-full bg-blue-500 w-1/2 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                {getNextAction(order.status, order.id)}
              </div>
            </div>
          );
        })}
        {activeOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-500">
            No active deliveries pending.
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold text-slate-900 mb-4">Completed Today</h2>
      <div className="space-y-4">
        {completedOrders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
              <div className="font-bold text-slate-900">{order.id}</div>
              <div className="text-sm text-slate-500">Delivered successfully</div>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> Delivered
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
