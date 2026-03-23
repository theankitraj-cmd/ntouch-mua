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
          className="font-display text-5xl md:text-7xl text-white mb-8 tracking-widest text-center"
        >
          NANCY <span className="italic text-blush-400">MEHTA</span>
        </motion.h1>
        
        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mx-auto">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gold-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="font-body text-xs uppercase tracking-[0.4em] text-white/40 mt-6 text-center">
          Loading Luxury Experience {progress}%
        </p>
      </div>
    </motion.div>
  );
}
