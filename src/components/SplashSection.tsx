"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
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
    { text: "Signature Look", lang: "reveal" },
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          src="/nancy-mehta-hero-bridal.jpg"
          alt="Signature Look"
          className="w-full h-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={currentWord === greetings.length - 1 ? { opacity: 0.4, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-10 w-full h-32 flex items-center justify-center text-center">
        {greetings.map((greeting, i) => (
          <motion.span
            key={i}
            className={`absolute whitespace-nowrap ${
              greeting.lang === "brand"
                ? "font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-wide text-white drop-shadow-lg"
                : greeting.lang === "reveal"
                ? "font-display text-4xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg"
                : "font-display text-4xl sm:text-6xl md:text-8xl font-light italic text-white/90 drop-shadow-md"
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
          >
            {greeting.text}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="absolute bottom-12 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.6em] text-white/60 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentWord >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Nancy Mehta — Makeup Artist
      </motion.p>
    </motion.div>
  );
}
