"use client";

import { CustomerNavbar } from "@/components/customer/CustomerNavbar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CustomerNavbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
