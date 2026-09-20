"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.25,
          ease: [0.25, 1, 0.5, 1], // Custom smooth cubic-bezier
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
