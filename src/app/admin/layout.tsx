"use client";

import Link from "next/link";
import { ShieldCheck, Menu, Users, ShoppingBag, Tractor, Truck, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Farmers", href: "/admin/farmers", icon: Tractor },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Drivers", href: "/admin/drivers", icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <nav className="md:w-64 md:fixed md:inset-y-0 md:pt-0 z-30 bg-slate-900 text-white border-r border-slate-800 hidden md:block">
        <div className="p-6">
          <div className="font-bold text-xl text-purple-400 tracking-tight flex items-center gap-2 mb-8">
            <ShieldCheck size={24} /> Admin
          </div>
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                    isActive ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} /> {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Mobile nav header */}
      <div className="md:hidden sticky top-0 z-30 bg-slate-900 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-lg text-purple-400 tracking-tight flex items-center gap-2">
          <ShieldCheck size={20} /> Admin Panel
        </div>
        <button className="text-slate-300">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex-1 md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
