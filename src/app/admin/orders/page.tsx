"use client";

import { useStore } from "@/context/StoreContext";
import { Search, Filter } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, customers, farmers, drivers } = useStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Orders</h1>
          <p className="text-slate-500 mt-1">Platform-wide order management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter size={16} /> Status
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search ID or Customer..." 
              className="w-full md:w-64 bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Farmer</th>
                <th className="p-4 font-medium">Driver</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.map(order => {
                const customer = customers.find(c => c.id === order.customerId);
                const farmer = farmers.find(f => f.id === order.farmerId);
                const driver = drivers.find(d => d.id === order.driverId);
                
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{order.id}</td>
                    <td className="p-4 text-slate-700">{customer?.name}</td>
                    <td className="p-4 text-slate-700">{farmer?.name}</td>
                    <td className="p-4 text-slate-700">{driver ? driver.name : <span className="text-slate-400 italic">Unassigned</span>}</td>
                    <td className="p-4 font-bold text-slate-900">₹{order.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${
                        order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700' :
                        ['READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY'].includes(order.status) ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{new Date(order.createdAt).toLocaleString(undefined, {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
