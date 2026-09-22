"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `target` when scrolled into view.
 * Uses Framer Motion spring physics for a natural feel.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          target % 1 !== 0
            ? latest.toFixed(1)
            : Math.round(latest).toLocaleString("en-IN");
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

