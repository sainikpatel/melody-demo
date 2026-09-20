"use client";

import { useStore } from "@/context/StoreContext";
import { IndianRupee, Users, ShoppingBag, Tractor, Truck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const mockChartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function AdminDashboard() {
  const { orders, customers, farmers, drivers } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED").length;

  const stats = [
    { title: "Total Revenue", value: `₹${totalRevenue}`, icon: IndianRupee, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Customers", value: customers.length + 120, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Farmers", value: farmers.length, icon: Tractor, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Drivers", value: drivers.length + 15, icon: Truck, color: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "Pending Orders", value: pendingOrders, icon: ShoppingBag, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500 mt-1">Monitor all Melody marketplace activities.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-start">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Revenue Trend (Demo)</h2>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} activeDot={{ r: 8 }} />
                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} />
                  <Tooltip cursor={{stroke: '#f1f5f9', strokeWidth: 2}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-6">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${order.status === 'DELIVERED' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                <div>
                  <p className="text-sm text-slate-900 font-medium">
                    Order <span className="font-bold">#{order.id}</span> {order.status === 'DELIVERED' ? 'was delivered successfully' : `moved to ${order.status.replace(/_/g, " ")}`}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(order.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <Link href="/admin/orders" className="text-purple-600 font-medium text-sm hover:text-purple-700">View all orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
