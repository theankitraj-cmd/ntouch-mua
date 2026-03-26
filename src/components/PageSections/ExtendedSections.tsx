"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { 
  ArrowRight, 
  MessageCircle, 
  Heart, 
  ShoppingBag, 
  Instagram, 
  Sparkles,
  Award
} from "lucide-react";
import { useInView } from "react-intersection-observer";

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL WRAPPER
   ═══════════════════════════════════════════════════════ */

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
   STACKING PROCESS
   ═══════════════════════════════════════════════════════ */

export function StackingProcess() {
  const steps = [
    {
      id: "step-1",
      number: "01",
      title: "Consultation & Vision",
      text: "Understanding your personality, outfit, and dream look. We don&apos;t just pick a style; we craft a bespoke narrative for your special day.",
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
      title: "Signature Mastery",
      text: "The result of absolute dedication. Our iconic bridal transformations ensure you look like a masterpiece throughout your special day.",
      bg: "bg-black",
      textCol: "text-gold-400",
      img: "/nancy-mehta-hero-bridal.jpg"
    }
  ];

  return (
    <section className="py-section bg-surface overflow-hidden relative section-optimize">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/20 rounded-full blur-[120px] pointer-events-none perf-gpu" />
      
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
                className={`w-full min-h-[300px] md:h-[350px] ${step.bg} rounded-[40px] p-10 md:p-14 shadow-2xl border border-blush-100/20 flex flex-col justify-between transition-transform duration-500 perf-gpu`}
                style={{ transformOrigin: "top center" }}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-display text-7xl md:text-8xl opacity-30 ${step.textCol} leading-none`}>{step.number}</span>
                  <div className={`w-12 h-12 rounded-full border border-current opacity-30 flex items-center justify-center ${step.textCol}`}>
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
                <div className="mt-12 md:mt-0 flex flex-col md:flex-row items-end md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className={`font-display text-3xl md:text-4xl mb-4 ${step.textCol}`}>{step.title}</h3>
                    <p className={`font-body text-base md:text-lg opacity-80 max-w-2xl leading-relaxed ${step.textCol}`}>
                      {step.text}
                    </p>
                  </div>
                  {step.img && (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl shrink-0">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover img-optimize" />
                    </div>
                  )}
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

export function LookBreakdown() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const layer1Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -180]);
  const layer2Y = useTransform(scrollYProgress, [0.3, 0.6], [0, -60]);
  const layer3Y = useTransform(scrollYProgress, [0.3, 0.6], [0, 60]);
  const layer4Y = useTransform(scrollYProgress, [0.3, 0.6], [0, 180]);
  
  const rotateX = useTransform(scrollYProgress, [0.2, 0.6], [0, 60]);
  const rotateZ = useTransform(scrollYProgress, [0.2, 0.6], [0, -20]);
  const scale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.85]);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#1A0A10] overflow-hidden relative section-optimize" style={{ perspective: "2000px" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blush-500/10 rounded-full blur-[150px] pointer-events-none perf-gpu" />

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
           className="relative w-64 h-[420px] sm:w-[320px] sm:h-[500px] perf-gpu"
           style={{ rotateX, rotateZ, scale, transformStyle: "preserve-3d" }}
        >
           {/* Layer 4: Base / Skin Prep */}
           <motion.div 
             style={{ y: layer4Y, translateZ: -120 }} 
             className="absolute inset-0 rounded-[40px] border border-white/20 bg-black/40 overflow-hidden flex items-end p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
           >
              <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600" alt="Skin Prep" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 img-optimize" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="relative z-10 text-left">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">01 Base</p>
                <p className="text-white font-display text-2xl">Skin Prep & Prime</p>
              </div>
           </motion.div>

           {/* Layer 3: Foundation */}
           <motion.div 
             style={{ y: layer3Y, translateZ: -40 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-300/30 bg-[#2A1118]/60 overflow-hidden flex items-end p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-md"
           >
              <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600" alt="HD Foundation" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 img-optimize" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1118]/90 to-transparent" />
              <div className="relative z-10 text-left">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">02 Canvas</p>
                <p className="text-white font-display text-2xl">HD Foundation</p>
              </div>
           </motion.div>

           {/* Layer 2: Dimensions */}
           <motion.div 
             style={{ y: layer2Y, translateZ: 40 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-400/40 bg-blush-900/40 overflow-hidden flex items-end p-8 shadow-[0_30px_60px_rgba(212,69,107,0.3)] backdrop-blur-md"
           >
              <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600" alt="Sculpt & Highlight" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 img-optimize" />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-900/90 to-transparent" />
              <div className="relative z-10 text-left">
                <p className="text-gold-400 font-body text-xs tracking-widest uppercase mb-2">03 Structure</p>
                <p className="text-white font-display text-2xl">Sculpt & Highlight</p>
              </div>
           </motion.div>

           {/* Layer 1: The Finish */}
           <motion.div 
             style={{ y: layer1Y, translateZ: 120 }} 
             className="absolute inset-0 rounded-[40px] border border-blush-300/60 bg-gradient-to-tr from-blush-600/60 to-blush-400/40 overflow-hidden flex items-end p-8 shadow-[0_40px_100px_rgba(212,69,107,0.6)] backdrop-blur-xl"
           >
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600" alt="Signature Eyes" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 img-optimize" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 text-left">
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

export function AppleScrollText() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 45%"]
  });

  const text = "Flawless Base. Precision Eyes. Unforgettable You.";
  const words = text.split(" ");
  
  return (
    <section ref={container} className="py-20 md:py-28 bg-surface border-y border-blush-100/50 flex items-center justify-center px-6 section-optimize">
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
   VIBE MATCHER
   ═══════════════════════════════════════════════════════ */

const swipeCards = [
  { id: 1, name: "Soft Glam", desc: "Subtle & Dewy", bg: "from-blush-200 to-blush-400", img: "/editorial-personal-shoots.jpg" },
  { id: 2, name: "Bold Drama", desc: "Smokey & Striking", bg: "from-plum-800 to-black", img: "/title-indo-western.jpg" },
  { id: 3, name: "Classic Bridal", desc: "Traditional Elegance", bg: "from-red-600 to-red-900", img: "/title-bride.jpg" },
  { id: 4, name: "Glow Getter", desc: "Highlighter Heavy", bg: "from-gold-300 to-gold-600", img: "/title-marathi-bride.jpg" },
];

export function VibeMatcher() {
  const [cards, setCards] = useState(swipeCards);
  const [likes, setLikes] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleDragEnd = (event: any, info: any, card: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setLikes(prev => [...prev, card.name]);
      removeCard(card.id);
    } else if (info.offset.x < -threshold) {
      removeCard(card.id);
    }
  };

  const removeCard = (id: number) => {
    const remaining = cards.filter(c => c.id !== id);
    setCards(remaining);
    if (remaining.length === 0) setFinished(true);
  };

  return (
    <section className="py-section bg-gradient-to-b from-surface to-blush-50 overflow-hidden relative section-optimize">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Interactive</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum mb-6">
            Find Your <span className="italic text-blush-500">Vibe</span>
          </h2>
          <p className="font-body text-base text-plum-soft max-w-xl mx-auto mb-16">
            Swipe right on what you love, left on what you don&apos;t. We&apos;ll curate the perfect look for you.
          </p>
        </ScrollReveal>

        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] flex items-center justify-center">
          {finished ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center border border-blush-100 perf-gpu"
            >
              <Heart className="w-16 h-16 text-blush-500 mb-6" />
              <h3 className="font-display text-3xl text-plum mb-2">It&apos;s a Match!</h3>
              <p className="font-body text-plum-soft mb-8 text-center">
                Based on your swipes, your perfect style is: 
                <span className="block font-semibold text-xl text-blush-600 mt-2">{likes[0] || "Custom Blend"}</span>
              </p>
              <a href="#booking" className="px-8 py-3 bg-blush-500 text-white rounded-full font-body text-sm tracking-wide shadow-lg shadow-blush-500/30 hover:bg-blush-600 transition-all cursor-pointer">
                Book This Look
              </a>
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
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden flex flex-col perf-gpu"
                    style={{ cursor: isTop ? "grab" : "auto" }}
                    whileDrag={{ cursor: "grabbing", scale: 1.05 }}
                  >
                    <div className="flex-1 relative overflow-hidden flex flex-col justify-end">
                      {card.img && <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover img-optimize" />}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-20 mix-blend-overlay`} />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
   SHOP NANCY'S KIT
   ═══════════════════════════════════════════════════════ */

const kitItems = [
  { id: 1, name: "Flawless Filter", brand: "Charlotte Tilbury", price: "$49", top: "40%", left: "30%", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be" },
  { id: 2, name: "Luminous Silk", brand: "Giorgio Armani", price: "$69", top: "60%", left: "55%", img: "https://images.unsplash.com/photo-1599305090598-fe179d501227" },
  { id: 3, name: "Pillow Talk Lip", brand: "Charlotte Tilbury", price: "$35", top: "70%", left: "75%", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa" },
];

export function ShopNancysKit() {
  const [activeItem, setActiveItem] = useState<typeof kitItems[0] | null>(null);

  return (
    <section className="py-section bg-surface overflow-hidden relative border-t border-blush-100 section-optimize">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Vanity Secret</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-plum mb-6">
              Shop My <span className="italic text-blush-500">Kit</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-blush-200 perf-gpu">
          <div className="absolute inset-0 bg-gradient-to-br from-blush-50 to-blush-200" />
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000" alt="Vanity Desk" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 img-optimize" />
          
          {kitItems.map((item) => (
            <motion.div
              key={item.id}
              className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer z-10"
              style={{ top: item.top, left: item.left }}
              onClick={() => setActiveItem(item)}
              whileHover={{ scale: 1.2 }}
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
            </motion.div>
          ))}

          <AnimatePresence>
            {activeItem && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-blush-100/50 flex gap-4 items-center z-20"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={activeItem.img} alt={activeItem.name} className="w-full h-full object-cover img-optimize" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-xs text-gold-500 tracking-widest uppercase mb-1">{activeItem.brand}</p>
                  <h4 className="font-display text-xl text-plum mb-1">{activeItem.name}</h4>
                  <p className="font-body text-sm font-medium text-plum-soft">{activeItem.price}</p>
                </div>
                <button onClick={() => setActiveItem(null)} className="w-10 h-10 bg-blush-50 text-blush-500 rounded-full flex items-center justify-center hover:bg-blush-500 hover:text-white transition-colors cursor-pointer">
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
   INSTAGRAM SYNC
   ═══════════════════════════════════════════════════════ */

export function InstagramSync() {
  const posts = [
    { id: 1, img: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80", likes: "1.2K" },
    { id: 2, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80", likes: "856" },
    { id: 3, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80", likes: "2.1K" },
    { id: 4, img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80", likes: "945" },
    { id: 5, img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", likes: "1.5K" },
    { id: 6, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80", likes: "3.4K" }
  ];

  return (
    <section className="py-section bg-surface-elevated overflow-hidden border-t border-blush-100/50 section-optimize">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <ScrollReveal>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-2">
                Join The <span className="italic text-blush-500">Community</span>
              </h2>
              <p className="font-body text-plum-soft">Live feed from our latest shoots, brides, and glam sessions.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <a href="https://instagram.com/n.touchmua" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-body text-sm font-medium tracking-wide shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Instagram className="w-5 h-5" /> Follow @NTOUCH.MUA
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md perf-gpu">
                <img src={post.img} alt="Instagram Post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 img-optimize" />
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
   HOLOGRAPHIC CARD
   ═══════════════════════════════════════════════════════ */

export function HolographicCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const glareX = useTransform(x, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(y, [-0.5, 0.5], [100, -100]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) / rect.width);
    y.set((event.clientY - (rect.top + rect.height / 2)) / rect.height);
  };
  
  return (
    <section className="py-24 bg-surface-elevated flex flex-col md:flex-row justify-center items-center overflow-hidden px-6 gap-12 section-optimize" style={{ perspective: "1500px" }}>
      <div className="text-center md:text-left max-w-sm">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Connect</p>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-4">
            Carry The <span className="italic text-blush-500">Magic</span> With You
          </h2>
          <p className="font-body text-plum-soft">Save my digital card to instantly access my portfolio or book a consultation.</p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-[320px] h-[200px] md:w-[400px] md:h-[240px] rounded-2xl bg-gradient-to-br from-[#2E131E] to-[#12050B] shadow-[0_30px_60px_rgba(46,19,30,0.5)] border border-white/10 overflow-hidden cursor-pointer group perf-gpu"
        >
          <motion.div 
            className="absolute inset-[-150%] bg-[conic-gradient(from_90deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
            style={{ x: glareX, y: glareY, scale: 1.5 }}
          />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-left" style={{ transform: "translateZ(30px)" }}>
             <div>
               <h3 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-1">Nancy Touch</h3>
               <p className="font-body text-[10px] md:text-xs text-gold-400 tracking-[0.2em] uppercase">Master Makeup Artist</p>
             </div>
             <div className="flex justify-between items-end mt-4">
               <div>
                 <p className="font-body text-[10px] md:text-xs text-white/60 font-mono mb-1">+91 89691 84453</p>
                 <p className="font-body text-[10px] md:text-xs text-white/40 font-mono">IG: @NTOUCH.MUA</p>
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
   EDITORIAL LOOKBOOK
   ═══════════════════════════════════════════════════════ */

const editorialLooks = [
  { img: "/nancy-mehta-hero-bridal.jpg", title: "Signature Bride" },
  { img: "/editorial-editorials.jpg", title: "Editorials" },
  { img: "/editorial-personal-shoots.jpg", title: "Personal Shoots" },
  { img: "/editorial-collabs.jpg", title: "Collabs" },
];

const brideLooksData = [
  { img: "/nancy-mehta-hero-bridal.jpg", title: "Signature Masterpiece" },
  { img: "/bride-engagement.jpg", title: "Engagement Glow" },
  { img: "/bride-look-2.jpg", title: "Traditional Elegance" },
  { img: "/bride-look-3.jpg", title: "Reception Glam" },
];

const titleLooksData = [
  { img: "/title-marathi-bride.jpg", title: "Marathi Bride" },
  { img: "/title-bengali-bride.jpg", title: "Bengali Bride" },
  { img: "/title-rajasthani-bride.jpg", title: "Rajasthani Bride" },
  { img: "/title-indo-western.jpg", title: "Indo Western Look" },
  { img: "/title-bride.jpg", title: "Bride" },
  { img: "/title-christian-bride.jpg", title: "Christian Bride" },
];

export function EditorialLookbook() {
  return (
    <section className="relative py-32 editorial-bg overflow-hidden flex flex-col items-center border-y border-neutral-200 section-optimize">
      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-24 z-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {editorialLooks.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:-rotate-1 relative perf-gpu">
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800">
                   <img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-125 saturate-50 img-optimize" />
                 </div>
                 <div className="absolute bottom-6 left-0 w-full text-center">
                    <span className="font-cursive text-4xl md:text-5xl text-neutral-800">{look.title}</span>
                 </div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-16 relative z-10 border-b border-black/10 pb-32">
        <ScrollReveal className="absolute -right-4 md:-right-24 bottom-32 pointer-events-none md:origin-bottom-right md:transform md:-rotate-90 hidden lg:block z-0">
          <h2 className="font-outline-thick text-7xl md:text-9xl tracking-widest text-black opacity-90 leading-none m-0">BRIDE</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 z-10 relative">
          {brideLooksData.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="did-you-mean bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:rotate-1 relative perf-gpu">
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800">
                   <img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-110 saturate-110 img-optimize" />
                 </div>
                 <div className="absolute bottom-6 left-0 w-full text-center text-left-important">
                   <span className="font-cursive text-4xl md:text-5xl text-neutral-800">{look.title}</span>
                 </div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#f4f4f4] border-y border-black/10 py-24 relative z-10 pattern-dots">
        <div className="max-w-6xl mx-auto px-8 md:px-24">
          <ScrollReveal className="mb-20 text-center w-full">
             <h2 className="font-outline-thick text-6xl md:text-8xl lg:text-9xl text-black tracking-widest break-words">TITLE LOOKS</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-20">
            {titleLooksData.map((look, i) => (
               <ScrollReveal key={i} delay={(i % 3) * 0.1}>
                 <div className="bg-white p-3 md:p-4 pb-20 md:pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-[1.03] hover:-rotate-1 relative group perf-gpu">
                   <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800 relative">
                     <img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-[1.15] saturate-110 img-optimize" />
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
   MOBILE BOOKING BAR
   ═══════════════════════════════════════════════════════ */

export function MobileBookingBar() {
  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm md:hidden perf-gpu"
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
        <MessageCircle className="w-5 h-5 text-green-400" />
        <span className="font-body text-sm font-medium tracking-wide text-white">Book Your Look on WhatsApp</span>
      </a>
    </motion.div>
  );
}
