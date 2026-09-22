"use client";

import { useStore } from "@/context/StoreContext";
import {
  IndianRupee,
  Users,
  ShoppingBag,
  Tractor,
  Truck,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

const mockChartData = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5200 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 6890 },
  { name: "Sat", revenue: 7390 },
  { name: "Sun", revenue: 5490 },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AdminDashboard() {
  const { orders, customers, farmers, drivers } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      prefix: "₹",
      icon: IndianRupee,
      gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
      change: "+12.4%",
      positive: true,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      change: "+8.1%",
      positive: true,
    },
    {
      title: "Customers",
      value: customers.length + 120,
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      change: "+21.3%",
      positive: true,
    },
    {
      title: "Farm Partners",
      value: farmers.length,
      icon: Tractor,
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      change: "+3.2%",
      positive: true,
    },
    {
      title: "Active Drivers",
      value: drivers.length + 15,
      icon: Truck,
      gradient: "from-cyan-500 to-sky-600",
      bg: "bg-cyan-50",
      change: "+5.0%",
      positive: true,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: ShoppingBag,
      gradient: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      change: "-4.2%",
      positive: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <ScrollReveal className="mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display font-black text-3xl text-[#1a2e1c] tracking-tight">
              Platform Overview
            </h1>
            <p className="text-[#6b7c6e] mt-1.5 text-sm">
              Monitor all Melody marketplace activities in real time.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-[#f7f3eb] border border-[#ede4d0] rounded-xl px-4 py-2.5">
            <TrendingUp size={15} className="text-[#2d6a4f]" />
            <span className="text-[#2d6a4f] text-sm font-semibold">
              All time high this week
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* KPI Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={fadeUp}
            className="bg-white rounded-2xl p-4 border border-[#ede4d0]/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-sm`}
            >
              <stat.icon size={18} className="text-white" />
            </div>

            {/* Value */}
            <div className="font-black text-2xl text-[#1a2e1c] tabular-nums">
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix}
                duration={1200}
              />
            </div>

            {/* Title + change */}
            <div className="flex items-center justify-between mt-1 gap-1">
              <span className="text-xs font-medium text-[#6b7c6e] leading-tight">
                {stat.title}
              </span>
              <span
                className={`text-[10px] font-bold shrink-0 ${
                  stat.positive ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <ScrollReveal
          direction="left"
          className="lg:col-span-2 bg-white rounded-2xl border border-[#ede4d0]/60 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-xl text-[#1a2e1c]">
                Revenue Trend
              </h2>
              <p className="text-[#6b7c6e] text-xs mt-0.5">
                This week&apos;s daily breakdown
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              +18.2% vs last week
            </span>
          </div>
          <div className="h-64 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockChartData}
                  margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#2d6a4f" />
                      <stop offset="100%" stopColor="#d4a852" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#f7f3eb"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7c6e", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7c6e", fontSize: 11 }}
                    dx={-10}
                  />
                  <Tooltip
                    cursor={{ stroke: "#ede4d0", strokeWidth: 2 }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #ede4d0",
                      boxShadow:
                        "0 10px 30px rgba(26,46,28,0.08)",
                      fontSize: "13px",
                      color: "#1a2e1c",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="url(#revenueGrad)"
                    strokeWidth={3}
                    dot={{ fill: "#2d6a4f", strokeWidth: 0, r: 5 }}
                    activeDot={{ r: 7, fill: "#d4a852" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </ScrollReveal>

        {/* Recent Activity */}
        <ScrollReveal
          direction="right"
          className="bg-white rounded-2xl border border-[#ede4d0]/60 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-5 border-b border-[#f7f3eb] flex items-center justify-between">
            <div>
              <h2 className="font-display font-black text-lg text-[#1a2e1c]">
                Recent Activity
              </h2>
              <p className="text-[#6b7c6e] text-xs mt-0.5">Live order feed</p>
            </div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <div className="p-5 flex-1 flex flex-col gap-5 overflow-auto">
            {orders.slice(0, 5).map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3"
              >
                <div
                  className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                    order.status === "DELIVERED"
                      ? "bg-emerald-500"
                      : "bg-[#d4a852]"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm text-[#1a2e1c] font-medium leading-snug">
                    Order{" "}
                    <span className="font-bold text-[#2d6a4f]">
                      #{order.id}
                    </span>{" "}
                    {order.status === "DELIVERED"
                      ? "delivered successfully"
                      : `→ ${order.status.replace(/_/g, " ")}`}
                  </p>
                  <p className="text-xs text-[#6b7c6e] mt-0.5">
                    {new Date(order.updatedAt).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-[#f7f3eb] border-t border-[#ede4d0] text-center">
            <Link
              href="/admin/orders"
              className="text-[#2d6a4f] font-semibold text-sm hover:text-[#1b4332] inline-flex items-center gap-1"
            >
              View all orders
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
