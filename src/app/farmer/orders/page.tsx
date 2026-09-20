"use client";

import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/types";
import { CheckCircle2, Package, MapPin, Search } from "lucide-react";

export default function FarmerOrdersPage() {
  const { orders, updateOrderStatus, customers } = useStore();
  const myOrders = orders.filter(o => o.farmerId === "f1");

  const getNextAction = (status: OrderStatus, orderId: string) => {
    switch (status) {
      case "PLACED":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "CONFIRMED")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} /> Accept Order
          </button>
        );
      case "CONFIRMED":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "PREPARING")}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Package size={18} /> Mark Preparing
          </button>
        );
      case "PREPARING":
        return (
          <button 
            onClick={() => updateOrderStatus(orderId, "READY_FOR_PICKUP")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MapPin size={18} /> Ready for Pickup
          </button>
        );
      case "READY_FOR_PICKUP":
        return (
          <div className="w-full bg-slate-100 text-slate-500 font-medium py-2 rounded-lg flex items-center justify-center gap-2">
            Waiting for Driver
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Orders</h1>
          <p className="text-slate-500 mt-1">Process customer orders and hand over to drivers.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Order ID..." 
            className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {myOrders.map(order => {
          const customer = customers.find(c => c.id === order.customerId);
          const isActive = ["PLACED", "CONFIRMED", "PREPARING"].includes(order.status);
          
          return (
            <div key={order.id} className={`bg-white rounded-2xl border shadow-sm flex flex-col ${isActive ? 'border-amber-200 shadow-amber-100' : 'border-slate-100'}`}>
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{order.id}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  order.status === 'READY_FOR_PICKUP' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
              
              <div className="p-5 flex-1">
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-700 mb-2">Customer</div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{customer?.name}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[150px]" title={order.deliveryAddress}>{order.deliveryAddress}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Order Items</div>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-600">{item.quantity} × {item.product.name}</span>
                        <span className="font-medium text-slate-900">₹{item.quantity * item.product.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 mt-3 pt-3 flex justify-between font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 pt-0 mt-auto">
                {getNextAction(order.status, order.id)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
