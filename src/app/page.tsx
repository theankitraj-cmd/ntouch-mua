"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";

import {
  Menu,
  X,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Mail,
  Star,
  Send,
  ChevronDown,
  Sparkles,
  Award,
  Heart,
  Calendar,
  MessageCircle,
  ArrowRight,
  Quote,
  Check,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

/* ═══════════════════════════════════════════════════════
   UTILITY HOOKS & COMPONENTS
   ═══════════════════════════════════════════════════════ */

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startCounting]);
  return count;
}

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: `linear-gradient(135deg, #D4AF37, #E9C349)`,
            opacity: p.opacity,
            animation: `particle-drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DYNAMIC ISLAND NAVBAR
   ═══════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#testimonials" },
  ];

  // The island expands if we hover, open the mobile menu, OR if we haven't scrolled down yet.
  const isExpanded = hovered || mobileMenuOpen || !scrolled;
  const springConfig = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          layout
          initial={false}
          animate={{
            width: isExpanded ? "100%" : "120px",
            maxWidth: isExpanded ? "640px" : "120px",
            height: isExpanded ? "64px" : "40px",
            backgroundColor: scrolled && !hovered ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.6)",
            backdropFilter: scrolled && !hovered ? "blur(8px)" : "blur(24px)",
            borderRadius: isExpanded ? "32px" : "20px"
          }}
          transition={springConfig}
          className="pointer-events-auto flex items-center justify-between px-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden text-nowrap"
        >
          {/* Logo */}
          <motion.div 
            layout="position"
            transition={springConfig}
            className="z-20 flex-shrink-0 flex items-center"
            animate={{ flex: isExpanded ? 0 : 1, justifyContent: isExpanded ? "flex-start" : "center" }}
            style={{ width: isExpanded ? "auto" : "100%" }}
          >
            <a href="#" className="font-display text-xl md:text-2xl font-semibold tracking-wide text-white">
              N.Touch
            </a>
          </motion.div>

          {/* Desktop Links Container */}
          <motion.div 
            className="hidden md:flex items-center gap-6 absolute right-5 z-10"
            animate={{ opacity: isExpanded ? 1 : 0, filter: isExpanded ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs font-medium tracking-[0.1em] uppercase text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wide transition-transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            animate={{ opacity: isExpanded ? 1 : 0, filter: isExpanded ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-white absolute right-5 z-20"
            style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </motion.nav>
      </div>

      {/* iOS Control Center Style Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, backdropFilter: "blur(40px)" } : { opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-40 bg-black/40 flex flex-col justify-center px-6 md:hidden"
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mt-16">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={mobileMenuOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 25 }}
              className="aspect-square bg-white/10 border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {i === 0 ? <Star className="w-5 h-5 text-white" /> : i === 1 ? <Sparkles className="w-5 h-5 text-white" /> : i === 2 ? <Award className="w-5 h-5 text-white" /> : <Heart className="w-5 h-5 text-white" />}
              </div>
              <span className="font-body text-sm tracking-widest uppercase text-white font-medium">{link.label}</span>
            </motion.a>
          ))}
          
          <motion.a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            className="col-span-2 h-24 bg-gradient-to-r from-blush-500 to-blush-700 border border-white/20 rounded-3xl flex items-center justify-between px-8 active:scale-95 transition-transform"
          >
            <div className="flex flex-col">
              <span className="font-display text-2xl text-white tracking-wide">Book Now</span>
              <span className="font-body text-xs text-white/70 uppercase tracking-widest">Reserve your date</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </motion.a>

          {/* Dummy controls to complete the Control Center look */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="col-span-2 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center px-6 gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Instagram className="w-4 h-4 text-white" />
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden flex">
               <div className="w-3/4 h-full bg-white rounded-full" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING MAKEUP SVG ILLUSTRATIONS
   ═══════════════════════════════════════════════════════ */

function MakeupLips({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className={className}>
      <path d="M40 8C25 8 10 20 10 32C10 44 22 52 40 52C58 52 70 44 70 32C70 20 55 8 40 8Z" fill="#E84B6A" opacity="0.9"/>
      <path d="M40 8C32 8 18 16 14 26C20 22 30 20 40 22C50 20 60 22 66 26C62 16 48 8 40 8Z" fill="#FF6B8A"/>
      <path d="M10 32C10 32 22 28 40 30C58 28 70 32 70 32" stroke="#C13355" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="18" rx="8" ry="3" fill="white" opacity="0.3"/>
    </svg>
  );
}

function MakeupBrush({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 100" fill="none" className={className}>
      <rect x="9" y="35" width="6" height="60" rx="2" fill="#E8C8A0" />
      <rect x="10" y="35" width="4" height="60" rx="1" fill="#D4AF37" opacity="0.3"/>
      <ellipse cx="12" cy="20" rx="10" ry="20" fill="#2E131E" opacity="0.8"/>
      <ellipse cx="12" cy="15" rx="8" ry="15" fill="#4A2035"/>
      <ellipse cx="10" cy="12" rx="3" ry="6" fill="#5A2D42" opacity="0.6"/>
    </svg>
  );
}

function MakeupFoundation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 90" fill="none" className={className}>
      <rect x="10" y="20" width="30" height="60" rx="6" fill="#F5D5C8"/>
      <rect x="12" y="22" width="26" height="56" rx="4" fill="#FCEADE"/>
      <rect x="18" y="8" width="14" height="16" rx="3" fill="#E8C8A0"/>
      <rect x="20" y="2" width="10" height="8" rx="5" fill="#D4AF37"/>
      <text x="25" y="55" textAnchor="middle" fontSize="8" fill="#8B6552" fontFamily="serif">N.</text>
      <rect x="15" y="65" width="20" height="3" rx="1" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}

function MakeupPerfume({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" className={className}>
      <rect x="15" y="30" width="30" height="50" rx="8" fill="url(#perfGrad)" opacity="0.8"/>
      <defs><linearGradient id="perfGrad" x1="15" y1="30" x2="45" y2="80"><stop stopColor="#FFB0CA"/><stop offset="1" stopColor="#D4456B"/></linearGradient></defs>
      <rect x="22" y="20" width="16" height="14" rx="2" fill="#E8D5C0"/>
      <rect x="26" y="10" width="8" height="12" rx="1" fill="#D4AF37"/>
      <rect x="28" y="4" width="4" height="8" rx="2" fill="#C9A96E"/>
      <ellipse cx="30" cy="55" rx="8" ry="10" fill="white" opacity="0.15"/>
    </svg>
  );
}

function MakeupPalette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 60" fill="none" className={className}>
      <rect x="5" y="5" width="80" height="50" rx="8" fill="#2E131E" opacity="0.85"/>
      <rect x="8" y="8" width="74" height="44" rx="6" fill="#3D1A28"/>
      <circle cx="22" cy="22" r="8" fill="#E84B6A"/>
      <circle cx="45" cy="22" r="8" fill="#FFB0CA"/>
      <circle cx="68" cy="22" r="8" fill="#D4AF37"/>
      <circle cx="22" cy="40" r="8" fill="#8B2252"/>
      <circle cx="45" cy="40" r="8" fill="#F8C8D8"/>
      <circle cx="68" cy="40" r="8" fill="#C9A96E"/>
      <circle cx="22" cy="22" r="3" fill="white" opacity="0.2"/>
      <circle cx="45" cy="22" r="3" fill="white" opacity="0.2"/>
      <circle cx="68" cy="22" r="3" fill="white" opacity="0.2"/>
    </svg>
  );
}

function MakeupMascara({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 90" fill="none" className={className}>
      <rect x="4" y="5" width="12" height="45" rx="4" fill="#2E131E"/>
      <rect x="6" y="8" width="8" height="20" rx="3" fill="#3D1A28"/>
      <rect x="5" y="50" width="10" height="35" rx="3" fill="#2E131E" opacity="0.9"/>
      <rect x="7" y="52" width="6" height="15" rx="2" fill="#D4AF37" opacity="0.3"/>
      <ellipse cx="10" cy="12" rx="2" ry="4" fill="white" opacity="0.15"/>
    </svg>
  );
}

function MakeupLipstick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 90" fill="none" className={className}>
      <rect x="6" y="35" width="18" height="50" rx="4" fill="#2E131E"/>
      <rect x="8" y="38" width="14" height="20" rx="2" fill="#D4AF37" opacity="0.3"/>
      <path d="M8 35 L8 15 Q8 5 15 5 Q22 5 22 15 L22 35Z" fill="#E84B6A"/>
      <path d="M10 35 L10 18 Q10 10 15 10 Q20 10 20 18 L20 35Z" fill="#FF6B8A" opacity="0.6"/>
      <ellipse cx="14" cy="15" rx="3" ry="5" fill="white" opacity="0.2"/>
      <rect x="6" y="33" width="18" height="4" rx="1" fill="#C9A96E"/>
    </svg>
  );
}

function MakeupEyelash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" fill="none" className={className}>
      <path d="M5 35 Q15 10 25 20 Q30 5 40 18 Q45 2 55 15 Q60 5 70 20 Q75 12 78 30" stroke="#2E131E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M5 35 Q40 25 78 30" stroke="#2E131E" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function MakeupMirror({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" className={className}>
      <circle cx="30" cy="28" r="24" fill="#FFE8EE" stroke="#D4AF37" strokeWidth="2.5"/>
      <circle cx="30" cy="28" r="20" fill="white" opacity="0.3"/>
      <ellipse cx="24" cy="22" rx="6" ry="8" fill="white" opacity="0.2"/>
      <rect x="27" y="52" width="6" height="22" rx="3" fill="#D4AF37"/>
      <ellipse cx="30" cy="76" rx="10" ry="4" fill="#C9A96E" opacity="0.5"/>
    </svg>
  );
}

function MakeupNailPolish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 80" fill="none" className={className}>
      <rect x="6" y="30" width="18" height="40" rx="6" fill="#D4456B"/>
      <rect x="8" y="32" width="14" height="36" rx="4" fill="#E84B6A" opacity="0.7"/>
      <rect x="10" y="22" width="10" height="12" rx="2" fill="#2E131E"/>
      <rect x="12" y="14" width="6" height="10" rx="3" fill="#2E131E"/>
      <ellipse cx="13" cy="45" rx="4" ry="8" fill="white" opacity="0.15"/>
    </svg>
  );
}

function FloatingHearts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 55" fill="none" className={className}>
      <path d="M30 50 C10 30 0 15 15 8 C22 4 28 10 30 16 C32 10 38 4 45 8 C60 15 50 30 30 50Z" fill="#FFB0CA" opacity="0.7"/>
      <path d="M48 30 C40 22 36 16 42 13 C45 11 47 14 48 16 C49 14 51 11 54 13 C60 16 56 22 48 30Z" fill="#FF6B8A" opacity="0.5"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION — MEGA INTERACTIVE
   ═══════════════════════════════════════════════════════ */

function SparkleParticle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[8]"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 0.8, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 2,
      }}
    >
      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-300" />
    </motion.div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const letters = "Nancy Mehta".split("");

  /* GPU-accelerated mouse tracking — NO state updates, NO re-renders */
  useEffect(() => {
    let ticking = false;

    const updatePositions = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* Move cursor glow */
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(calc(-50% + ${mx * 200}px), calc(-50% + ${my * 200}px), 0)`;
      }

      /* Move floating items with parallax depth */
      floatingRefs.current.forEach((el, i) => {
        if (el) {
          const depth = floatingDepths[i] || 0.5;
          el.style.setProperty("--px", `${mx * 15 * depth}px`);
          el.style.setProperty("--py", `${my * 15 * depth}px`);
        }
      });

      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(updatePositions);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Sparkle positions — reduced to 6 for performance */
  const sparkles = [
    { x: 25, y: 30, delay: 0 }, { x: 72, y: 28, delay: 0.8 },
    { x: 18, y: 55, delay: 1.5 }, { x: 78, y: 52, delay: 2.2 },
    { x: 45, y: 22, delay: 2.8 }, { x: 55, y: 62, delay: 0.4 },
  ];

  /* Floating makeup items — parallax depths for ref-based movement */
  const floatingDepths = [0.8, 0.4, 0.6, 0.7, 0.3, 0.9, 0.5, 0.3, 0.6, 0.8, 0.2, 0.7, 0.4, 0.5, 0.6, 0.3];

  const floatingItems = [
    { Component: MakeupLips, className: "w-22 md:w-32", style: { top: "8%", left: "4%", animationDelay: "0s", animationDuration: "7s" } },
    { Component: MakeupBrush, className: "w-10 md:w-14", style: { top: "12%", right: "7%", animationDelay: "1.2s", animationDuration: "8s", transform: "rotate(-30deg)" } },
    { Component: MakeupFoundation, className: "w-14 md:w-20", style: { top: "58%", left: "2%", animationDelay: "2.5s", animationDuration: "9s" } },
    { Component: MakeupPerfume, className: "w-16 md:w-24", style: { bottom: "18%", right: "3%", animationDelay: "0.8s", animationDuration: "7.5s" } },
    { Component: MakeupPalette, className: "w-22 md:w-32", style: { top: "4%", right: "18%", animationDelay: "1.5s", animationDuration: "8.5s" } },
    { Component: MakeupMascara, className: "w-7 md:w-10", style: { top: "52%", right: "10%", animationDelay: "3s", animationDuration: "7s", transform: "rotate(15deg)" } },
    { Component: MakeupLipstick, className: "w-10 md:w-14", style: { bottom: "22%", left: "8%", animationDelay: "0.5s", animationDuration: "8s", transform: "rotate(-15deg)" } },
    { Component: MakeupEyelash, className: "w-18 md:w-28", style: { top: "10%", left: "20%", animationDelay: "2s", animationDuration: "9s" } },
    { Component: MakeupMirror, className: "w-14 md:w-20", style: { bottom: "12%", right: "20%", animationDelay: "1s", animationDuration: "7.8s" } },
    { Component: MakeupNailPolish, className: "w-9 md:w-12", style: { top: "38%", left: "5%", animationDelay: "3.5s", animationDuration: "8.2s", transform: "rotate(10deg)" } },
    { Component: FloatingHearts, className: "w-16 md:w-22", style: { top: "18%", left: "13%", animationDelay: "0.3s", animationDuration: "6s" } },
    { Component: MakeupBrush, className: "w-8 md:w-12", style: { bottom: "28%", left: "18%", animationDelay: "2.8s", animationDuration: "7.5s", transform: "rotate(45deg)" } },
    { Component: FloatingHearts, className: "w-12 md:w-16", style: { top: "32%", right: "5%", animationDelay: "1.8s", animationDuration: "6.5s" } },
    { Component: MakeupLipstick, className: "w-8 md:w-12", style: { top: "4%", left: "40%", animationDelay: "4s", animationDuration: "8s", transform: "rotate(25deg)" } },
    { Component: MakeupPerfume, className: "w-10 md:w-14", style: { bottom: "8%", left: "35%", animationDelay: "1.2s", animationDuration: "7s" } },
    { Component: MakeupFoundation, className: "w-10 md:w-14", style: { top: "42%", right: "18%", animationDelay: "2.2s", animationDuration: "8.8s" } },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient grain-overlay"
    >
      <GoldParticles />

      {/* ── Interactive Cursor Glow (ref-based, no re-renders) ── */}
      <div
        ref={cursorGlowRef}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none z-[2]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          background: "radial-gradient(circle, rgba(212,69,107,0.15) 0%, rgba(248,200,216,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* ── Pulsing Concentric Rings (CSS-only, no JS) ── */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[3]"
          style={{
            width: `${ring * 220 + 100}px`,
            height: `${ring * 220 + 100}px`,
            borderColor: `rgba(201, 169, 110, ${0.08 / ring})`,
            animation: `pulse-glow ${4 + ring}s ease-in-out ${ring * 0.5}s infinite`,
          }}
        />
      ))}

      {/* ── Rotating Orbit Ring (CSS animation instead of Framer) ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] pointer-events-none z-[4]">
        <div
          className="w-full h-full"
          style={{ animation: "spin 30s linear infinite" }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateX(175px)`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: i % 2 === 0 ? 6 : 4,
                  height: i % 2 === 0 ? 6 : 4,
                  background: i % 2 === 0 ? "#D4AF37" : "#FFB0CA",
                  opacity: 0.6,
                  boxShadow: i % 2 === 0 ? "0 0 8px #D4AF37" : "0 0 6px #FFB0CA",
                }}
              />
            </div>
          ))}
          <div
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: "rgba(201,169,110,0.06)" }}
          />
        </div>
      </div>

      {/* ── Sparkle Bursts (reduced to 6) ── */}
      {sparkles.map((s, i) => (
        <SparkleParticle key={i} x={s.x} y={s.y} delay={s.delay} />
      ))}

      {/* ── Decorative Pink Circles (CSS animations, no Framer) ── */}
      <div
        className="absolute top-[5%] left-[2%] w-28 md:w-44 h-28 md:h-44 rounded-full bg-blush-400/15 pointer-events-none"
        style={{ animation: "pulse-glow 5s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-36 md:w-52 h-36 md:h-52 rounded-full bg-blush-300/10 pointer-events-none"
        style={{ animation: "pulse-glow 6s ease-in-out 1s infinite" }}
      />
      <div
        className="absolute top-[50%] right-[15%] w-20 md:w-28 h-20 md:h-28 rounded-full bg-gold-400/10 pointer-events-none"
        style={{ animation: "pulse-glow 4s ease-in-out 2s infinite" }}
      />
      <div
        className="absolute bottom-[35%] left-[18%] w-24 md:w-36 h-24 md:h-36 rounded-full bg-blush-500/10 pointer-events-none"
        style={{ animation: "pulse-glow 5.5s ease-in-out 0.5s infinite" }}
      />

      {/* ── Floating Makeup Illustrations (ref-based parallax) ── */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          ref={(el) => { floatingRefs.current[i] = el; }}
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.08, type: "spring", stiffness: 100 }}
          className={`absolute pointer-events-none z-[5] ${item.className}`}
          style={{
            ...item.style,
            animation: `float ${item.style.animationDuration} ${item.style.animationDelay} ease-in-out infinite`,
            translate: "var(--px, 0px) var(--py, 0px)",
            willChange: "translate",
          }}
        >
          <item.Component className="w-full h-full drop-shadow-xl" />
        </motion.div>
      ))}

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Decorative lines expanding from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-8 origin-center"
        >
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-400/60" />
          <Sparkles className="w-3 h-3 text-gold-400/60" />
          <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold-400/60" />
        </motion.div>

        {/* Subtitle with shimmer line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-sm md:text-base tracking-[0.25em] uppercase text-white/70 mb-6"
        >
          Lakme Academy Certified
        </motion.p>

        {/* Main heading — letter by letter with glow */}
        <div className="relative inline-block">
          {/* Glow behind text */}
          <motion.div
            className="absolute inset-0 -inset-x-8 -inset-y-4 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,176,202,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <h1 className="relative font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.95] mb-4 hero-name-shimmer">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.6 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block hover:text-blush-300 transition-colors duration-300"
                style={{ transformOrigin: "bottom", cursor: "default" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Stylish subtitle with & and decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-3 md:gap-5 mb-5"
        >
          <div className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
          <span className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-white/60">Stylist</span>
          <motion.span
            className="font-display text-2xl md:text-3xl italic text-gold-400"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>
          <span className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-white/60">Makeup Artist</span>
          <div className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* ── Gooey Text Morphing — Service Types ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{ "--color-foreground": "#ffffff" } as React.CSSProperties}
        >
          <GooeyText
            texts={["Bridal Makeup", "Party Glam", "HD Makeup", "Airbrush", "Editorial"]}
            morphTime={1.2}
            cooldownTime={0.5}
            className="h-[70px] md:h-[90px] mb-4"
            textClassName="font-display text-3xl md:text-5xl font-light tracking-wide !text-white"
          />
        </motion.div>

        {/* Lakme Badge with pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, type: "spring", stiffness: 150 }}
          className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-400/30 bg-white/5 backdrop-blur-sm mb-8"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 20px rgba(212,175,55,0.15)", "0 0 0px rgba(212,175,55,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Award className="w-4 h-4 text-gold-400" />
          <span className="font-body text-xs md:text-sm tracking-[0.15em] uppercase text-gold-300">
            Lakmé Certified
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-base md:text-lg text-white/50 tracking-wide max-w-xl mx-auto mb-10"
        >
          Patna, Bihar &bull; Transforming Faces, Elevating Confidence
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(212,69,107,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-4 rounded-full shimmer-btn text-white font-body font-medium tracking-wide cursor-pointer flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            Book Your Look
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-full border border-white/20 text-white/80 font-body font-medium tracking-wide cursor-pointer transition-all duration-300"
          >
            View Portfolio
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TRUST STRIP
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   SOCIAL PROOF MARQUEE
   ═══════════════════════════════════════════════════════ */

function SocialProofMarquee() {
  const items = [
    "✦ As Seen at Miss Universe 2025",
    "✦ The Cover Girl Event",
    "✦ 100+ Happy Brides",
    "✦ Lakme Academy Certified",
    "✦ Patna's Premier Makeup Artist",
    "✦ Bridal & Editorial Specialist",
    "✦ HD & Airbrush Expert",
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative bg-black overflow-hidden py-3 border-y border-white/5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["-33.33%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((item, i) => (
          <span
            key={i}
            className="font-body text-xs md:text-sm tracking-[0.15em] uppercase text-white/50 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRUST STRIP
   ═══════════════════════════════════════════════════════ */

function TrustStrip() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { icon: Award, label: "Lakme Certified", value: "", isText: true },
    { icon: Heart, label: "Happy Brides", value: 500, suffix: "+" },
    { icon: Star, label: "Years Experience", value: 7, suffix: "+" },
    { icon: MapPin, label: "Bihar & Beyond", value: "", isText: true },
  ];

  return (
    <section ref={ref} className="relative bg-blush-950 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center gap-2 md:border-r md:last:border-r-0 border-white/10">
              <stat.icon className="w-5 h-5 text-gold-400" />
              {stat.isText ? (
                <span className="font-display text-2xl md:text-3xl font-light text-white">
                  {stat.label}
                </span>
              ) : (
                <>
                  <span className="font-display text-3xl md:text-4xl font-light text-white">
                    <CountUpDisplay
                      end={stat.value as number}
                      inView={inView}
                    />
                    {stat.suffix}
                  </span>
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-white/50">
                    {stat.label}
                  </span>
                </>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function CountUpDisplay({ end, inView }: { end: number; inView: boolean }) {
  const count = useCountUp(end, 2000, inView);
  return <>{count}</>;
}

/* ═══════════════════════════════════════════════════════
   ABOUT THE ARTIST
   ═══════════════════════════════════════════════════════ */

function About() {
  return (
    <section id="about" className="relative py-section bg-surface overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image side */}
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-blush-100 relative shadow-xl">
                <img 
                  src="/about-ceremony.jpg" 
                  alt="Nancy Mehta with Lakme Academy Certificate" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blush-950/40 to-transparent pointer-events-none" />
              </div>
              {/* Floating accent card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:-right-10 glass-dense ghost-border rounded-2xl p-5 ambient-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-500 to-blush-700 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-plum">
                      Lakme Academy
                    </p>
                    <p className="font-body text-xs text-plum-soft">
                      Certified Professional
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <div>
            <ScrollReveal>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
                The Artist
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum leading-tight mb-6">
                About{" "}
                <span className="italic text-blush-500">Nancy</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base md:text-lg text-plum-soft leading-relaxed mb-6">
                Nancy Mehta is a certified Makeup Artist and Skincare Specialist with 2 years of professional experience, trained at the prestigious Lakme Academy. Skilled in creating natural and customized looks, she blends creativity with precision to deliver exceptional results for every client.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-body text-base md:text-lg text-plum-soft leading-relaxed mb-8">
                Her expertise ranges from flawless bridal styling to high-pressure event glam, including her work supporting contestants at <strong className="text-plum font-medium">Miss Universe 2025</strong> and <strong className="text-plum font-medium">The Cover Girl Event</strong>. Every look she creates ensures you step into the spotlight with absolute confidence and radiance.
              </p>
            </ScrollReveal>

            {/* Highlights */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Sparkles, text: "Event & Stage Makeup" },
                  { icon: Heart, text: "Skincare Specialist" },
                  { icon: Star, text: "Miss Universe Experience" },
                  { icon: Award, text: "Lakme Certified" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated transition-colors duration-200 hover:bg-blush-100 cursor-default"
                  >
                    <item.icon className="w-4 h-4 text-blush-500 flex-shrink-0" />
                    <span className="font-body text-sm text-plum">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Work Ethic & Personal Skills */}
            <ScrollReveal delay={0.5}>
              <div className="mt-8 border-t border-blush-200/50 pt-8">
                <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
                  Ethic & Approach
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Impeccable Hygiene", "Time Management", "Client Communication", "Attention to Detail", "Adaptability"].map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full border border-blush-200 bg-surface text-xs font-body tracking-wider text-plum uppercase hover:bg-blush-100 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO GALLERY
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   PORTFOLIO GALLERY (CINEMATIC REVEAL)
   ═══════════════════════════════════════════════════════ */

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filters = ["All", "Bridal", "Party", "Editorial"];

  const works = [
    { id: 1, category: "Bridal", title: "Royal Bride", subtitle: "Traditional elegance", img: "/title-marathi-bride.jpg" },
    { id: 2, category: "Party", title: "Glam Night", subtitle: "Evening sophistication", img: "/editorial-collabs.jpg" },
    { id: 3, category: "Editorial", title: "Vogue Feature", subtitle: "Editorial artistry", img: "/editorial-editorials.jpg" },
    { id: 4, category: "Bridal", title: "Dream Wedding", subtitle: "Timeless beauty", img: "/title-bride.jpg" },
    { id: 5, category: "Party", title: "Reception Glow", subtitle: "Radiant finish", img: "/bride-look-2.jpg" },
    { id: 6, category: "Editorial", title: "Fashion Week", subtitle: "Bold & creative", img: "/title-indo-western.jpg" },
    { id: 7, category: "Bridal", title: "Bengali Bride", subtitle: "Cultural beauty", img: "/title-bengali-bride.jpg" },
    { id: 8, category: "Party", title: "Birthday Glam", subtitle: "Celebration look", img: "/bride-engagement.jpg" },
  ];

  const filtered =
    activeFilter === "All"
      ? works
      : works.filter((w) => w.category === activeFilter);

  const gridPatterns = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
  ];

  return (
    <section id="portfolio" className="relative py-section overflow-hidden bg-surface-elevated transition-colors duration-700">
      {/* Cinematic Background Layer */}
      <AnimatePresence>
        {hoveredImage !== null && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${135 + hoveredImage * 30}deg, 
                  hsl(${340 + hoveredImage * 8}, 60%, 40%), 
                  hsl(${330 + hoveredImage * 10}, 50%, 15%))`
              }}
            />
            {/* Blurring layer so text remains readable */}
            <div className="absolute inset-0 bg-surface-elevated/70 backdrop-blur-[60px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blush-200/20 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4 transition-colors duration-500">
              Portfolio
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-colors duration-500 ${hoveredImage ? 'text-white' : 'text-plum'}`}>
              My <span className="italic text-blush-500">Artistry</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={`font-body text-base max-w-xl mx-auto transition-colors duration-500 ${hoveredImage ? 'text-white/80' : 'text-plum-soft'}`}>
              Each look is a masterpiece crafted with precision and passion.
              Browse through my collection of transformations.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-blush-500 text-white shadow-lg shadow-blush-500/25"
                    : hoveredImage 
                      ? "text-white/60 hover:text-white" 
                      : "text-plum-soft hover:text-plum hover:bg-blush-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {filtered.map((work, i) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredImage(work.id)}
              onMouseLeave={() => setHoveredImage(null)}
              className={`relative group rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                gridPatterns[i % gridPatterns.length]
              }`}
              onClick={() => setSelectedImage(work.id)}
            >
              <img
                src={work.img || `https://images.unsplash.com/photo-${1580000000000 + work.id}?q=80&w=800`}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blush-950/90 via-blush-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-gold-300 mb-1">
                  {work.category}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-white font-light drop-shadow-sm">
                  {work.title}
                </h3>
                <p className="font-body text-sm text-white/70 drop-shadow-sm">{work.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full aspect-[4/3] sm:aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={works.find((w) => w.id === selectedImage)?.img || `https://images.unsplash.com/photo-${1580000000000 + selectedImage}?q=80&w=1200`}
                alt={works.find((w) => w.id === selectedImage)?.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="font-display text-3xl md:text-4xl text-white mb-2">
                  {works.find((w) => w.id === selectedImage)?.title}
                </p>
                <p className="font-body text-sm md:text-base text-white/70 tracking-wide">
                  {works.find((w) => w.id === selectedImage)?.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   APPLE BENTO SERVICES
   ═══════════════════════════════════════════════════════ */

function BentoServices() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const services = [
    {
      id: "bridal",
      title: "Bridal Masterclass",
      subtitle: "The Signature N.Touch Look",
      description: "A comprehensive bridal experience starting with skin prep, flawless HD/Airbrush base, 3D eye makeup, and complete styling. Your big day deserves absolute perfection that photographs beautifully and lasts 16+ hours.",
      colSpan: "md:col-span-2 md:row-span-2",
      bgClass: "bg-gradient-to-br from-[#2e131e] to-[#12050b] text-white",
      icon: Sparkles
    },
    {
      id: "party",
      title: "Party Glam",
      subtitle: "Evening Perfection",
      description: "Turn heads at any event. Seamless base, striking eyes, and a glow that lights up the room.",
      colSpan: "md:col-span-1 md:row-span-1",
      bgClass: "bg-white text-plum",
      icon: Star
    },
    {
      id: "hair",
      title: "Hairstyling",
      subtitle: "Structured & Flowing",
      description: "From classic floral buns to modern Hollywood waves and intricate braids.",
      colSpan: "md:col-span-1 md:row-span-1",
      bgClass: "bg-blush-50 text-plum-900 border border-blush-100",
      icon: Award
    },
    {
      id: "draping",
      title: "Draping",
      subtitle: "Perfect Folds",
      description: "Saree, Lehnga, or Dupatta styling with absolute precision.",
      colSpan: "md:col-span-2 md:row-span-1",
      bgClass: "bg-gradient-to-r from-blush-100 to-blush-200 text-plum-900",
      icon: Heart
    }
  ];

  return (
    <section id="services" className="relative py-section bg-surface-elevated overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
              Services
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum mb-6">
              The <span className="italic text-blush-500">Bento</span> Collection
            </h2>
          </ScrollReveal>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px]">
          {services.map((service) => (
            <motion.div
              layoutId={`card-${service.id}`}
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className={`${service.colSpan} ${service.bgClass} rounded-[32px] p-8 cursor-pointer relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500 flex flex-col`}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div layoutId={`icon-${service.id}`} className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <service.icon className="w-8 h-8" />
              </motion.div>
              <motion.h3 layoutId={`title-${service.id}`} className="font-display text-2xl md:text-3xl font-light mb-2 mt-auto">
                {service.title}
              </motion.h3>
              <motion.p layoutId={`subtitle-${service.id}`} className="font-body text-sm tracking-widest uppercase opacity-60">
                {service.subtitle}
              </motion.p>
              
              {/* Apple-style gradient shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-pointer pointer-events-auto" 
              onClick={() => setSelectedId(null)} 
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className={`${services.find(s => s.id === selectedId)?.bgClass} w-full max-w-2xl relative z-10 rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col pointer-events-auto`}
            >
              <button 
                onClick={() => setSelectedId(null)} 
                className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 opacity-70" />
              </button>

              <motion.div layoutId={`icon-${selectedId}`} className="mb-8">
                {(() => {
                  const Icon = services.find(s => s.id === selectedId)?.icon || Sparkles;
                  return <Icon className="w-12 h-12 opacity-80" />;
                })()}
              </motion.div>
              
              <motion.h3 layoutId={`title-${selectedId}`} className="font-display text-4xl md:text-5xl font-light mb-3">
                {services.find(s => s.id === selectedId)?.title}
              </motion.h3>
              <motion.p layoutId={`subtitle-${selectedId}`} className="font-body text-sm tracking-[0.2em] uppercase opacity-70 mb-8 border-b border-current pb-6 border-opacity-20">
                {services.find(s => s.id === selectedId)?.subtitle}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
                transition={{ delay: 0.2 }}
                className="font-body text-lg leading-relaxed opacity-90 mb-10"
              >
                {services.find(s => s.id === selectedId)?.description}
              </motion.p>

              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                transition={{ delay: 0.3 }}
                href="#booking"
                onClick={() => setSelectedId(null)}
                className="mt-auto self-start px-8 py-4 rounded-full bg-current font-body font-medium tracking-wide hover:scale-105 transition-transform shadow-lg cursor-pointer"
                style={{
                   backgroundColor: selectedId === 'bridal' ? '#fff' : '#1A0A10',
                   color: selectedId === 'bridal' ? '#1A0A10' : '#fff'
                }}
              >
                Book This Service
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════ */

function Testimonials() {
  const [active, setActive] = useState(0);

  const reviews = [
    {
      name: "Shristi",
      event: "Party / Bachelorette",
      text: "Nancy made all my wildest dreams come true! I never felt confident rocking bold and dramatic styles, but she created an absolute masterpiece for my bachelorette party. I felt unstoppable and my pictures look like they belong in a magazine. Best day ever!",
      rating: 5,
    },
    {
      name: "Ankita",
      event: "Editorial Glam",
      text: "Nancy has impeccable taste and insane vision, but her real superpower is how genuinely she listens to what her clients feel comfortable in. She elevated my features flawlessly without making me look like a different person. Pure artistry and pure magic!",
      rating: 5,
    },
    {
      name: "Kalash",
      event: "Reception",
      text: "As someone who usually doesn't wear much makeup, I never really felt comfortable dressing up until I met Nancy. She gave me a signature glow that felt completely 'me', but elevated to absolute perfection. I have never felt so beautiful and confident in my entire life!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="relative py-section bg-blush-950 overflow-hidden">
      <GoldParticles />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-400 mb-4">
              Client Love
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Words From{" "}
              <span className="italic text-blush-400">My Brides</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Review Card */}
        <div className="relative min-h-[300px] md:min-h-[250px]">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 0.95,
                rotateY: active === i ? 0 : -10,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{
                pointerEvents: active === i ? "auto" : "none",
                perspective: 1000,
              }}
            >
              <div className="glass ghost-border rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                <Quote className="w-10 h-10 text-gold-400/40 mx-auto mb-6" />

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-gold-400 fill-gold-400"
                    />
                  ))}
                </div>

                <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-8 italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div>
                  <p className="font-display text-xl text-white font-medium">
                    {review.name}
                  </p>
                  <p className="font-body text-sm text-white/50">
                    {review.event}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                active === i
                  ? "w-8 bg-gold-400"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BOOKING / CONTACT
   ═══════════════════════════════════════════════════════ */

function Booking() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    eventType: "bridal",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <section id="booking" className="relative py-20 md:py-28 bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-plum mb-8">
            Book Your <br/> <span className="italic text-blush-500">Transformation</span>
          </h2>
          <p className="font-body text-lg text-plum-soft max-w-xl mx-auto mb-10">
            Enjoy a personalized, VIP booking experience. Tell us a bit about your big day, and let's create magic together.
          </p>
          <motion.button
            onClick={() => { setIsOpen(true); setStep(0); setSubmitted(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-full bg-black text-white font-display text-xl tracking-wide shadow-2xl flex items-center gap-4 mx-auto cursor-pointer"
          >
            Start Booking <ArrowRight className="w-5 h-5" />
          </motion.button>
        </ScrollReveal>
      </div>

      {/* Fullscreen Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-surface-elevated/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 sm:p-12"
          >
            {/* Close button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-plum/10 hover:bg-plum/20 flex items-center justify-center cursor-pointer transition-colors border border-plum/10">
              <X className="w-6 h-6 text-plum" />
            </button>

            {/* Progress indicator */}
            {step > 0 && step < 6 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-2">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-blush-500" : "w-3 bg-blush-200"}`} />
                 ))}
              </div>
            )}

            <div className="w-full max-w-2xl relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                 {/* Step 0 */}
                 {step === 0 && (
                   <motion.div key="step0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="text-center w-full">
                     <h3 className="font-display text-5xl md:text-6xl text-plum mb-6">Ready for your magic?</h3>
                     <p className="font-body text-xl text-plum-soft mb-12">I'll ask a few quick questions to personalize your experience.</p>
                     <button onClick={nextStep} className="px-10 py-4 bg-blush-500 hover:bg-blush-600 text-white rounded-full font-body tracking-widest text-sm uppercase cursor-pointer transition-colors shadow-xl">
                       Let's Begin
                     </button>
                   </motion.div>
                 )}

                 {/* Step 1 */}
                 {step === 1 && (
                   <motion.div key="step1" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Hi! What's your beautiful name?</h3>
                     <input 
                       autoFocus
                       type="text" 
                       value={formState.name}
                       onChange={(e) => setFormState({...formState, name: e.target.value})}
                       onKeyDown={(e) => e.key === "Enter" && formState.name && nextStep()}
                       className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 placeholder:text-plum/20"
                       placeholder="Type your name..."
                     />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={!formState.name} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">
                         OK <Check className="w-4 h-4" />
                       </button>
                       <span className="text-sm text-plum/40">press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 2 */}
                 {step === 2 && (
                   <motion.div key="step2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Nice to meet you, <span className="text-blush-500">{formState.name}</span>! When is the big day?</h3>
                     <input 
                       autoFocus
                       type="date" 
                       value={formState.date}
                       onChange={(e) => { setFormState({...formState, date: e.target.value}); }}
                       className="w-full text-3xl md:text-4xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 text-left"
                     />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={!formState.date} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">
                         Continue <Check className="w-4 h-4" />
                       </button>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 3 */}
                 {step === 3 && (
                   <motion.div key="step3" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">And what kind of magic are we doing?</h3>
                     <div className="flex flex-col gap-3">
                       {["Bridal Makeup", "Party / Reception", "Engagement", "Editorial / Photoshoot"].map((type) => (
                         <button 
                           key={type}
                           onClick={() => { setFormState({...formState, eventType: type}); setTimeout(nextStep, 300); }}
                           className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all cursor-pointer font-body text-xl md:text-2xl ${formState.eventType === type ? 'border-blush-500 bg-blush-50 text-plum' : 'border-blush-100 bg-white hover:border-blush-300 text-plum/70'}`}
                         >
                           {type}
                         </button>
                       ))}
                     </div>
                   </motion.div>
                 )}

                 {/* Step 4 */}
                 {step === 4 && (
                   <motion.div key="step4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-8">Can we have your phone number to text you the details?</h3>
                     <input 
                       autoFocus
                       type="tel" 
                       value={formState.phone}
                       onChange={(e) => setFormState({...formState, phone: e.target.value})}
                       onKeyDown={(e) => e.key === "Enter" && formState.phone.length >= 10 && nextStep()}
                       className="w-full text-3xl md:text-5xl font-light text-plum bg-transparent border-b-2 border-blush-300 focus:border-blush-500 outline-none pb-4 placeholder:text-plum/20"
                       placeholder="+91 89691 84453"
                     />
                     <div className="mt-8 flex items-center gap-4">
                       <button onClick={nextStep} disabled={formState.phone.length < 10} className="px-8 py-3 bg-plum text-white rounded-full disabled:opacity-50 cursor-pointer flex items-center gap-2 hover:bg-black transition-colors">
                         Nearly done <Check className="w-4 h-4" />
                       </button>
                       <span className="text-sm text-plum/40">press Enter ↵</span>
                     </div>
                   </motion.div>
                 )}

                 {/* Step 5 */}
                 {step === 5 && (
                   <motion.div key="step5" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full">
                     <h3 className="font-display text-3xl md:text-4xl text-plum mb-6">Finally, tell us everything about your dream look.</h3>
                     <textarea 
                       autoFocus
                       rows={3}
                       value={formState.message}
                       onChange={(e) => setFormState({...formState, message: e.target.value})}
                       className="w-full text-xl md:text-2xl font-light text-plum bg-white/50 border-2 border-blush-200 focus:border-blush-500 outline-none p-6 rounded-3xl resize-none placeholder:text-plum/30 mb-8 shadow-inner"
                       placeholder="I'm wearing a red Sabyasachi lehenga and I want bold smokey eyes..."
                     />
                     
                     <div className="relative w-full sm:w-64 max-w-full">
                        <input type="button" value="" className="hidden" />
                        {!submitted ? (
                          <motion.button
                            type="button"
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              setSubmitted(true);
                              try {
                                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = ctx.createOscillator();
                                const gainNode = ctx.createGain();
                                osc.connect(gainNode);
                                gainNode.connect(ctx.destination);
                                osc.type = "sine";
                                osc.frequency.setValueAtTime(880, ctx.currentTime);
                                osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
                                gainNode.gain.setValueAtTime(0, ctx.currentTime);
                                gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
                                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                                osc.start(ctx.currentTime);
                                osc.stop(ctx.currentTime + 0.5);
                              } catch (err) {}
                              setTimeout(() => nextStep(), 1500);
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full relative overflow-hidden px-6 py-4 rounded-2xl bg-black border border-white/20 text-white font-body cursor-pointer flex items-center justify-between group shadow-xl hover:shadow-2xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="font-display text-base"></span>
                              </div>
                              <span className="text-base font-semibold tracking-wide">Pay</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-white/60 animate-pulse font-medium">Double-Click</span>
                              <div className="w-1.5 h-8 bg-white/30 rounded-full" />
                            </div>
                          </motion.button>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-body font-medium flex items-center justify-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                              <Check className="w-5 h-5" />
                            </div>
                            Booking Confirmed
                          </motion.div>
                        )}
                     </div>
                   </motion.div>
                 )}

                 {/* Step 6 (Success) */}
                 {step === 6 && (
                   <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                     <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-200">
                        <Check className="w-12 h-12 text-emerald-600" />
                     </div>
                     <h3 className="font-display text-4xl md:text-5xl text-plum mb-4">You're all set, {formState.name}!</h3>
                     <p className="font-body text-xl text-plum-soft mb-12">I have received your request for {formState.eventType} on {formState.date}. I will WhatsApp you at {formState.phone} shortly!</p>
                     <button onClick={() => setIsOpen(false)} className="px-10 py-4 bg-plum hover:bg-black text-white rounded-full font-body tracking-wider text-sm cursor-pointer transition-colors shadow-lg">
                       Return to Website
                     </button>
                   </motion.div>
                 )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="relative bg-blush-950 overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blush-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl text-white font-light mb-3">
              N.Touch
            </h3>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
              Luxury makeup artistry by Nancy Mehta. Lakme Academy certified.
              Transforming faces, elevating confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs tracking-[0.15em] uppercase text-gold-400 mb-4">
              Quick Links
            </p>
            <div className="space-y-3">
              {["About", "Portfolio", "Services", "Testimonials", "Book Now"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="block font-body text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.15em] uppercase text-gold-400 mb-4">
              Contact
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blush-400" />
                <span className="font-body text-sm text-white/60">
                  Patna, Bihar, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blush-400" />
                <a href="tel:+918969184453" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                  +91 89691 84453
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blush-400" />
                <a href="mailto:nancymehta247@gmail.com" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                  nancymehta247@gmail.com
                </a>
              </div>
              <a
                href="https://facebook.com/ntouchmua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Facebook className="w-4 h-4 text-blush-400" />
                <span className="font-body text-sm text-white/60 group-hover:text-white transition-colors">
                  /ntouchmua
                </span>
              </a>
              <a
                href="https://instagram.com/n.touchmua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Instagram className="w-4 h-4 text-blush-400" />
                <span className="font-body text-sm text-white/60 group-hover:text-white transition-colors">
                  @n.touchmua
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            &copy; {new Date().getFullYear()} N.Touch MUA. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Crafted with <Heart className="w-3 h-3 inline text-blush-500" /> by N.Touch
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   APPLE-STYLE INTRO SPLASH SCREEN
   ═══════════════════════════════════════════════════════ */

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [exiting, setExiting] = useState(false);

  const greetings = [
    { text: "Hello", lang: "en" },
    { text: "नमस्ते", lang: "hi" },
    { text: "Bonjour", lang: "fr" },
    { text: "Hola", lang: "es" },
    { text: "مرحبا", lang: "ar" },
    { text: "こんにちは", lang: "ja" },
    { text: "Nancy Mehta", lang: "brand" },
  ];

  useEffect(() => {
    const wordDuration = 600;
    const totalWords = greetings.length;

    const timer = setInterval(() => {
      setCurrentWord((prev) => {
        if (prev >= totalWords - 1) {
          clearInterval(timer);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 1200);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, wordDuration);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center hero-gradient shadow-2xl"
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-10 w-full h-32 flex items-center justify-center">
        {greetings.map((greeting, i) => (
          <motion.span
            key={i}
            className={`absolute whitespace-nowrap ${
              greeting.lang === "brand"
                ? "font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-wide"
                : "font-display text-4xl sm:text-6xl md:text-8xl font-light italic"
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={
              currentWord === i
                ? { opacity: 1, scale: 1, y: 0 }
                : currentWord > i
                ? { opacity: 0, scale: 1.1, y: -20 }
                : { opacity: 0, scale: 0.8, y: 20 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: greeting.lang === "brand" ? "#D4AF37" : "rgba(255,255,255,0.9)",
            }}
          >
            {greeting.text}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full px-4 text-center font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentWord >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Nancy Mehta — Makeup Artist
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   THE PROCESS (STACKING CARDS)
   ═══════════════════════════════════════════════════════ */

function StackingProcess() {
  const steps = [
    {
      id: "step-1",
      number: "01",
      title: "Consultation & Vision",
      text: "Understanding your personality, outfit, and dream look. We don't just pick a style; we craft a bespoke narrative for your special day.",
      bg: "bg-blush-50",
      textCol: "text-plum-900",
    },
    {
      id: "step-2",
      number: "02",
      title: "Skin Preparation",
      text: "Flawless makeup begins with flawless skin. Using luxury skincare to hydrate, prime, and create the perfect canvas.",
      bg: "bg-surface-elevated",
      textCol: "text-plum",
    },
    {
      id: "step-3",
      number: "03",
      title: "The Artistry",
      text: "Executing the vision with precision. From flawless airbrush HD bases to signature 3D eye makeup techniques.",
      bg: "bg-blush-900",
      textCol: "text-white",
    },
    {
      id: "step-4",
      number: "04",
      title: "Final Styling",
      text: "Locking it all in, draping your outfit to perfection, and ensuring every single hair is exactly where it belongs.",
      bg: "bg-black",
      textCol: "text-gold-400",
    }
  ];

  return (
    <section className="py-section bg-surface overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
              The Process
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum">
              How The <span className="italic text-blush-500">Magic</span> Happens
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative pb-32 flex flex-col gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="sticky w-full"
              style={{ top: `calc(15vh + ${index * 40}px)`, zIndex: index + 10 }}
            >
              <div 
                className={`w-full min-h-[300px] md:h-[350px] ${step.bg} rounded-[40px] p-10 md:p-14 shadow-2xl border border-blush-100/20 flex flex-col justify-between transition-transform duration-500`}
                style={{ transformOrigin: "top center" }}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-display text-7xl md:text-8xl opacity-30 ${step.textCol} leading-none`}>{step.number}</span>
                  <div className={`w-12 h-12 rounded-full border border-current opacity-30 flex items-center justify-center ${step.textCol}`}>
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className={`font-display text-3xl md:text-4xl mb-4 ${step.textCol}`}>{step.title}</h3>
                  <p className={`font-body text-base md:text-lg opacity-80 max-w-2xl leading-relaxed ${step.textCol}`}>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   THE LOOK BREAKDOWN (3D EXPLODE)
   ═══════════════════════════════════════════════════════ */

function LookBreakdown() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Apple-style vertical separation on scroll
  const layer1Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -180]);
  const layer2Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -60]);
  const layer3Y = useTransform(scrollYProgress, [0.3, 0.6], [0, 60]);
  const layer4Y = useTransform(scrollYProgress, [0.3, 0.6], [0, 180]);
  
  const rotateX = useTransform(scrollYProgress, [0.2, 0.6], [0, 60]);
  const rotateZ = useTransform(scrollYProgress, [0.2, 0.6], [0, -20]);
  const scale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.85]);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#1A0A10] overflow-hidden relative" style={{ perspective: "2000px" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blush-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center relative z-10 mb-16 md:mb-24">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-400 mb-4">
            Anatomy of Glam
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Layered to <span className="italic text-blush-500">Perfection</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="h-[70vh] md:h-[90vh] flex items-center justify-center w-full max-w-2xl mx-auto relative pointer-events-none">
        <motion.div 
           className="relative w-64 h-[420px] sm:w-[320px] sm:h-[500px]"
           style={{ rotateX, rotateZ, scale, transformStyle: "preserve-3d" }}
        >
           {/* Layer 4: Base / Skin Prep */}
           <motion.div 
             style={{ y: layer4Y, translateZ: -120 }} 
             className="absolute inset-0 rounded-[40px] border border-white/20 bg-black/40 overflow-hidden flex items-end p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
           >
              <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600" alt="Skin Prep" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="relative z-10">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">01 Base</p>
                <p className="text-white font-display text-2xl">Skin Prep & Prime</p>
              </div>
           </motion.div>

           {/* Layer 3: Foundation */}
           <motion.div 
             style={{ y: layer3Y, translateZ: -40 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-300/30 bg-[#2A1118]/60 overflow-hidden flex items-end p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-md"
           >
              <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600" alt="Foundation" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1118]/90 to-transparent" />
              <div className="relative z-10">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">02 Canvas</p>
                <p className="text-white font-display text-2xl">HD Foundation</p>
              </div>
           </motion.div>

           {/* Layer 2: Dimensions */}
           <motion.div 
             style={{ y: layer2Y, translateZ: 40 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-400/40 bg-blush-900/40 overflow-hidden flex items-end p-8 shadow-[0_30px_60px_rgba(212,69,107,0.3)] backdrop-blur-md"
           >
              <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600" alt="Structure" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-900/90 to-transparent" />
              <div className="relative z-10">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">03 Structure</p>
                <p className="text-white font-display text-2xl">Sculpt & Highlight</p>
              </div>
           </motion.div>

           {/* Layer 1: The Finish */}
           <motion.div 
             style={{ y: layer1Y, translateZ: 120 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-300/60 bg-gradient-to-tr from-blush-600/60 to-blush-400/40 overflow-hidden flex items-end p-8 shadow-[0_40px_100px_rgba(212,69,107,0.6)] backdrop-blur-xl"
           >
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600" alt="Finish" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Glass Reflection */}
              <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent scale-y-[-1]" />
              <div className="relative z-10">
                <p className="text-gold-200 font-body text-xs tracking-widest uppercase mb-2 drop-shadow-md">04 Detail</p>
                <p className="text-white font-display text-3xl drop-shadow-xl font-medium tracking-wide">Signature Eyes</p>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE BOOKING BAR
   ═══════════════════════════════════════════════════════ */

function MobileBookingBar() {
  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm md:hidden"
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <a 
        href="https://wa.me/918969184453?text=Hi%20Nancy!%20I%20want%20to%20book%20a%20makeup%20session."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-full shadow-[0_8px_32px_rgba(212,69,107,0.4)] hover:bg-black/80 transition-all active:scale-95"
      >
        <MessageCircle className="w-5 h-5 text-green-400 drop-shadow-lg" />
        <span className="font-body text-sm font-medium tracking-wide text-white">Book Your Look on WhatsApp</span>
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   APPLE SCROLL TEXT
   ═══════════════════════════════════════════════════════ */

function AnimatedWord({ word, progress, start, end }: { word: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const color = useTransform(progress, [start, end], ["#8b2252", "#d4af37"]); 
  return (
    <motion.span 
      style={{ opacity, color }}
      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light"
    >
      {word}
    </motion.span>
  );
}

function AppleScrollText() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 45%"]
  });

  const text = "Flawless Base. Precision Eyes. Unforgettable You.";
  const words = text.split(" ");
  
  return (
    <section ref={container} className="py-20 md:py-28 bg-surface border-y border-blush-100/50 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2 text-center">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return <AnimatedWord key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   VIBE MATCHER (TINDER STYLE SWIPE)
   ═══════════════════════════════════════════════════════ */

const swipeCards = [
  { id: 1, name: "Soft Glam", desc: "Subtle & Dewy", bg: "from-blush-200 to-blush-400", img: "/editorial-personal-shoots.jpg" },
  { id: 2, name: "Bold Drama", desc: "Smokey & Striking", bg: "from-plum-800 to-black", img: "/title-indo-western.jpg" },
  { id: 3, name: "Classic Bridal", desc: "Traditional Elegance", bg: "from-red-600 to-red-900", img: "/title-bride.jpg" },
  { id: 4, name: "Glow Getter", desc: "Highlighter Heavy", bg: "from-gold-300 to-gold-600", img: "/title-marathi-bride.jpg" },
];

function VibeMatcher() {
  const [cards, setCards] = useState(swipeCards);
  const [likes, setLikes] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleDragEnd = (event: any, info: any, card: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      // Swiped Right!
      setLikes(prev => [...prev, card.name]);
      removeCard(card.id);
    } else if (info.offset.x < -threshold) {
      // Swiped Left!
      removeCard(card.id);
    }
  };

  const removeCard = (id: number) => {
    const remaining = cards.filter(c => c.id !== id);
    setCards(remaining);
    if (remaining.length === 0) {
      setFinished(true);
    }
  };

  return (
    <section className="py-section bg-gradient-to-b from-surface to-blush-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
            Interactive
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum mb-6">
            Find Your <span className="italic text-blush-500">Vibe</span>
          </h2>
          <p className="font-body text-base text-plum-soft max-w-xl mx-auto mb-16">
            Swipe right on what you love, left on what you don't. We'll curate the perfect look for you.
          </p>
        </ScrollReveal>

        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] flex items-center justify-center">
          {finished ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="absolute inset-0 bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center border border-blush-100"
            >
              <Heart className="w-16 h-16 text-blush-500 mb-6" />
              <h3 className="font-display text-3xl text-plum mb-2">It's a Match!</h3>
              <p className="font-body text-plum-soft mb-8">
                Based on your swipes, your perfect style is: 
                <span className="block font-semibold text-xl text-blush-600 mt-2">{likes[0] || "Custom Blend"}</span>
              </p>
              <button className="px-8 py-3 bg-blush-500 text-white rounded-full font-body text-sm tracking-wide shadow-lg shadow-blush-500/30 hover:bg-blush-600 transition-colors cursor-pointer">
                Book This Look
              </button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {cards.map((card, index) => {
                const isTop = index === cards.length - 1;
                return (
                  <motion.div
                    key={card.id}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, card)}
                    initial={{ scale: 0.95, y: -20, opacity: 0 }}
                    animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 20 * (cards.length - 1 - index), opacity: 1, zIndex: index }}
                    exit={{ x: 500, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden flex flex-col"
                    style={{ cursor: isTop ? "grab" : "auto" }}
                    whileDrag={{ cursor: "grabbing", scale: 1.05 }}
                  >
                    <div className="flex-1 relative overflow-hidden flex flex-col justify-end">
                      {card.img && <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-20 mix-blend-overlay`} />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Interaction Hint (Only on top card) */}
                      {isTop && (
                        <motion.div 
                          className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md text-white px-5 py-2 rounded-full font-body text-xs tracking-[0.2em] uppercase border border-white/20 flex items-center gap-4 z-20 shadow-xl"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <span className="text-white/80 opacity-80">← Pass</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span className="text-blush-300">Love →</span>
                        </motion.div>
                      )}

                      <div className="relative z-10 bottom-6 left-6 right-6 text-white text-left p-2">
                        <h3 className="font-display text-4xl mb-1 drop-shadow-md">{card.name}</h3>
                        <p className="font-body text-sm opacity-90 drop-shadow-md uppercase tracking-wider">{card.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SHOP NANCY'S KIT (INTERACTIVE HOTSPOTS)
   ═══════════════════════════════════════════════════════ */

const kitItems = [
  { id: 1, name: "Flawless Filter", brand: "Charlotte Tilbury", price: "$49", top: "40%", left: "30%", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be" },
  { id: 2, name: "Luminous Silk", brand: "Giorgio Armani", price: "$69", top: "60%", left: "55%", img: "https://images.unsplash.com/photo-1599305090598-fe179d501227" },
  { id: 3, name: "Pillow Talk Lip", brand: "Charlotte Tilbury", price: "$35", top: "70%", left: "75%", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa" },
];

function ShopNancysKit() {
  const [activeItem, setActiveItem] = useState<typeof kitItems[0] | null>(null);

  return (
    <section className="py-section bg-surface overflow-hidden relative border-t border-blush-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
              Vanity Secret
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-plum mb-6">
              Shop My <span className="italic text-blush-500">Kit</span>
            </h2>
            <p className="font-body text-plum-soft max-w-lg mx-auto">
              Explore my virtual vanity. Click the glowing spots to reveal the exact luxury products I use to create the signature N.Touch glow.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-blush-200">
          {/* Mock vanity background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blush-50 to-blush-200" />
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000" 
            alt="Vanity Desk" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          
          {/* Hotspots */}
          {kitItems.map((item) => (
            <motion.div
              key={item.id}
              className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer"
              style={{ top: item.top, left: item.left }}
              onClick={() => setActiveItem(item)}
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
            </motion.div>
          ))}

          {/* Product Popup */}
          <AnimatePresence>
            {activeItem && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-blush-100/50 flex gap-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={activeItem.img} alt={activeItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs text-gold-500 tracking-widest uppercase mb-1">{activeItem.brand}</p>
                  <h4 className="font-display text-xl text-plum mb-1">{activeItem.name}</h4>
                  <p className="font-body text-sm font-medium text-plum-soft">{activeItem.price}</p>
                </div>
                <button 
                  onClick={() => setActiveItem(null)}
                  className="w-10 h-10 bg-blush-50 text-blush-500 rounded-full flex items-center justify-center hover:bg-blush-500 hover:text-white transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   INSTAGRAM LIVE SYNC
   ═══════════════════════════════════════════════════════ */

function InstagramSync() {
  const posts = [
    { id: 1, img: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80", likes: "1.2K" },
    { id: 2, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80", likes: "856" },
    { id: 3, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80", likes: "2.1K" },
    { id: 4, img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80", likes: "945" },
    { id: 5, img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", likes: "1.5K" },
    { id: 6, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", likes: "3.4K" }
  ];

  return (
    <section className="py-section bg-surface-elevated overflow-hidden border-t border-blush-100/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <ScrollReveal>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-2">
                Join The <span className="italic text-blush-500">Community</span>
              </h2>
              <p className="font-body text-plum-soft">Live feed from our latest shoots, brides, and glam sessions.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <a href="https://instagram.com/n.touchmua" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-body text-sm font-medium tracking-wide shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Instagram className="w-5 h-5" />
              Follow @NTOUCH.MUA
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md">
                <img src={post.img} alt="Instagram Post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-white fill-white" />
                  <span className="font-display text-xl text-white">{post.likes}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   HOLOGRAPHIC BUSINESS CARD
   ═══════════════════════════════════════════════════════ */

function HolographicCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates between -0.5 and 0.5
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Compute glare opacity and position
  const glareX = useTransform(x, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(y, [-0.5, 0.5], [100, -100]);
  
  return (
    <section className="py-24 bg-surface-elevated flex flex-col md:flex-row justify-center items-center overflow-hidden px-6 gap-12" style={{ perspective: "1500px" }}>
      <div className="text-center md:text-left max-w-sm mb-8 md:mb-0">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
            Connect
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-4">
            Carry The <span className="italic text-blush-500">Magic</span> With You
          </h2>
          <p className="font-body text-plum-soft">
             Save my digital card to instantly access my portfolio or book a consultation from anywhere.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-[320px] h-[200px] md:w-[400px] md:h-[240px] rounded-2xl bg-gradient-to-br from-[#2E131E] to-[#12050B] shadow-[0_30px_60px_rgba(46,19,30,0.5)] border border-white/10 overflow-hidden cursor-pointer group"
        >
          {/* Holographic Glare */}
          <motion.div 
            className="absolute inset-[-150%] bg-[conic-gradient(from_90deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
            style={{ x: glareX, y: glareY, scale: 1.5, pointerEvents: "none" }}
          />
          
          {/* Card Content */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
             <div className="flex justify-between items-start">
               <div>
                 <h3 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-1 drop-shadow-sm">Nancy Touch</h3>
                 <p className="font-body text-[10px] md:text-xs text-gold-400 tracking-[0.2em] uppercase drop-shadow-sm">Master Makeup Artist</p>
               </div>
               <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
             </div>
             
             <div className="flex justify-between items-end mt-4">
               <div>
                 <p className="font-body text-[10px] md:text-xs text-white/60 tracking-widest font-mono mb-1">
                   +91 89691 84453
                 </p>
                 <p className="font-body text-[10px] md:text-xs text-white/40 tracking-widest font-mono">
                   IG: @NTOUCH.MUA
                 </p>
               </div>
               <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                  <span className="font-body text-xs text-white uppercase tracking-widest">N.T</span>
               </div>
             </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   AIRPODS PRO SCROLL ZOOM REVEAL
   ═══════════════════════════════════════════════════════ */

function ScrollZoomReveal() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 4]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);

  return (
    <section ref={container} className="relative h-[150vh] bg-surface z-20" style={{ marginTop: "-20vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-b border-blush-200/10">
        <motion.div 
          style={{ scale, opacity }}
          className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border border-blush-500/20 shadow-[0_0_80px_rgba(212,69,107,0.15)] bg-[#110509]"
        >
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000" alt="Zoom Detail" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
        </motion.div>
        <motion.div style={{ opacity: textOpacity }} className="absolute top-1/4 text-center pointer-events-none">
           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum">Precision in every detail.</h2>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EDITORIAL POLAROID LOOKBOOK
   ═══════════════════════════════════════════════════════ */

const editorialLooks = [
  { img: "/editorial-editorials.jpg", title: "Editorials" },
  { img: "/editorial-personal-shoots.jpg", title: "Personal Shoots" },
  { img: "/editorial-collabs.jpg", title: "Collabs" },
];

const brideLooks = [
  { img: "/bride-engagement.jpg", title: "Engagement Look" },
  { img: "/bride-look-2.jpg", title: "" },
  { img: "/bride-look-3.jpg", title: "" },
];

const titleLooks = [
  { img: "/title-marathi-bride.jpg", title: "Marathi Bride" },
  { img: "/title-bengali-bride.jpg", title: "Bengali Bride" },
  { img: "/title-rajasthani-bride.jpg", title: "Rajasthani Bride" },
  { img: "/title-indo-western.jpg", title: "Indo Western Look" },
  { img: "/title-bride.jpg", title: "Bride" },
  { img: "/title-christian-bride.jpg", title: "Christian Bride" },
];

function EditorialLookbook() {
  return (
    <section className="relative py-32 editorial-bg overflow-hidden flex flex-col items-center border-y border-neutral-200">
      
      {/* Decorative Barcodes */}
      <div className="absolute left-6 md:left-12 top-[10%] flex flex-row gap-[2px] opacity-40 mix-blend-multiply pointer-events-none items-end transform -rotate-90 origin-left">
         {Array.from({length: 30}).map((_, i) => (
           <div key={i} className="bg-black" style={{ width: Math.random() > 0.5 ? '2px' : Math.random() > 0.8 ? '5px' : '1px', height: '40px' }} />
         ))}
         <span className="font-mono text-[10px] ml-2 tracking-[0.2em] transform rotate-180">NTOUCH-2026-VOL.1</span>
      </div>

      <div className="absolute right-6 md:right-12 top-[40%] flex flex-row gap-[2px] opacity-40 mix-blend-multiply pointer-events-none items-end transform rotate-90 origin-right">
         <span className="font-mono text-[10px] mr-2 tracking-[0.2em]">BRIDE-SERIES</span>
         {Array.from({length: 30}).map((_, i) => (
           <div key={i} className="bg-black" style={{ width: Math.random() > 0.5 ? '2px' : Math.random() > 0.8 ? '5px' : '1px', height: '40px' }} />
         ))}
      </div>

      <div className="absolute left-6 md:left-12 top-[70%] flex flex-row gap-[2px] opacity-40 mix-blend-multiply pointer-events-none items-end transform -rotate-90 origin-left">
         {Array.from({length: 30}).map((_, i) => (
           <div key={i} className="bg-black" style={{ width: Math.random() > 0.5 ? '2px' : Math.random() > 0.8 ? '5px' : '1px', height: '40px' }} />
         ))}
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 1: EDITORIALS (Image 1) */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-24 z-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {editorialLooks.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:-rotate-1 relative">
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800 pointer-events-none">
                   <img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-125 saturate-50" />
                 </div>
                 <div className="absolute bottom-6 left-0 w-full text-center">
                    <span className="font-cursive text-4xl md:text-5xl text-neutral-800">{look.title}</span>
                 </div>
               </div>
             </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={0.4}>
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 bg-[#1c1c1c] text-white font-mono text-sm tracking-[0.3em] uppercase hover:bg-black transition-colors rounded-full border border-neutral-700 cursor-pointer shadow-lg hover:shadow-xl">
              Reach Out
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 2: BRIDE (Image 2) */}
      {/* ────────────────────────────────────────────────────────── */}
      <ScrollReveal className="my-10 z-10">
        <svg width="80" height="100" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 mx-auto">
          <path d="M48.5 2C30.5 4 18.5 22 23.5 40C27.3241 53.7667 43 62 43 62" stroke="#E35C7A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M43 62C43 62 48.5 68.5 44.5 76C40.5 83.5 35.5 85.5 37.5 95C39.5 104.5 49.5 110.5 54.5 110.5C59.5 110.5 67 101.5 67 101.5C67 101.5 82 72.5 70 51.5C58 30.5 53.5 30.5 54.5 20.5" stroke="#E35C7A" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="60" cy="18" r="10" fill="#FFEDD5" className="mix-blend-multiply"/>
          <path d="M37 50C42 48 48 50 48 50" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M68 60C62 58 56 60 56 60" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </ScrollReveal>

      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-16 relative z-10 border-b border-black/10 pb-32">
        <ScrollReveal className="absolute -right-4 md:-right-24 bottom-32 pointer-events-none md:origin-bottom-right md:transform md:-rotate-90 hidden lg:block z-0">
          <h2 className="font-outline-thick text-7xl md:text-9xl tracking-widest text-black opacity-90 leading-none m-0">BRIDE</h2>
        </ScrollReveal>
        <ScrollReveal className="block lg:hidden text-center mb-12">
           <h2 className="font-outline-thick text-7xl tracking-widest text-black opacity-90 drop-shadow-sm">BRIDE</h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 z-10 relative">
          {brideLooks.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:rotate-1 relative lg:z-10" style={i === 2 ? { zIndex: -1 } : {}}>
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800 pointer-events-none">
                   <img src={look.img} alt={look.title || "Look"} className="w-full h-full object-cover filter contrast-110 saturate-110" />
                 </div>
                 <div className="absolute bottom-6 left-0 w-full text-center">
                    {look.title ? (
                      <span className="font-cursive text-4xl md:text-5xl text-neutral-800">{look.title}</span>
                    ) : null}
                 </div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 3: TITLE LOOKS (Image 3) */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#f4f4f4] border-y border-black/10 py-24 relative z-10 mt-12 pattern-dots">
        {/* Background Decorative Barcodes for Title Looks */}
        <div className="absolute left-4 md:left-8 top-12 flex flex-row gap-[2px] opacity-20 mix-blend-multiply pointer-events-none items-end transform lg:rotate-90 origin-left">
           {Array.from({length: 40}).map((_, i) => (
             <div key={i} className="bg-black" style={{ width: Math.random() > 0.5 ? '2px' : Math.random() > 0.8 ? '6px' : '1px', height: '60px' }} />
           ))}
        </div>

        <div className="max-w-6xl mx-auto px-8 md:px-24">
          <ScrollReveal className="mb-20 text-center w-full">
             <h2 className="font-outline-thick text-6xl md:text-8xl lg:text-9xl text-black tracking-widest mx-auto px-4 break-words">TITLE LOOKS</h2>
             <p className="font-mono text-xs uppercase tracking-[0.3em] text-black/40 mt-6 hidden md:block">Volume 1 • Digital Lookbook</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-20">
            {titleLooks.map((look, i) => (
               <ScrollReveal key={i} delay={(i % 3) * 0.1}>
                 <div className="bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-[1.03] hover:-rotate-1 relative group">
                   <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800 pointer-events-none relative">
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-[1.15] saturate-110" />
                   </div>
                   <div className="absolute bottom-6 left-0 w-full text-center">
                      <span className="font-cursive text-3xl md:text-4xl text-neutral-800">{look.title}</span>
                   </div>
                 </div>
               </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSiteVisible(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <motion.main
        initial={{ opacity: 0, y: 100, scale: 0.98 }}
        animate={siteVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.98 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <Navbar />
        <Hero />
        <SocialProofMarquee />
        <TrustStrip />
        <About />
        <AppleScrollText />
        <Portfolio />
        <BentoServices />
        <StackingProcess />
        <LookBreakdown />
        <VerticalImageStack />
        <EditorialLookbook />
        <Testimonials />
        <VibeMatcher />
        <ShopNancysKit />
        <InstagramSync />
        <HolographicCard />
        <Booking />
        <Footer />
        
        {/* Mobile Sticky CTA */}
        {siteVisible && <MobileBookingBar />}
      </motion.main>
    </>
  );
}
