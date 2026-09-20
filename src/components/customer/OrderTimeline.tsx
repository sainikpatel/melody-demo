"use client";

import { Check, Truck, Package, Clock, Utensils, MapPin, ChefHat } from "lucide-react";
import { OrderStatus } from "@/types";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const STAGES = [
  { id: "PLACED", label: "Order Placed", icon: Package },
  { id: "CONFIRMED", label: "Confirmed", icon: Check },
  { id: "PREPARING", label: "Preparing", icon: ChefHat },
  { id: "READY_FOR_PICKUP", label: "Ready", icon: Package },
  { id: "PICKED_UP", label: "Picked Up", icon: MapPin },
  { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck },
  { id: "DELIVERED", label: "Delivered", icon: Check },
];

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentStageIndex = STAGES.findIndex(s => s.id === status);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    if (status === "DELIVERED" && !hasCelebrated) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669']
      });
      setHasCelebrated(true);
    }
  }, [status, hasCelebrated]);

  return (
    <div className="py-8 px-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Connection Line */}
        <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-slate-200 rounded-full hidden md:block">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.max(0, (currentStageIndex / (STAGES.length - 1)) * 100)}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
          {STAGES.map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex md:flex-col items-center gap-4 md:gap-3 group">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 shadow-sm
                  transition-all duration-500 relative
                  ${isCompleted ? 'bg-emerald-500 border-emerald-100 text-white' : 'bg-white border-slate-100 text-slate-300'}
                  ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-110' : ''}
                `}>
                  <Icon size={20} className={isCurrent ? "animate-pulse" : ""} />
                </div>
                
                {/* Vertical Line for Mobile */}
                {index < STAGES.length - 1 && (
                  <div className={`absolute left-6 ml-[-1px] w-0.5 h-16 top-12 -z-10 md:hidden
                    ${index < currentStageIndex ? 'bg-emerald-500' : 'bg-slate-200'}
                  `} />
                )}

                <div className="md:text-center flex-1 md:flex-none">
                  <div className={`font-semibold text-sm ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                    {stage.label}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-emerald-600 font-medium mt-0.5 animate-pulse">
                      In Progress
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
