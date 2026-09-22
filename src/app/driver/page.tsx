"use client";

import { useStore } from "@/context/StoreContext";
import {
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Navigation,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function DriverDashboard() {
  const { orders } = useStore();
  const router = useRouter();

  // Filter for demo driver d1
  const assignedOrders = orders.filter((o) => o.driverId === "d1");
  const activeOrders = assignedOrders.filter((o) =>
    ["READY_FOR_PICKUP", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(o.status)
  );
  const completedOrders = assignedOrders.filter(
    (o) => o.status === "DELIVERED"
  );

  const stats = [
    {
      title: "Active Deliveries",
      value: activeOrders.length,
      icon: Truck,
      gradient: "from-[#2d6a4f] to-[#1b4332]",
      badge: activeOrders.length > 0 ? "In Progress" : "Standby",
      badgeColor:
        activeOrders.length > 0
          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
          : "text-slate-600 bg-slate-100 border-slate-200",
    },
    {
      title: "Completed Today",
      value: completedOrders.length,
      icon: CheckCircle2,
      gradient: "from-emerald-600 to-teal-700",
      badge: "100% On-time",
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Distance Covered",
      value: 42,
      suffix: " km",
      icon: Navigation,
      gradient: "from-[#d4a852] to-[#e07c3a]",
      badge: "Zero Emission",
      badgeColor: "text-amber-800 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <ScrollReveal className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-2">
              <Truck size={13} />
              Fleet Partner Logistics
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1a2e1c] tracking-tight">
              Driver Portal
            </h1>
            <p className="text-[#6b7c6e] mt-1 text-sm sm:text-base">
              Welcome back, <span className="font-bold text-[#1a2e1c]">Ramesh Kumar</span> &middot; Vehicle: MH 12 AB 1234 (EV Scooter)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/driver/deliveries"
              className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-all hover:-translate-y-px"
            >
              <Navigation size={15} />
              View Deliveries
              {activeOrders.length > 0 && (
                <span className="bg-[#d4a852] text-[#1b2e1c] text-xs px-2 py-0.5 rounded-full font-black">
                  {activeOrders.length}
                </span>
              )}
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
              <div className="text-xs font-medium text-[#6b7c6e] mb-1 truncate">
                {stat.title}
              </div>
              <div className="text-2xl font-black text-[#1a2e1c] tabular-nums">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix || ""}
                  duration={1200}
                />
              </div>
              <div className="mt-1">
                <span
                  className={`inline-block text-[11px] font-semibold border px-2 py-0.5 rounded-md ${stat.badgeColor}`}
                >
                  {stat.badge}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Action Banner */}
      <ScrollReveal>
        <div className="bg-white rounded-3xl shadow-sm border border-[#ede4d0]/80 p-8 md:p-10 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="w-18 h-18 bg-emerald-50 text-[#2d6a4f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
            <Zap size={32} />
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1a2e1c] mb-3">
            Ready to hit the road?
          </h2>

          <p className="text-[#6b7c6e] text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            You currently have{" "}
            <span className="font-bold text-[#1a2e1c]">
              {activeOrders.length} active delivery tasks
            </span>{" "}
            assigned. Open your dispatch queue to navigate routes and confirm doorstep drops.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/driver/deliveries")}
              className="inline-flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-md shadow-[#2d6a4f]/20 hover:-translate-y-px text-sm"
            >
              Start Delivery Route <ArrowRight size={17} />
            </button>
            <div className="inline-flex items-center justify-center gap-2 bg-[#f7f3eb] text-[#1a2e1c] text-xs font-semibold py-3.5 px-6 rounded-2xl border border-[#ede4d0]">
              <ShieldCheck size={16} className="text-[#2d6a4f]" />
              Eco EV Fleet Verified
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
