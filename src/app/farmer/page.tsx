"use client";

import { useStore } from "@/context/StoreContext";
import {
  ArrowUpRight,
  IndianRupee,
  Package,
  ShoppingBag,
  AlertTriangle,
  Tractor,
  TrendingUp,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function FarmerDashboard() {
  const { orders, products } = useStore();

  // Filter for demo farmer f1
  const myOrders = orders.filter((o) => o.farmerId === "f1");
  const myProducts = products.filter((p) => p.farmerId === "f1");

  const pendingOrders = myOrders.filter((o) =>
    ["PLACED", "CONFIRMED", "PREPARING"].includes(o.status)
  );
  const completedOrders = myOrders.filter((o) => o.status === "DELIVERED");

  const todayRevenue = completedOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const lowStockProducts = myProducts.filter((p) => p.stock < 30);

  const stats = [
    {
      title: "Today's Revenue",
      value: todayRevenue,
      prefix: "₹",
      icon: IndianRupee,
      gradient: "from-emerald-600 to-teal-700",
      change: "+14.8%",
      positive: true,
    },
    {
      title: "Orders to Fulfill",
      value: pendingOrders.length,
      icon: ShoppingBag,
      gradient: "from-[#d4a852] to-[#e07c3a]",
      change: pendingOrders.length > 0 ? "Action needed" : "All clear",
      positive: pendingOrders.length === 0,
    },
    {
      title: "Active Products",
      value: myProducts.length,
      icon: Package,
      gradient: "from-[#2d6a4f] to-[#1b4332]",
      change: "100% Organic",
      positive: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <ScrollReveal className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-2">
              <Tractor size={13} />
              Partner Farm Operations
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1a2e1c] tracking-tight">
              Farmer Portal
            </h1>
            <p className="text-[#6b7c6e] mt-1 text-sm sm:text-base">
              Welcome back, <span className="font-bold text-[#1a2e1c]">Green Valley Farm</span> &middot; Coorg Organic Cluster
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/farmer/orders"
              className="inline-flex items-center gap-2 bg-[#f7f3eb] hover:bg-[#ede4d0] text-[#1a2e1c] border border-[#ede4d0] font-semibold text-sm py-2.5 px-4 rounded-xl transition-all"
            >
              Fulfill Orders
              {pendingOrders.length > 0 && (
                <span className="bg-[#e07c3a] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {pendingOrders.length}
                </span>
              )}
            </Link>
            <Link
              href="/farmer/products"
              className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold text-sm py-2.5 px-4.5 rounded-xl shadow-sm transition-all hover:-translate-y-px"
            >
              <Sprout size={16} />
              Manage Inventory
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={fadeUp}
            className="bg-white rounded-2xl p-5 border border-[#ede4d0]/70 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md shrink-0`}
            >
              <stat.icon size={26} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[#6b7c6e] mb-1">
                {stat.title}
              </div>
              <div className="text-2xl font-black text-[#1a2e1c] tabular-nums">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  duration={1200}
                />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`text-[11px] font-semibold ${
                    stat.positive ? "text-emerald-700" : "text-[#e07c3a]"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <ScrollReveal direction="left" className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#ede4d0]/70 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#f7f3eb] flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-xl text-[#1a2e1c]">
                  Recent Farm Orders
                </h2>
                <p className="text-xs text-[#6b7c6e] mt-0.5">
                  Latest customer demands awaiting harvest and packaging
                </p>
              </div>
              <Link
                href="/farmer/orders"
                className="text-[#2d6a4f] hover:text-[#1b4332] text-xs font-bold flex items-center gap-1 transition-colors"
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-[#f7f3eb]">
              {myOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-5 flex items-center justify-between hover:bg-[#f7f3eb]/60 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d6a4f] flex items-center justify-center font-bold text-xs shrink-0">
                      #{order.id.slice(-4)}
                    </div>
                    <div>
                      <div className="font-bold text-[#1a2e1c] text-sm">
                        Order #{order.id}
                      </div>
                      <div className="text-xs text-[#6b7c6e] mt-0.5">
                        {order.items.length} items &middot; ₹{order.totalAmount}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : ["PLACED", "CONFIRMED"].includes(order.status)
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
              ))}

              {myOrders.length === 0 && (
                <div className="p-10 text-center text-[#6b7c6e] text-sm">
                  No orders assigned yet.
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Low Stock Alerts */}
        <ScrollReveal direction="right" className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#ede4d0]/70 shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-black text-lg text-[#1a2e1c] flex items-center gap-2">
                <AlertTriangle className="text-[#e07c3a]" size={18} />
                Harvest Inventory Alerts
              </h2>
            </div>
            <p className="text-xs text-[#6b7c6e] mb-4">
              Produce reaching low harvest reserve:
            </p>

            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3.5 bg-[#f7f3eb] rounded-xl border border-[#ede4d0]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.imageUrl}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                      alt={product.name}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-[#1a2e1c] text-sm truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-[#e07c3a] font-semibold mt-0.5">
                        Only {product.stock} {product.unit} left
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {lowStockProducts.length === 0 && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={15} /> All stock levels optimal.
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-[#ede4d0]">
              <Link
                href="/farmer/products"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Update Harvest Quantities
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
