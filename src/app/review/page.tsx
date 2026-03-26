"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";

export default function ReviewPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 relative overflow-hidden bg-plum-950">
      {/* Cinematic Blurred Background */}
      <div 
        className="absolute inset-0 bg-[url('/nancy-mehta-hero-bridal.jpg')] bg-cover bg-center opacity-40 blur-2xl scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum-950/80 via-plum-900/60 to-black/90" />
      
      {/* Premium Glowing Orbs */}
      <div className="absolute top-0 right-[-20%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-blush-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass rounded-[2.5rem] p-8 md:p-12 text-center border-t border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent pointer-events-none" />

          {/* Profile Picture */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full p-2 border border-gold-400/30">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src="/nancy-mehta-hero-bridal.jpg"
                alt="Nancy Mehta"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 mb-3">
              Makeover By Nancy
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
              Tell us your <br />
              <span className="italic text-blush-300">Story</span>
            </h1>
            
            <p className="font-body text-white/70 text-sm md:text-base leading-relaxed mb-10 px-4">
              Your glow is our biggest achievement. If you loved your bridal or party look, let the world know by sharing a 5-Star review!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + s * 0.1 }}
                >
                  <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 fill-yellow-500 hover:scale-110 transition-transform cursor-pointer" />
                </motion.div>
              ))}
            </div>

            {/* Huge Call to Action Button */}
            <a
              href="https://g.page/r/CU8ap08U8CLQEBM/review"
              onClick={(e) => {
                const targetUrl = "https://g.page/r/CU8ap08U8CLQEBM/review";
                const intentUrl = "intent://g.page/r/CU8ap08U8CLQEBM/review#Intent;package=com.android.chrome;scheme=https;end";
                const ua = navigator.userAgent || navigator.vendor;
                const isInstagram = ua.includes('Instagram');
                const isAndroid = /android/i.test(ua);
                
                if (isInstagram && isAndroid) {
                  e.preventDefault();
                  window.location.href = intentUrl;
                  setTimeout(() => { window.location.href = targetUrl; }, 1000); // Fallback
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-gold-500 to-gold-400 text-plum-950 px-8 py-5 rounded-full font-body font-semibold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all group cursor-pointer"
            >
              Write a Review
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Instagram Login Bypass Tip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-1 text-[11px] md:text-xs text-white/70 bg-white/5 p-3 rounded-xl border border-white/10 text-left leading-relaxed"
            >
              <strong className="text-white/90 block mb-1">📱 iPhone / iOS Tip:</strong>
              If asked to log in, tap the <span className="text-gold-400 font-semibold">three dots (···)</span> at the top right & select <span className="text-gold-400 font-semibold">"Open in Browser"</span> to skip signing in!
            </motion.div>

            <a
              href="/"
              className="mt-4 flex items-center justify-center gap-2 text-white/50 text-sm hover:text-white transition-colors p-2"
            >
              Back to Website
            </a>
          </motion.div>
        </motion.div>

        {/* Footer tiny text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/30 text-xs mt-12 font-body flex items-center justify-center gap-2"
        >
          Made with <Heart className="w-3 h-3 text-blush-400" /> in Patna
        </motion.p>
      </div>
    </div>
  );
}
