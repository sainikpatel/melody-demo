"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  distance?: number;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
};

/**
 * Wraps children in a Framer Motion div that reveals on scroll.
 * Triggers once by default. Supports stagger via delay prop.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  distance,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  const initial = distance
    ? { opacity: 0, y: direction === "up" ? distance : direction === "down" ? -distance : 0, x: 0 }
    : { opacity: 0, ...directionMap[direction] };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

