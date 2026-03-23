"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-8xl text-white mb-12 tracking-[0.3em] text-center hero-name-shimmer"
        >
          NANCY <span className="italic text-gold-400 font-light">MEHTA</span>
        </motion.h1>
        
        <div className="w-80 h-[1px] bg-white/5 relative overflow-hidden mx-auto rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_15px_#D4AF37]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="font-body text-[10px] uppercase tracking-[0.6em] text-white/30 text-center">
            Initializing Perfection
          </p>
          <p className="font-display text-2xl italic text-gold-500/50">
            {progress}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
