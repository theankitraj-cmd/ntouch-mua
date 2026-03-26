"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Star, Calendar, ArrowRight, Award, Heart } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

/* ═══════════════════════════════════════════════════════
   FLOATING MAKEUP SVG ILLUSTRATIONS
   ═══════════════════════════════════════════════════════ */

export function MakeupLips({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className={className}>
      <path d="M40 8C25 8 10 20 10 32C10 44 22 52 40 52C58 52 70 44 70 32C70 20 55 8 40 8Z" fill="#E84B6A" opacity="0.9"/>
      <path d="M40 8C32 8 18 16 14 26C20 22 30 20 40 22C50 20 60 22 66 26C62 16 48 8 40 8Z" fill="#FF6B8A"/>
      <path d="M10 32C10 32 22 28 40 30C58 28 70 32 70 32" stroke="#C13355" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="18" rx="8" ry="3" fill="white" opacity="0.3"/>
    </svg>
  );
}

export function MakeupBrush({ className }: { className?: string }) {
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

export function MakeupFoundation({ className }: { className?: string }) {
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

export function MakeupPerfume({ className }: { className?: string }) {
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

export function MakeupPalette({ className }: { className?: string }) {
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

export function MakeupMascara({ className }: { className?: string }) {
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

export function MakeupLipstick({ className }: { className?: string }) {
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

export function MakeupEyelash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" fill="none" className={className}>
      <path d="M5 35 Q15 10 25 20 Q30 5 40 18 Q45 2 55 15 Q60 5 70 20 Q75 12 78 30" stroke="#2E131E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M5 35 Q40 25 78 30" stroke="#2E131E" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function MakeupMirror({ className }: { className?: string }) {
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

export function MakeupNailPolish({ className }: { className?: string }) {
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

export function FloatingHearts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 55" fill="none" className={className}>
      <path d="M30 50 C10 30 0 15 15 8 C22 4 28 10 30 16 C32 10 38 4 45 8 C60 15 50 30 30 50Z" fill="#FFB0CA" opacity="0.7"/>
      <path d="M48 30 C40 22 36 16 42 13 C45 11 47 14 48 16 C49 14 51 11 54 13 C60 16 56 22 48 30Z" fill="#FF6B8A" opacity="0.5"/>
    </svg>
  );
}

export function GoldParticles() {
  const particles = React.useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
    opacity: Math.random() * 0.5 + 0.2,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perf-gpu">
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

function SparkleParticle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[8] perf-gpu"
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

export function HeroSection() {
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
  const floatingDepths = [0.8, 0.4, 0.6, 0.7, 0.3, 0.9, 0.5, 0.3, 0.6, 0.8, 0.2, 0.7, 0.4, 0.5, 0.6, 0.3];

  useEffect(() => {
    let ticking = false;
    const updatePositions = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(calc(-50% + ${mx * 200}px), calc(-50% + ${my * 200}px), 0)`;
      }
      floatingRefs.current.forEach((el, i) => {
        if (el) {
          const depth = floatingDepths[i] || 0.5;
          el.style.transform = `translate3d(${mx * 15 * depth}px, ${my * 15 * depth}px, 0)`;
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

  const sparkles = [
    { x: 25, y: 30, delay: 0 }, { x: 72, y: 28, delay: 0.8 },
    { x: 18, y: 55, delay: 1.5 }, { x: 78, y: 52, delay: 2.2 },
    { x: 45, y: 22, delay: 2.8 }, { x: 55, y: 62, delay: 0.4 },
  ];

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient grain-overlay section-optimize"
    >
      <GoldParticles />
      <div
        ref={cursorGlowRef}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none z-[2] perf-gpu"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          background: "radial-gradient(circle, rgba(212,69,107,0.15) 0%, rgba(248,200,216,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Backdrop Content */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
        <GooeyText 
          texts={["ELEGANCE", "ARTISTRY", "PERFECTION", "LUXURY"]}
          className="scale-[2] md:scale-[4]"
          textClassName="font-display text-plum uppercase"
        />
      </div>

      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[3] perf-gpu"
          style={{
            width: `${ring * 220 + 200}px`,
            height: `${ring * 220 + 200}px`,
            borderColor: `rgba(201, 169, 110, ${0.12 / ring})`,
            animation: `pulse-glow ${4 + ring}s ease-in-out ${ring * 0.5}s infinite`,
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] pointer-events-none z-[4] perf-gpu">
        <div className="w-full h-full" style={{ animation: "spin 45s linear infinite" }}>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateX(${typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 300}px)`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: i % 3 === 0 ? 8 : 4,
                  height: i % 3 === 0 ? 8 : 4,
                  background: i % 3 === 0 ? "#D4AF37" : "rgba(255,176,202,0.4)",
                  opacity: 0.4,
                  boxShadow: i % 3 === 0 ? "0 0 12px #D4AF37" : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {sparkles.map((s, i) => (
        <SparkleParticle key={i} x={s.x} y={s.y} delay={s.delay} />
      ))}

      <div className="absolute top-[5%] left-[2%] w-28 md:w-64 h-28 md:h-64 rounded-full bg-blush-400/10 pointer-events-none perf-gpu blur-3xl" style={{ animation: "float 18s ease-in-out infinite" }} />
      <div className="absolute bottom-[10%] right-[4%] w-36 md:w-80 h-36 md:h-80 rounded-full bg-gold-400/5 pointer-events-none perf-gpu blur-3xl" style={{ animation: "float 22s ease-in-out infinite reverse" }} />

      {floatingItems.map((item, i) => (
        <div
          key={i}
          ref={(el) => { floatingRefs.current[i] = el; }}
          className="absolute z-[5] pointer-events-none perf-gpu"
          style={{ ...item.style, animation: `float ${item.style.animationDuration} ${item.style.animationDelay} ease-in-out infinite` }}
        >
          <item.Component className={`${item.className} opacity-30 drop-shadow-2xl grayscale-[0.2]`} />
        </div>
      ))}

      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 30 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 120 }} 
          className="relative mx-auto mb-10 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
        >
          {/* Animated glow ring */}
          <motion.div 
            className="absolute -inset-4 rounded-full" 
            animate={{ 
              boxShadow: [ 
                "0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(212,69,107,0.1)", 
                "0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,69,107,0.2)", 
                "0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(212,69,107,0.1)", 
              ], 
            }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-gold-400/50 shadow-2xl perf-gpu">
            <Image 
              src="/nancy-mehta-hero-bridal.jpg" 
              alt="Nancy Mehta - Best Bridal Makeup Artist in Patna Bihar" 
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top img-optimize" 
            />
          </div>
          {/* Small verified badge */}
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 1, type: "spring", stiffness: 200 }} 
            className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-400 flex items-center justify-center shadow-lg border-2 border-white/20"
          >
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
          className="mb-8 inline-flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="font-body text-[10px] md:text-xs font-semibold tracking-[0.6em] uppercase text-gold-500">Master Artistry Since 2022</span>
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 text-gold-400 fill-gold-400/30" />
            ))}
          </div>
        </motion.div>

        <div className="relative mb-12">
          <div className="flex flex-col items-center select-none no-select">
            <div className="flex font-display text-8xl md:text-[14rem] lg:text-[18rem] leading-[0.75] text-plum tracking-tighter transform-gpu italic-shimmer">
              {["N", "A", "N", "C", "Y"].map((letter, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.8 }} 
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} 
                  transition={{ duration: 1.2, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }} 
                  className="inline-block origin-bottom perspective-1000"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex font-display text-8xl md:text-[14rem] lg:text-[18rem] leading-[0.75] italic text-gold-400/90 tracking-tighter -mt-4 md:-mt-10 transform-gpu italic-shimmer">
              {["M", "E", "H", "T", "A"].map((letter, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.8 }} 
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} 
                  transition={{ duration: 1.2, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }} 
                  className="inline-block origin-bottom perspective-1000"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="h-[2px] w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mt-6 md:mt-10"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 2 }} 
          className="font-body text-lg md:text-2xl text-plum/60 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
        >
          Redefining luxury bridal transformations for the modern <span className="text-plum font-semibold">Indian Bride</span>. Crafting timeless elegance with a high-definition cinematic touch.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#booking" className="group relative px-10 py-5 bg-plum text-white rounded-full overflow-hidden transition-all hover:pr-14 hover:shadow-2xl hover:shadow-plum/20">
            <span className="relative z-10 font-body text-sm font-semibold tracking-widest uppercase">Reserve Your Date</span>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Calendar className="w-5 h-5 text-gold-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-plum to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a href="#portfolio" className="group flex items-center gap-3 px-8 py-4 rounded-full border border-plum/10 bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all">
            <span className="font-body text-sm font-medium tracking-wide text-plum">View Masterpieces</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-plum/30">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-plum/30 to-transparent" />
      </motion.div>
    </section>
  );
}
