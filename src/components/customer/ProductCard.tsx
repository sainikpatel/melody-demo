"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Star, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const { farmers, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const farmer = farmers.find((f) => f.id === product.farmerId);
  const cardRef = useRef<HTMLDivElement>(null);

  // ── 3-D tilt ────────────────────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 260,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 260,
    damping: 30,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ── add to cart ─────────────────────────────────────────────────────────────
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white rounded-2xl border border-[#ede4d0]/60 shadow-sm overflow-hidden flex flex-col h-full cursor-pointer group"
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 60%)`,
        }}
      />

      {/* Product Image */}
      <Link
        href={`/customer/products/${product.id}`}
        className="relative h-52 overflow-hidden block bg-[#f7f3eb] shrink-0"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-20">
          {product.isOrganic && (
            <span className="bg-[#1b4332]/90 backdrop-blur-md text-[#74c69d] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              🌱 Organic
            </span>
          )}
          {product.stock <= 30 && (
            <span className="bg-[#d4a852]/90 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Category pill */}
        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#1a2e1c] text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-white/50 z-20">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Farmer + rating */}
        <div className="flex items-center justify-between gap-1 text-xs text-[#6b7c6e] mb-1.5">
          <div className="flex items-center gap-1.5 text-[#2d6a4f] font-medium min-w-0">
            <ShieldCheck size={13} className="shrink-0" />
            <span className="truncate">{farmer?.name || "Verified Farm"}</span>
          </div>
          {farmer?.rating && (
            <div className="flex items-center gap-0.5 text-[#d4a852] font-semibold shrink-0">
              <Star size={11} className="fill-[#d4a852] text-[#d4a852]" />
              <span>{farmer.rating}</span>
            </div>
          )}
        </div>

        {/* Product name */}
        <Link
          href={`/customer/products/${product.id}`}
          className="font-bold text-[#1a2e1c] hover:text-[#2d6a4f] transition-colors line-clamp-1 text-base mb-1.5"
        >
          {product.name}
        </Link>

        {/* Description */}
        <p className="text-xs text-[#6b7c6e] line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing & Add */}
        <div className="mt-auto pt-3 border-t border-[#f7f3eb] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#1a2e1c]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#6b7c6e] font-medium">
                / {product.unit}
              </span>
            </div>
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            animate={added ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 400 }}
            className={`h-10 px-4 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors duration-200 shrink-0 ${
              added
                ? "bg-[#2d6a4f] text-white"
                : "bg-[#f7f3eb] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white border border-[#ede4d0] hover:border-[#2d6a4f]"
            }`}
          >
            {added ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <Plus size={15} /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
