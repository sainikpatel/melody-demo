"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart, Search, Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import MelodyLogo from "@/components/common/MelodyLogo";

export function CustomerNavbar() {
  const { cart } = useStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevCount = useMotionValue(cartItemCount);
  const badgeScale = useSpring(1, { stiffness: 500, damping: 20 });

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Spring bounce on cart change
  useEffect(() => {
    if (cartItemCount !== prevCount.get()) {
      badgeScale.set(1.6);
      setTimeout(() => badgeScale.set(1), 200);
      prevCount.set(cartItemCount);
    }
  }, [cartItemCount, badgeScale, prevCount]);

  const navLinks = [
    { href: "/customer", label: "Home" },
    { href: "/customer/products", label: "Shop" },
    { href: "/customer/orders", label: "My Orders" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#1a2e1c]/8 shadow-sm shadow-black/5"
            : "bg-white border-b border-[#1a2e1c]/6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/customer"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <MelodyLogo
              size={32}
              useFaviconImg={true}
              className="transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display font-black text-[#1a2e1c] text-xl tracking-tight">
              Melody
              <span className="text-[#2d6a4f]">.</span>
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7c6e] group-focus-within:text-[#2d6a4f] transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search tomatoes, spinach, A2 milk..."
                className="w-full bg-[#f7f3eb] border border-[#ede4d0] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1a2e1c] placeholder:text-[#6b7c6e]/70 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/30 focus:border-[#2d6a4f]/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6b7c6e] hover:text-[#1a2e1c] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/customer/cart" className="relative p-2 rounded-xl hover:bg-[#f7f3eb] transition-colors group">
              <ShoppingCart
                size={22}
                className="text-[#6b7c6e] group-hover:text-[#1a2e1c] transition-colors"
              />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    key={cartItemCount}
                    style={{ scale: badgeScale }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#2d6a4f] text-white text-[9px] font-black h-4.5 w-4.5 rounded-full flex items-center justify-center leading-none"
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Shop CTA (desktop) */}
            <Link
              href="/customer/products"
              className="hidden md:inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-px shadow-sm shadow-[#2d6a4f]/20"
            >
              Shop Fresh
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-[#f7f3eb] transition-colors text-[#6b7c6e]"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-16 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-5 border-b border-[#ede4d0]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7c6e]" size={15} />
                  <input
                    type="text"
                    placeholder="Search fresh produce..."
                    className="w-full bg-[#f7f3eb] border border-[#ede4d0] rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#1a2e1c] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/30"
                  />
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1a2e1c] font-medium hover:bg-[#f7f3eb] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-4 border-t border-[#ede4d0]">
                <Link
                  href="/customer/products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Shop Fresh Produce
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
