"use client";

import { useStore } from "@/context/StoreContext";
import { Role } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { User, Tractor, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function DemoRoleBar() {
  const { role, setRole, resetDemoData } = useStore();
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    router.push(`/${newRole.toLowerCase()}`);
  };

  const handleReset = () => {
    resetDemoData();
    window.location.reload();
  };

  const roles = [
    { id: "CUSTOMER" as Role, label: "Customer", icon: User },
    { id: "FARMER" as Role, label: "Farmer", icon: Tractor },
    { id: "DRIVER" as Role, label: "Driver", icon: Truck },
    { id: "ADMIN" as Role, label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-sm font-medium border-b border-slate-700 shadow-md">
      <div className="flex items-center gap-4">
        <span className="text-slate-400 uppercase tracking-widest text-xs font-bold mr-2">Demo Mode</span>
        <div className="flex bg-slate-800 rounded-md p-1">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRoleChange(r.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded transition-all duration-200",
                  isActive 
                    ? "bg-emerald-500 text-white shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                <Icon size={14} />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
        title="Reset Demo Data"
      >
        <RefreshCw size={14} />
        Reset Demo
      </button>
    </div>
  );
}
