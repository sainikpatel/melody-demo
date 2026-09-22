"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Star,
  MapPin,
  Award,
  Heart,
  Sprout,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── data ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Verified Farm Partners", value: 500, suffix: "+" },
  { label: "Urban Households Fed", value: 10000, suffix: "+" },
  { label: "Orders Delivered", value: 50000, suffix: "+" },
  { label: "Average Customer Rating", value: 4.9, suffix: " ★" },
];

const steps = [
  {
    step: "01",
    icon: Sprout,
    title: "Harvested to Order",
    desc: "Partner farmers harvest your produce only after your order is confirmed. Zero cold storage, no ethylene ripening gases.",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: "Audited & Natural QC",
    desc: "Every batch is inspected at the local farm hub for chemical purity, crispness, and safe non-plastic packing.",
  },
  {
    step: "03",
    icon: Truck,
    title: "Doorstep Delivery (<24h)",
    desc: "Dispatched directly from regional farm clusters to your door via optimized routes to guarantee peak nutrient retention.",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Chemical-Free & Organic",
    desc: "Every product is sourced from vetted farms with natural soil enrichment and certified pesticide-free practices.",
  },
  {
    icon: Award,
    title: "Full Harvest Traceability",
    desc: "Know exactly which farm grew your vegetables, the harvest timestamp, and the farmer behind your food.",
  },
  {
    icon: Heart,
    title: "Fair Pricing for Farming Families",
    desc: "By removing 4-5 layers of distributors, farmers earn up to 3× higher realization on every kilogram harvested.",
  },
  {
    icon: Truck,
    title: "Reliable Cold-Chain Logistics",
    desc: "Real-time dispatch alerts and temperature-controlled transit ensure delicate greens arrive garden-fresh.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    text: "The difference in taste is unmistakable. The palak and coriander stay fresh in our fridge for nearly a week because they were harvested hours before reaching us.",
    avatar: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Koregaon Park, Pune",
    rating: 5,
    text: "Seeing the exact farm origin and knowing 80%+ of what I pay goes straight to the farmer makes Melody the only grocery platform we now order from.",
    avatar: "RM",
  },
  {
    name: "Ananya Krishnan",
    location: "Adyar, Chennai",
    rating: 5,
    text: "Switched our family's weekly produce to Melody. The Alphonso mangoes and heirloom tomatoes remind me of produce from my village childhood.",
    avatar: "AK",
  },
  {
    name: "Vikram Patel",
    location: "Bodakdev, Ahmedabad",
    rating: 5,
    text: "Their delivery tracking is transparent and reliable. High-grade organic vegetables with none of the supermarket artificial wax coating.",
    avatar: "VP",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);

  return (
    <div className="bg-[#f7f3eb] text-[#1a2e1c] overflow-x-hidden min-h-screen flex flex-col selection:bg-[#2d6a4f] selection:text-white">
      {/* ════════════════════════════════════════
          PRODUCTION TOP NAVIGATION
      ════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          navScrolled
            ? "bg-[#0d2818]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10 py-3"
            : "bg-[#0d2818] border-b border-white/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-xl bg-[#2d6a4f] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Leaf size={16} className="text-[#74c69d]" />
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Melody<span className="text-[#74c69d]">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-emerald-100/80">
            <Link
              href="/customer"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              Shop Produce
            </Link>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              How It Works
            </a>
            <a
              href="#why-melody"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              Why Melody
            </a>
            <a
              href="#farmers"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              Verified Farms
            </a>
            <a
              href="#reviews"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1"
            >
              Reviews
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/farmer"
              className="text-xs font-semibold text-emerald-200/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Farmer Portal
            </Link>
            <Link
              href="/customer"
              className="inline-flex items-center gap-2 bg-[#d4a852] hover:bg-[#c59842] text-[#132819] font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl transition-all duration-150 shadow-sm hover:shadow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a852]"
            >
              Shop Fresh Produce
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#0d2818] border-t border-white/10 px-4 pt-3 pb-6 space-y-3"
            >
              <nav className="flex flex-col space-y-2 text-sm font-medium text-emerald-100">
                <Link
                  href="/customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  Shop Produce
                </Link>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  How It Works
                </a>
                <a
                  href="#why-melody"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  Why Melody
                </a>
                <a
                  href="#farmers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  Verified Farms
                </a>
                <a
                  href="#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  Reviews
                </a>
              </nav>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <Link
                  href="/customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#d4a852] hover:bg-[#c59842] text-[#132819] font-bold text-sm py-3 rounded-xl transition-colors shadow-sm"
                >
                  Shop Fresh Produce
                </Link>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                  <Link
                    href="/farmer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-lg bg-white/5 text-emerald-200 hover:bg-white/10"
                  >
                    Farmer Portal
                  </Link>
                  <Link
                    href="/driver"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-lg bg-white/5 text-emerald-200 hover:bg-white/10"
                  >
                    Driver Portal
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-b from-[#0d2818] via-[#123621] to-[#1a442d] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4a852]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Content (7 Cols) ── */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
                <Leaf size={13} className="text-[#74c69d]" aria-hidden="true" />
                Direct Farm-to-Table Marketplace
                <span className="text-[#d4a852] font-bold">&middot; 100% Transparent</span>
              </div>

              {/* Headline */}
              <h1
                id="hero-heading"
                className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-white leading-[1.08] tracking-tight mb-6"
              >
                Fresh harvest,
                <br />
                <span className="text-[#74c69d] italic font-normal">
                  straight from verified farms
                </span>
                <br />
                to your table.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-emerald-100/85 max-w-xl leading-relaxed mb-8 font-normal">
                Zero middlemen. Transparent farm payouts. Chemical-free organic
                produce harvested within 24 hours of your confirmation and delivered
                directly to your doorstep.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
                <Link
                  href="/customer"
                  className="inline-flex items-center justify-center gap-2 bg-[#d4a852] hover:bg-[#c59842] text-[#132819] font-bold text-base px-7 py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#d4a852]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4a852]"
                >
                  Shop Fresh Produce
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="/farmer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  Become a Farm Partner
                </Link>
              </div>

              {/* Trust Value Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-7 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-emerald-100/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#74c69d]" />
                  </div>
                  <span>Fair farm payout (80%+)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-emerald-100/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#74c69d]" />
                  </div>
                  <span>Harvested to order (&lt;24h)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-emerald-100/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#74c69d]" />
                  </div>
                  <span>100% vetted organic farms</span>
                </div>
              </div>
            </div>

            {/* ── Right Content: Unified Farm Showcase Card (5 Cols) ── */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white text-[#1a2e1c] p-4 shadow-2xl shadow-black/30 border border-white/20 max-w-md mx-auto lg:max-w-none transition-transform duration-300 hover:-translate-y-1">
                {/* Farm Image with Verified Badge */}
                <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=85"
                    alt="Organic partner farm landscape in Coorg"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Pinned Verification Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#1b4332] text-[11px] font-black px-3 py-1 rounded-full shadow flex items-center gap-1 border border-white/60">
                    <ShieldCheck size={13} className="text-emerald-700" />
                    CERTIFIED PARTNER
                  </div>

                  {/* In-Image Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-bold text-base leading-tight">
                      Krishnamurthy Organic Farms
                    </p>
                    <p className="text-xs text-emerald-200/90 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="shrink-0 text-[#74c69d]" />
                      Coorg, Karnataka &middot; Certified Organic Cluster
                    </p>
                  </div>
                </div>

                {/* Card Body: Real-time Batch Snapshot */}
                <div className="pt-4 space-y-3">
                  {/* Current Harvest Box */}
                  <div className="bg-[#f7f3eb] rounded-xl p-3.5 border border-[#ede4d0]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🍅</span>
                        <div>
                          <p className="font-bold text-sm text-[#1a2e1c] leading-snug">
                            Heirloom Field Tomatoes
                          </p>
                          <p className="text-[11px] text-[#4a5c4e]">
                            Harvested today at 5:30 AM
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        ₹45 / kg
                      </span>
                    </div>

                    {/* Pricing Transparency Bar */}
                    <div className="pt-2 border-t border-[#ede4d0] flex items-center justify-between text-[11px]">
                      <span className="text-[#4a5c4e]">Farmer Realization:</span>
                      <span className="font-bold text-emerald-800">
                        82% of retail price (₹37 / kg)
                      </span>
                    </div>
                  </div>

                  {/* Trust Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="bg-[#f7f3eb]/60 rounded-lg py-2 px-1 border border-[#ede4d0]/60">
                      <p className="font-black text-sm text-[#1a2e1c]">4.9 ★</p>
                      <p className="text-[10px] text-[#4a5c4e]">1,240+ Reviews</p>
                    </div>
                    <div className="bg-[#f7f3eb]/60 rounded-lg py-2 px-1 border border-[#ede4d0]/60">
                      <p className="font-black text-sm text-[#2d6a4f]">&lt; 24h</p>
                      <p className="text-[10px] text-[#4a5c4e]">Harvest to Door</p>
                    </div>
                    <div className="bg-[#f7f3eb]/60 rounded-lg py-2 px-1 border border-[#ede4d0]/60">
                      <p className="font-black text-sm text-[#d4a852]">0%</p>
                      <p className="text-[10px] text-[#4a5c4e]">Synthetic Pesticides</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <section className="bg-[#1b4332] py-12 lg:py-16 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} direction="up">
                <div className="text-center">
                  <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#74c69d] mb-1.5 tabular-nums">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1400}
                    />
                  </div>
                  <div className="text-emerald-100/80 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-[#f7f3eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-[#2d6a4f] text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-4">
              <Sprout size={13} /> Transparent Supply Chain
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1a2e1c] leading-tight mb-4">
              From the soil to your table
            </h2>
            <p className="text-[#4a5c4e] text-base sm:text-lg leading-relaxed">
              We cut out wholesale mandi auctions, cold storage delays, and artificial
              ripeners. Here is how your order reaches you fresh.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1} direction="up">
                <div className="bg-white rounded-2xl p-7 border border-[#ede4d0] shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2d6a4f] flex items-center justify-center font-bold">
                      <step.icon size={24} />
                    </div>
                    <span className="font-display font-black text-2xl text-[#d4a852]/60">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#1a2e1c] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[#4a5c4e] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY MELODY (FEATURES)
      ════════════════════════════════════════ */}
      <section id="why-melody" className="py-20 lg:py-28 bg-white border-y border-[#ede4d0]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <ScrollReveal direction="left" className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 text-[#2d6a4f] text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-4">
                <Award size={13} /> Why Melody
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1a2e1c] leading-tight mb-5">
                Built for farmer equity.
                <br />
                <span className="text-[#2d6a4f] italic font-normal">
                  Delivered for peak nutrition.
                </span>
              </h2>
              <p className="text-[#4a5c4e] text-base leading-relaxed mb-8">
                Traditional retail chains take 5 to 9 days to move produce from farms to store
                shelves. By connecting verified farms directly with urban consumers, Melody preserves
                both natural flavor and essential nutrients.
              </p>
              <Link
                href="/customer"
                className="inline-flex items-center gap-2 text-[#2d6a4f] font-bold text-base hover:text-[#1b4332] group transition-colors"
              >
                Browse Available Harvest
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </ScrollReveal>

            {/* Right Features Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.title} delay={i * 0.08} direction="up">
                  <div className="bg-[#f7f3eb] rounded-2xl p-6 border border-[#ede4d0] hover:bg-white hover:shadow-sm transition-all duration-200 h-full">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#ede4d0] flex items-center justify-center text-[#2d6a4f] mb-4 shadow-2xs">
                      <feature.icon size={20} />
                    </div>
                    <h3 className="font-bold text-[#1a2e1c] text-base mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#4a5c4e] text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VERIFIED FARMS SPOTLIGHT
      ════════════════════════════════════════ */}
      <section id="farmers" className="py-20 lg:py-28 bg-[#f7f3eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-[#2d6a4f] text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-4">
              <ShieldCheck size={13} /> Partner Network
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1a2e1c] leading-tight mb-3">
              Meet our partner farmers
            </h2>
            <p className="text-[#4a5c4e] text-base">
              Every Melody farmer is personally vetted for sustainable soil practices and fair labor standards.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Green Valley Agro Farm",
                location: "Nashik, Maharashtra",
                specialty: "Vegetables & Leafy Greens",
                rating: 4.9,
                since: "2023",
              },
              {
                name: "Sunrise Organic Farms",
                location: "Pune, Maharashtra",
                specialty: "Raw Wild Honey & Spices",
                rating: 4.8,
                since: "2022",
              },
              {
                name: "Western Ghats Orchards",
                location: "Mahabaleshwar, Maharashtra",
                specialty: "Strawberries & Berry Fruits",
                rating: 4.95,
                since: "2023",
              },
              {
                name: "Shanti Natural Dairy",
                location: "Satara, Maharashtra",
                specialty: "A2 Desi Cow Milk & Ghee",
                rating: 4.75,
                since: "2023",
              },
            ].map((farmer) => (
              <div
                key={farmer.name}
                className="bg-white rounded-2xl p-5 border border-[#ede4d0] shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                    <ShieldCheck size={12} className="text-emerald-700" /> Vetted
                  </span>
                  <span className="text-xs font-bold text-[#d4a852] flex items-center gap-0.5">
                    <Star size={12} className="fill-[#d4a852]" /> {farmer.rating}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#1a2e1c] mb-1">
                  {farmer.name}
                </h3>
                <p className="text-xs text-[#4a5c4e] flex items-center gap-1 mb-3">
                  <MapPin size={12} className="text-[#2d6a4f] shrink-0" />
                  {farmer.location}
                </p>

                <div className="mt-auto pt-3 border-t border-[#f7f3eb] text-xs">
                  <p className="text-[11px] text-[#4a5c4e]">
                    Specialty: <span className="font-semibold text-[#1a2e1c]">{farmer.specialty}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section id="reviews" className="py-20 lg:py-28 bg-white border-y border-[#ede4d0]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-[#2d6a4f] text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-4">
              <Heart size={13} /> Verified Customers
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1a2e1c] leading-tight mb-3">
              Trusted by 10,000+ families
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-[#f7f3eb] rounded-3xl p-8 sm:p-10 border border-[#ede4d0] shadow-sm text-center"
              >
                {/* Stars */}
                <div
                  className="flex justify-center gap-1 mb-5"
                  aria-label={`Rating: ${testimonials[currentTestimonial].rating} out of 5 stars`}
                >
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#d4a852] text-[#d4a852]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-lg sm:text-xl text-[#1a2e1c] leading-relaxed mb-6 font-normal italic">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-bold text-[#1a2e1c] text-base">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-xs text-[#4a5c4e] mt-0.5">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-[#ede4d0] bg-white hover:bg-[#f7f3eb] flex items-center justify-center text-[#4a5c4e] hover:text-[#1a2e1c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                aria-label="Previous customer testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentTestimonial
                        ? "w-6 h-2 bg-[#2d6a4f]"
                        : "w-2 h-2 bg-[#2d6a4f]/20 hover:bg-[#2d6a4f]/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-[#ede4d0] bg-white hover:bg-[#f7f3eb] flex items-center justify-center text-[#4a5c4e] hover:text-[#1a2e1c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                aria-label="Next customer testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CLOSING CTA
      ════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0d2818] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 mb-6">
            <Leaf size={13} /> Direct Farm Support
          </span>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Taste the difference of true
            <br />
            <span className="text-[#74c69d] italic font-normal">farm-fresh nutrition.</span>
          </h2>

          <p className="text-emerald-100/80 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Order before midnight and our partner farms begin harvesting at 5:00 AM.
            Your harvest arrives at your door the same afternoon.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/customer"
              className="inline-flex items-center justify-center gap-2 bg-[#d4a852] hover:bg-[#c59842] text-[#132819] font-bold text-base px-8 py-3.5 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
            >
              Shop Fresh Produce
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/farmer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-7 py-3.5 rounded-xl border border-white/20 transition-all hover:-translate-y-0.5"
            >
              Become a Farm Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCTION FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-[#08180e] text-emerald-100/70 py-14 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white">
                  <Leaf size={14} className="text-[#74c69d]" />
                </div>
                <span className="font-display font-black text-2xl text-white">
                  Melody<span className="text-[#74c69d]">.</span>
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-emerald-200/60 max-w-sm leading-relaxed mb-4">
                India&apos;s direct farm-to-table platform empowering organic farming
                families with fair realization and consumers with same-day harvested produce.
              </p>
              <p className="text-xs text-emerald-300/40">
                FSSAI Certified &middot; Verified Organic Supply Chain
              </p>
            </div>

            {/* Column 2: Marketplace Navigation */}
            <div>
              <p className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">
                Marketplace
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/customer" className="hover:text-white transition-colors">
                    Shop Fresh Produce
                  </Link>
                </li>
                <li>
                  <Link href="/customer/products" className="hover:text-white transition-colors">
                    All Categories
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How Delivery Works
                  </a>
                </li>
                <li>
                  <a href="#why-melody" className="hover:text-white transition-colors">
                    Traceability Standards
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Partner Portals (Existing Functionality Preserved) */}
            <div>
              <p className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">
                Partner Portals
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/farmer" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Farmer Operations Portal &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/driver" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Driver Dispatch Portal &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                    Admin Analytics Console &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/customer/orders" className="hover:text-white transition-colors">
                    Track Customer Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/50">
            <p>&copy; {new Date().getFullYear()} Melody Technologies Pvt. Ltd. All rights reserved.</p>
            <p>Direct Farm-to-Consumer &middot; Made with care in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
