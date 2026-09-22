"use client";

import { useStore } from "@/context/StoreContext";
import { OrderStatus } from "@/types";
import { CheckCircle2, MapPin, Truck, Navigation, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DriverDeliveriesPage() {
  const { orders, updateOrderStatus, farmers, customers } = useStore();
  const assignedOrders = orders.filter((o) => o.driverId === "d1");
  const activeOrders = assignedOrders.filter((o) =>
    ["READY_FOR_PICKUP", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(o.status)
  );
  const completedOrders = assignedOrders.filter((o) => o.status === "DELIVERED");

  const getNextAction = (status: OrderStatus, orderId: string) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return (
          <button
            onClick={() => updateOrderStatus(orderId, "PICKED_UP")}
            className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <MapPin size={18} /> Confirm Farm Pickup
          </button>
        );
      case "PICKED_UP":
        return (
          <button
            onClick={() => updateOrderStatus(orderId, "OUT_FOR_DELIVERY")}
            className="w-full bg-[#d4a852] hover:bg-[#c49842] text-[#1b2e1c] font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Navigation size={18} /> Start Doorstep Route
          </button>
        );
      case "OUT_FOR_DELIVERY":
        return (
          <button
            onClick={() => updateOrderStatus(orderId, "DELIVERED")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <CheckCircle2 size={18} /> Confirm Doorstep Delivery
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/driver"
              className="text-xs font-semibold text-[#2d6a4f] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Back to Dashboard
            </Link>
          </div>
          <h1 className="font-display font-black text-3xl text-[#1a2e1c]">
            Active Deliveries
          </h1>
          <p className="text-xs text-[#6b7c6e] mt-1">
            Assigned pickup and doorstep delivery routes
          </p>
        </div>

        <div className="bg-white border border-[#ede4d0] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1a2e1c]">
          {activeOrders.length} In Progress
        </div>
      </div>

      {/* Active Orders List */}
      <div className="space-y-6 mb-12">
        {activeOrders.map((order) => {
          const farmer = farmers.find((f) => f.id === order.farmerId);
          const customer = customers.find((c) => c.id === order.customerId);

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-[#ede4d0]/80 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 bg-[#f7f3eb] border-b border-[#ede4d0] flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-black">
                    <Truck size={14} />
                  </span>
                  <div>
                    <span className="font-black text-[#1a2e1c] text-sm sm:text-base">
                      Order #{order.id}
                    </span>
                    <span className="text-xs text-[#6b7c6e] ml-2">
                      ({order.items.length} items &middot; ₹{order.totalAmount})
                    </span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    order.status === "OUT_FOR_DELIVERY"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>

              {/* Waypoint Timeline */}
              <div className="p-6">
                {/* Pickup */}
                <div className="relative pl-8 pb-7 border-l-2 border-dashed border-[#2d6a4f]/30 ml-3">
                  <div className="absolute w-6 h-6 bg-emerald-100 text-[#2d6a4f] rounded-full flex items-center justify-center -left-[13px] top-0 border-2 border-white shadow-sm">
                    <div className="w-2.5 h-2.5 bg-[#2d6a4f] rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#2d6a4f] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Step 1 &middot; Farm Pickup
                    </span>
                    <h3 className="font-bold text-[#1a2e1c] text-sm mt-1.5 truncate">
                      {farmer?.name || "Partner Farm"}
                    </h3>
                    <p className="text-xs text-[#6b7c6e] mt-0.5">
                      {farmer?.location || "Maharashtra"}
                    </p>
                  </div>
                </div>

                {/* Drop-off */}
                <div className="relative pl-8 ml-3">
                  <div className="absolute w-6 h-6 bg-amber-100 text-[#d4a852] rounded-full flex items-center justify-center -left-[13px] top-0 border-2 border-white shadow-sm">
                    <MapPin size={12} className="text-[#d4a852] fill-[#d4a852]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#e07c3a] bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      Step 2 &middot; Customer Drop-off
                    </span>
                    <h3 className="font-bold text-[#1a2e1c] text-sm mt-1.5 truncate">
                      {customer?.name || "Customer"}
                    </h3>
                    <p className="text-xs text-[#6b7c6e] mt-0.5 leading-relaxed break-words">
                      {order.deliveryAddress}
                    </p>
                    {customer?.phone && (
                      <p className="text-xs text-[#2d6a4f] mt-1 font-semibold flex items-center gap-1">
                        <Phone size={11} /> {customer.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Simulated Map when out for delivery */}
              {order.status === "OUT_FOR_DELIVERY" && (
                <div className="bg-[#f7f3eb] h-28 relative border-y border-[#ede4d0] overflow-hidden flex items-center justify-center">
                  <div className="text-[#2d6a4f] font-bold z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-xs flex items-center gap-2 border border-[#ede4d0]">
                    <Navigation size={14} className="text-[#2d6a4f] animate-spin" /> Live GPS Transit Active
                  </div>
                  <div className="absolute inset-x-0 top-1/2 h-1 bg-[#2d6a4f]/20 -translate-y-1/2">
                    <div className="absolute left-0 top-0 h-full bg-[#2d6a4f] w-3/5 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-3 border-[#2d6a4f] rounded-full shadow-md" />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="p-4 bg-[#f7f3eb] border-t border-[#ede4d0]">
                {getNextAction(order.status, order.id)}
              </div>
            </div>
          );
        })}

        {activeOrders.length === 0 && (
          <div className="text-center py-14 bg-white rounded-3xl border border-[#ede4d0] text-[#6b7c6e] text-sm shadow-sm">
            <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-bold text-[#1a2e1c] text-base">All caught up!</p>
            <p className="text-xs text-[#6b7c6e] mt-1">No active delivery assignments at this moment.</p>
          </div>
        )}
      </div>

      {/* Completed Deliveries */}
      <h2 className="font-display font-black text-xl text-[#1a2e1c] mb-4">
        Completed Today
      </h2>
      <div className="space-y-3">
        {completedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl border border-[#ede4d0]/70 flex justify-between items-center shadow-sm"
          >
            <div>
              <div className="font-bold text-[#1a2e1c] text-sm">
                Order #{order.id}
              </div>
              <div className="text-xs text-[#6b7c6e] mt-0.5">
                Delivered successfully &middot; {order.deliveryAddress}
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
              <CheckCircle2 size={13} /> Delivered
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
