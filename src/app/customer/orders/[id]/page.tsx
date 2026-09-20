"use client";

import { useStore } from "@/context/StoreContext";
import { OrderTimeline } from "@/components/customer/OrderTimeline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Truck, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const { orders, drivers } = useStore();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = params.id as string;
  const isNew = searchParams.get("success") === "true";
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const order = orders.find(o => o.id === orderId);
  const driver = order?.driverId ? drivers.find(d => d.id === order?.driverId) : null;

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Order not found</h1>
        <button onClick={() => router.push("/customer/orders")} className="text-emerald-600 hover:underline">
          Go back to orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/customer/orders" className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 mb-6 font-medium transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to orders
      </Link>
      
      {isNew && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-center flex flex-col items-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Order successfully placed!</h2>
          <p className="text-slate-600 mb-1">Your order #{order.id} is confirmed.</p>
          <p className="text-sm text-slate-500">You can track its status below.</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order #{order.id}</h1>
            <p className="text-slate-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium mb-1">Total Amount</div>
            <div className="text-xl font-bold text-emerald-600">₹{order.totalAmount}</div>
          </div>
        </div>

        <div className="border-b border-slate-100 bg-white">
          <OrderTimeline status={order.status} />
        </div>

        {/* Live Tracking Map Placeholder - Shown only when out for delivery */}
        {order.status === "OUT_FOR_DELIVERY" && driver && (
          <div className="p-6 md:p-8 border-b border-slate-100 bg-blue-50/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Truck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Out for delivery</h3>
                <p className="text-sm text-slate-500">{driver.name} is arriving in ~15 mins</p>
              </div>
            </div>
            <div className="h-48 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              {/* Fake Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} /> Live tracking simulation running
                </div>
              </div>
              <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 animate-pulse z-10"></div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white z-10"></div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{strokeDasharray: "5, 5"}}>
                <path d="M 25% 50% Q 50% 20% 75% 33%" fill="transparent" stroke="#3b82f6" strokeWidth="3" />
              </svg>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-slate-400" /> Items
            </h3>
            <ul className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <li key={item.product.id} className="py-4 flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                    <p className="text-sm text-slate-500">Qty: {item.quantity} × ₹{item.product.price}</p>
                  </div>
                  <div className="font-bold text-slate-900">
                    ₹{item.quantity * item.product.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-slate-400" /> Delivery
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700">
                {order.deliveryAddress}
              </div>
            </div>
            
            {driver && (order.status === "OUT_FOR_DELIVERY" || order.status === "DELIVERED") && (
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">Driver Info</h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{driver.name}</div>
                    <div className="text-sm text-slate-500">{driver.vehicle} • ★ {driver.rating}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
