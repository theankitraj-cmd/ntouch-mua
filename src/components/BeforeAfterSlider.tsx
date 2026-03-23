"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-widest uppercase text-gold-500 mb-4">The Result</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum">The <span className="italic text-blush-500">Transformation</span></h2>
            <p className="font-body text-plum-soft mt-6 max-w-lg mx-auto italic">Slide to reveal the power of professional makeup artistry.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div 
            ref={containerRef}
            className="relative aspect-[4/5] md:aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl border border-blush-100 cursor-ew-resize select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* AFTER IMAGE (Full) */}
            <img 
              src="/nancy-mehta-hero-bridal.jpg" 
              alt="After Professional Makeup in Patna" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            
            <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs tracking-widest uppercase border border-white/20 z-10">
              After (Glam)
            </div>

            {/* BEFORE IMAGE (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${sliderPos}%`, borderRight: '2px solid white' }}
            >
              <img 
                src="/nancy-mehta-makeup-artist-patna-bihar.jpg" 
                alt="Before Makeup" 
                className="absolute inset-0 w-full h-full object-cover grayscale object-top opacity-80"
                style={{ width: `${100 / (sliderPos / 100)}%` }}
              />
              <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs tracking-widest uppercase border border-white/20 z-10">
                Before
              </div>
            </div>

            {/* SLIDER HANDLE */}
            <div 
              className="absolute top-0 bottom-0 w-1 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-blush-100 -ml-6">
                <div className="flex gap-1">
                  <MoveLeft className="w-3 h-3 text-plum" />
                  <MoveRight className="w-3 h-3 text-plum" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
