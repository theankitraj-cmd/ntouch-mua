"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { MessageCircle, Heart, Sparkles, ShoppingBag, Instagram } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { swipeCards, kitItems, editorialLooks, brideLooks, titleLooks } from "@/constants/data";

export function MobileBookingBar() {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] w-auto max-w-sm"
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <a 
        href="https://wa.me/918969184453?text=Hi%20Nancy!%20I%20want%20to%20book%20a%20makeup%20session."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full bg-green-500/20 backdrop-blur-xl border border-green-500/30 px-6 py-4 rounded-full shadow-[0_8px_32px_rgba(22,163,74,0.4)] hover:bg-green-500/30 transition-all active:scale-95 group"
      >
        <MessageCircle className="w-5 h-5 text-green-400 drop-shadow-lg group-hover:scale-110 transition-transform" />
        <span className="font-body text-sm font-medium tracking-wide text-white">Contact on WhatsApp</span>
      </a>
    </motion.div>
  );
}

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
    <section className="py-section bg-gradient-to-b from-surface to-blush-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Interactive</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum mb-6">Find Your <span className="italic text-blush-500">Vibe</span></h2>
          <p className="font-body text-base text-plum-soft max-w-xl mx-auto mb-16">Swipe right on what you love, left on what you don't. We'll curate the perfect look for you.</p>
        </ScrollReveal>
        <div className="relative w-full max-w-[280px] sm:max-w-sm mx-auto aspect-[3/4] flex items-center justify-center">
          {finished ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center border border-blush-100">
              <Heart className="w-16 h-16 text-blush-500 mb-6" />
              <h3 className="font-display text-3xl text-plum mb-2">It's a Match!</h3>
              <p className="font-body text-plum-soft mb-8">Based on your swipes, your perfect style is: <span className="block font-semibold text-xl text-blush-600 mt-2">{likes[0] || "Custom Blend"}</span></p>
              <button className="px-8 py-3 bg-blush-500 text-white rounded-full font-body text-sm tracking-wide shadow-lg hover:bg-blush-600 cursor-pointer">Book This Look</button>
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
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden flex flex-col shadow-blush-200/50"
                  >
                    <div className="flex-1 relative overflow-hidden flex flex-col justify-end">
                      <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-20 mix-blend-overlay`} />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {isTop && (
                        <motion.div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md text-white px-5 py-2 rounded-full font-body text-xs tracking-widest uppercase border border-white/20 flex items-center gap-4 z-20 shadow-xl" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                          <span className="text-white/80">← Pass</span>
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

export function ShopNancysKit() {
  const [activeItem, setActiveItem] = useState<typeof kitItems[0] | null>(null);

  return (
    <section className="py-section bg-surface overflow-hidden relative border-t border-blush-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-widest uppercase text-gold-500 mb-4">Vanity Secret</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-plum mb-6">Shop My <span className="italic text-blush-500">Kit</span></h2>
            <p className="font-body text-plum-soft max-w-lg mx-auto">
              Step into my virtual vanity. Click the glowing hotspots to discover the premium artistry tools I use to create the signature N.Touch radiance.
            </p>
          </ScrollReveal>
        </div>
        <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-blush-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blush-50 to-blush-200" />
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000" alt="Vanity Desk" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
          {kitItems.map((item) => (
            <motion.div key={item.id} className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer" style={{ top: item.top, left: item.left }} onClick={() => setActiveItem(item)}>
              <div className="absolute inset-0 rounded-full bg-white opacity-40 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-white shadow-[0_0_15px_white]" />
            </motion.div>
          ))}
          <AnimatePresence>
            {activeItem && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-blush-100 flex gap-4 items-center z-30">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0"><img src={activeItem.img} alt={activeItem.name} className="w-full h-full object-cover" /></div>
                <div className="flex-1">
                  <p className="font-body text-xs text-gold-500 tracking-widest uppercase mb-1">{activeItem.brand}</p>
                  <h4 className="font-display text-xl text-plum mb-1">{activeItem.name}</h4>
                  <p className="font-body text-sm font-medium text-plum-soft">{activeItem.price}</p>
                </div>
                <button onClick={() => setActiveItem(null)} className="w-10 h-10 bg-blush-50 text-blush-500 rounded-full flex items-center justify-center hover:bg-blush-500 hover:text-white transition-colors"><ShoppingBag className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-section bg-surface-elevated border-t border-blush-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <ScrollReveal>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-2">Join The <span className="italic text-blush-500">Community</span></h2>
              <p className="font-body text-plum-soft">Live feed from our latest shoots and glam sessions.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-body text-sm font-medium tracking-wide shadow-lg hover:-translate-y-1 transition-all"><Instagram className="w-5 h-5" />Follow @NTOUCH.MUA</a>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md">
                <img src={post.img} alt="Instagram Post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"><Heart className="w-6 h-6 text-white fill-white" /><span className="font-display text-xl text-white">{post.likes}</span></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HolographicCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    y.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  };
  return (
    <section className="py-24 bg-surface-elevated flex flex-col md:flex-row justify-center items-center px-6 gap-12" style={{ perspective: "1500px" }}>
      <div className="text-center md:text-left max-w-sm"><ScrollReveal><p className="font-body text-sm tracking-widest uppercase text-gold-500 mb-4">Connect</p><h2 className="font-display text-4xl lg:text-5xl font-light text-plum mb-4">Carry The <span className="italic text-blush-500">Magic</span> With You</h2><p className="font-body text-plum-soft">Save my digital card to instantly access my portfolio from anywhere.</p></ScrollReveal></div>
      <ScrollReveal delay={0.2}>
        <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => {x.set(0); y.set(0);}} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-[320px] h-[180px] sm:h-[200px] md:max-w-[400px] md:h-[240px] rounded-2xl bg-gradient-to-br from-[#2E131E] to-[#12050B] shadow-2xl border border-white/10 overflow-hidden cursor-pointer group px-4">
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between"><div><h3 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-1">Nancy Touch</h3><p className="font-body text-[10px] text-gold-400 tracking-widest uppercase">Master Makeup Artist</p></div><Sparkles className="w-5 h-5 text-white/50" /></div>
            <div className="flex justify-between items-end"><div><p className="font-body text-[10px] text-white/60 tracking-widest font-mono">+91 89691 84453</p><p className="font-body text-[10px] text-white/40 tracking-widest font-mono">IG: @NTOUCH.MUA</p></div><div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20"><span className="font-body text-xs text-white">N.T</span></div></div>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}

export function ScrollZoomReveal() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 4]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  return (
    <section ref={container} className="relative h-[150vh] bg-surface z-20" style={{ marginTop: "-20vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-b border-blush-200/10">
        <motion.div style={{ scale, opacity }} className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border border-blush-500/20 shadow-xl bg-[#110509]">
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000" alt="Tools" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}

export function EditorialLookbook() {
  return (
    <section className="relative py-32 editorial-bg overflow-hidden flex flex-col items-center border-y border-neutral-200">
      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-24 z-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {editorialLooks.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="bg-white p-4 pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:-rotate-1 relative">
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800"><img src={look.img} alt={look.title} className="w-full h-full object-cover filter contrast-125 saturate-50" /></div>
                 <div className="absolute bottom-6 left-0 w-full text-center"><span className="font-cursive text-4xl text-neutral-800">{look.title}</span></div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto px-8 md:px-24 mb-16 relative z-10 border-b border-black/10 pb-32">
        <div className="grid md:grid-cols-3 gap-12">
          {brideLooks.map((look, i) => (
             <ScrollReveal key={i} delay={i * 0.1}>
               <div className="bg-white p-4 pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-105 hover:rotate-1 relative">
                 <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800"><img src={look.img} alt={look.title} className="w-full h-full object-cover" /></div>
                 <div className="absolute bottom-6 left-0 w-full text-center"><span className="font-cursive text-4xl text-neutral-800">{look.title}</span></div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="w-full bg-[#f4f4f4] py-24 relative z-10 pattern-dots">
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal className="mb-20 text-center"><h2 className="font-outline-thick text-6xl md:text-9xl text-black tracking-widest">TITLE LOOKS</h2></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12">
            {titleLooks.map((look, i) => (
               <ScrollReveal key={i} delay={(i % 3) * 0.1}>
                 <div className="bg-white p-4 pb-24 outline outline-1 outline-neutral-200 polaroid-shadow transform transition-transform duration-500 hover:scale-[1.03] hover:-rotate-1 relative group">
                   <div className="aspect-[4/5] overflow-hidden outline outline-1 outline-neutral-800"><img src={look.img} alt={look.title} className="w-full h-full object-cover" /></div>
                   <div className="absolute bottom-6 left-0 w-full text-center"><span className="font-cursive text-3xl text-neutral-800">{look.title}</span></div>
                 </div>
               </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
