"use client";

import { useStore } from "@/context/StoreContext";
import { ArrowUpRight, IndianRupee, Package, ShoppingBag, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function FarmerDashboard() {
  const { orders, products } = useStore();
  
  // Filter for demo farmer f1
  const myOrders = orders.filter(o => o.farmerId === "f1");
  const myProducts = products.filter(p => p.farmerId === "f1");
  
  const pendingOrders = myOrders.filter(o => ["PLACED", "CONFIRMED", "PREPARING"].includes(o.status));
  const completedOrders = myOrders.filter(o => o.status === "DELIVERED");
  
  const todayRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const lowStockProducts = myProducts.filter(p => p.stock < 30);

  const stats = [
    { title: "Today's Revenue", value: `₹${todayRevenue}`, icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Pending Orders", value: pendingOrders.length.toString(), icon: ShoppingBag, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Total Orders", value: myOrders.length.toString(), icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, Green Valley Farm</p>
        </div>
        <Link href="/farmer/products" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Manage Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">{stat.title}</div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
              <Link href="/farmer/orders" className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
                View All <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {myOrders.slice(0, 4).map(order => (
                <div key={order.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-semibold text-slate-900">{order.id}</div>
                    <div className="text-sm text-slate-500">{order.items.length} items • ₹{order.totalAmount}</div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                    ['PLACED', 'CONFIRMED'].includes(order.status) ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
              {myOrders.length === 0 && (
                <div className="p-8 text-center text-slate-500">No orders yet.</div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} /> Low Stock Alerts
            </h2>
            <div className="space-y-4">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={product.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{product.name}</div>
                      <div className="text-xs text-red-500 font-medium">{product.stock} {product.unit} left</div>
                    </div>
                  </div>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <div className="text-sm text-slate-500 text-center py-4">All stock levels are optimal.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
