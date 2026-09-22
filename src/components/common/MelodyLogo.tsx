import React from "react";
import Image from "next/image";

interface MelodyLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: "light" | "dark";
  useFaviconImg?: boolean;
}

export default function MelodyLogo({
  size = 32,
  className = "",
  showText = false,
  textColor = "light",
  useFaviconImg = false,
}: MelodyLogoProps) {
  const iconElement = useFaviconImg ? (
    <img
      src="/icon.svg"
      alt="Melody Logo"
      width={size}
      height={size}
      className={`rounded-xl shadow-xs shrink-0 ${className}`}
    />
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-xl shadow-xs shrink-0 ${className}`}
      aria-hidden={showText ? "true" : undefined}
      aria-label={!showText ? "Melody Logo" : undefined}
      role="img"
    >
      <defs>
        <linearGradient id="melodyBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1b4332" />
          <stop offset="100%" stopColor="#0a1f13" />
        </linearGradient>
        <linearGradient id="melodyLeaf" x1="18" y1="14" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#74c69d" />
          <stop offset="60%" stopColor="#52b788" />
          <stop offset="100%" stopColor="#2d6a4f" />
        </linearGradient>
        <linearGradient id="melodyGold" x1="28" y1="22" x2="48" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f0c36d" />
          <stop offset="100%" stopColor="#d4a852" />
        </linearGradient>
      </defs>

      {/* Squircle Base matching favicon */}
      <rect width="64" height="64" rx="18" fill="url(#melodyBg)" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="17.25" stroke="#52b788" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* Organic Sprout / Leaf Motif */}
      <path d="M19 46C19 46 17 31 26 23C32.5 17 41.5 15 47 15C47 15 48 27.5 40 36C33.5 43 24 45.5 19 46Z" fill="url(#melodyLeaf)" />
      <path d="M21 44C27.5 37 35.5 27 44 17" stroke="#102e1c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 35C33.5 30 40 26 47 25C47 32 43 38.5 37 41C33.5 42.5 30.5 39.5 30 35Z" fill="url(#melodyGold)" />
      <circle cx="47" cy="16" r="3.5" fill="#fef9ee" />
    </svg>
  );

  if (!showText) {
    return iconElement;
  }

  const isLight = textColor === "light";

  return (
    <div className="inline-flex items-center gap-2.5">
      {iconElement}
      <span
        className={`font-display font-black text-2xl tracking-tight leading-none ${
          isLight ? "text-white" : "text-[#1a2e1c]"
        }`}
      >
        Melody<span className="text-[#74c69d]">.</span>
      </span>
    </div>
  );
}

