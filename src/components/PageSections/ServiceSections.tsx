"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Star, Award, Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";

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

export function BentoServices() {
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
    <section id="services" className="relative py-section bg-surface-elevated overflow-hidden section-optimize">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Services</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum mb-6">
              The <span className="italic text-blush-500">Bento</span> Collection
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px]">
          {services.map((service) => (
            <motion.div
              layoutId={`card-${service.id}`}
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className={`${service.colSpan} ${service.bgClass} rounded-[32px] p-8 cursor-pointer relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500 flex flex-col perf-gpu`}
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
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

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
              className={`${services.find(s => s.id === selectedId)?.bgClass} w-full max-w-2xl relative z-10 rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col pointer-events-auto perf-gpu`}
            >
              <button 
                onClick={() => setSelectedId(null)} 
                className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors cursor-pointer text-current"
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
