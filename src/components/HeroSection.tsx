"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Award, Star, Heart, MapPin, 
  ChevronDown, ArrowRight, Calendar 
} from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "react-intersection-observer";

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

export function Hero() {
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

  const sparkles = [
    { x: 25, y: 30, delay: 0 }, { x: 72, y: 28, delay: 0.8 },
    { x: 18, y: 55, delay: 1.5 }, { x: 78, y: 52, delay: 2.2 },
    { x: 45, y: 22, delay: 2.8 }, { x: 55, y: 62, delay: 0.4 },
  ];

  const floatingDepths = [0.8, 0.4, 0.6, 0.7, 0.3, 0.9, 0.5, 0.3, 0.6, 0.8, 0.2, 0.7, 0.4, 0.5, 0.6, 0.3];

  const floatingItems = [
    { Component: MakeupLips, className: "w-20 md:w-32", style: { top: "8%", left: "4%", animationDelay: "0s", animationDuration: "7s" } },
    { Component: MakeupBrush, className: "w-8 md:w-14 hidden md:block", style: { top: "12%", right: "7%", animationDelay: "1.2s", animationDuration: "8s", transform: "rotate(-30deg)" } },
    { Component: MakeupFoundation, className: "w-12 md:w-20 hidden md:block", style: { top: "58%", left: "2%", animationDelay: "2.5s", animationDuration: "9s" } },
    { Component: MakeupPerfume, className: "w-14 md:w-24", style: { bottom: "18%", right: "3%", animationDelay: "0.8s", animationDuration: "7.5s" } },
    { Component: MakeupPalette, className: "w-20 md:w-32 hidden md:block", style: { top: "4%", right: "18%", animationDelay: "1.5s", animationDuration: "8.5s" } },
    { Component: MakeupMascara, className: "w-6 md:w-10", style: { top: "52%", right: "10%", animationDelay: "3s", animationDuration: "7s", transform: "rotate(15deg)" } },
    { Component: MakeupLipstick, className: "w-8 md:w-14", style: { bottom: "22%", left: "8%", animationDelay: "0.5s", animationDuration: "8s", transform: "rotate(-15deg)" } },
    { Component: MakeupEyelash, className: "w-15 md:w-28 hidden md:block", style: { top: "10%", left: "20%", animationDelay: "2s", animationDuration: "9s" } },
    { Component: MakeupMirror, className: "w-12 md:w-20 hidden md:block", style: { bottom: "12%", right: "20%", animationDelay: "1s", animationDuration: "7.8s" } },
    { Component: MakeupNailPolish, className: "w-8 md:w-12", style: { top: "38%", left: "5%", animationDelay: "3.5s", animationDuration: "8.2s", transform: "rotate(10deg)" } },
    { Component: FloatingHearts, className: "w-14 md:w-22", style: { top: "18%", left: "13%", animationDelay: "0.3s", animationDuration: "6s" } },
    { Component: MakeupBrush, className: "w-7 md:w-12 hidden md:block", style: { bottom: "28%", left: "18%", animationDelay: "2.8s", animationDuration: "7.5s", transform: "rotate(45deg)" } },
    { Component: FloatingHearts, className: "w-10 md:w-16 hidden md:block", style: { top: "32%", right: "5%", animationDelay: "1.8s", animationDuration: "6.5s" } },
    { Component: MakeupLipstick, className: "w-7 md:w-12 hidden md:block", style: { top: "4%", left: "40%", animationDelay: "4s", animationDuration: "8s", transform: "rotate(25deg)" } },
    { Component: MakeupPerfume, className: "w-8 md:w-14 hidden md:block", style: { bottom: "8%", left: "35%", animationDelay: "1.2s", animationDuration: "7s" } },
    { Component: MakeupFoundation, className: "w-8 md:w-14 hidden md:block", style: { top: "42%", right: "18%", animationDelay: "2.2s", animationDuration: "8.8s" } },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient grain-overlay"
    >
      <GoldParticles />
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
      {sparkles.map((s, i) => (
        <SparkleParticle key={i} x={s.x} y={s.y} delay={s.delay} />
      ))}
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
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 pt-24 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 120 }}
          className="relative mx-auto mb-8 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52"
        >
          <motion.div
            className="absolute -inset-2 rounded-full"
            animate={{
              boxShadow: [
                "0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(212,69,107,0.1)",
                "0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,69,107,0.2)",
                "0 0 20px rgba(212,175,55,0.2), 0 0 40px rgba(212,69,107,0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-gold-400/50 shadow-2xl">
            <img
              src="/nancy-mehta-hero-bridal.jpg"
              alt="Nancy Mehta - Best Bridal Makeup Artist in Patna Bihar"
              className="w-full h-full object-cover object-top"
              width={400}
              height={400}
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-lg border-2 border-white/20"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.div>
        </motion.div>
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-sm md:text-base tracking-[0.25em] uppercase text-white/70 mb-6"
        >
          Lakme Academy Certified
        </motion.p>
        <div className="relative inline-block">
          <motion.div
            className="absolute inset-0 -inset-x-8 -inset-y-4 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,176,202,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <h1 className="relative font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.95] mb-4 hero-name-shimmer">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-base md:text-lg text-white/50 tracking-wide max-w-xl mx-auto mb-10"
        >
          Patna, Bihar &bull; Transforming Faces, Elevating Confidence
        </motion.p>
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

export function SocialProofMarquee() {
  const items = [
    "✦ As Seen at Miss Universe 2025",
    "✦ The Cover Girl Event",
    "✦ 100+ Happy Brides",
    "✦ Lakme Academy Certified",
    "✦ Patna's Premier Makeup Artist",
    "✦ Bridal & Editorial Specialist",
    "✦ HD & Airbrush Expert",
  ];

  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative bg-black overflow-hidden py-3 border-y border-white/5">
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

export function TrustStrip() {
  const { ref, inView } = ScrollRevealInView();

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

// Hook to handle inView for stats
function ScrollRevealInView() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return { ref, inView };
}

