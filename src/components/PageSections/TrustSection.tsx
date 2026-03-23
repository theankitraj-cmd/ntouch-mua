"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Heart, Star, MapPin } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   UTILITY HOOKS
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

/* ═══════════════════════════════════════════════════════
   TRUST STRIP & MARQUEE
   ═══════════════════════════════════════════════════════ */

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
    <div className="relative bg-black overflow-hidden py-3 border-y border-white/5 section-optimize">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap perf-gpu"
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

export function TrustSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { icon: Award, label: "Lakme Certified", value: "", isText: true },
    { icon: Heart, label: "Happy Brides", value: 500, suffix: "+" },
    { icon: Star, label: "Years Experience", value: 7, suffix: "+" },
    { icon: MapPin, label: "Bihar & Beyond", value: "", isText: true },
  ];

  return (
    <section ref={ref} className="relative bg-blush-950 py-8 section-optimize">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center gap-2 md:border-r md:last:border-r-0 border-white/10 perf-gpu">
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
