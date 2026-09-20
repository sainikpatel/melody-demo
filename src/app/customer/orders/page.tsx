"use client";

import { useStore } from "@/context/StoreContext";
import Link from "next/link";
import { Package, ChevronRight, Clock } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useStore();
  const customerOrders = orders; // In demo, we just show all orders since there's one customer

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-emerald-100 text-emerald-700";
      case "CANCELLED": return "bg-red-100 text-red-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace(/_/g, " ");
  };

  if (customerOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">My Orders</h1>
        <div className="bg-white rounded-2xl p-12 max-w-lg mx-auto shadow-sm border border-slate-100">
          <Package className="mx-auto h-16 w-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h2>
          <p className="text-slate-500 mb-6">When you place an order, it will appear here.</p>
          <Link href="/customer/products" className="inline-block bg-emerald-600 text-white font-medium px-6 py-2 rounded-full">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {customerOrders.map(order => (
          <Link 
            key={order.id} 
            href={`/customer/orders/${order.id}`}
            className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-slate-900">{order.id}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock size={14} /> 
                  <span>{new Date(order.createdAt).toLocaleString(undefined, {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                  })}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-slate-900">₹{order.totalAmount}</div>
                <div className="text-sm text-slate-500">{order.items.length} items</div>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <div className="flex -space-x-2 overflow-hidden">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden bg-slate-100">
                    <img src={item.product.imageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white bg-slate-100 text-xs font-medium text-slate-600">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                Track Order <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
