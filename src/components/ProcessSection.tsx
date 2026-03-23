"use client";

import { motion } from "framer-motion";
import { 
  Zap, Calendar, Heart, Award, 
  ShoppingBag, Sparkles, MessageCircle 
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StackingProcess() {
  const steps = [
    { number: "01", title: "Consultation", desc: "Understanding your vision and skin type", icon: MessageCircle },
    { number: "02", title: "Preparation", desc: "Premium skincare base for longevity", icon: Heart },
    { number: "03", title: "Artistry", desc: "The signature Nancy Mehta transformation", icon: Sparkles },
    { number: "04", title: "Reveal", desc: "Final touch-ups for a camera-ready look", icon: Award },
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-plum mb-6">The <span className="italic text-blush-500">Process</span></h2>
          <p className="font-body text-plum-soft max-w-xl mx-auto uppercase tracking-widest text-sm">Four Steps to Flawlessness</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blush-100 hidden md:block -translate-y-1/2" />
          
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-blush-200 flex items-center justify-center mb-6 shadow-xl group-hover:border-blush-500 transition-colors">
                  <step.icon className="w-8 h-8 text-blush-500" />
                </div>
                <span className="font-display text-5xl text-blush-100 absolute -top-4 -left-4 z-[-1]">{step.number}</span>
                <h3 className="font-display text-2xl text-plum mb-3">{step.title}</h3>
                <p className="font-body text-sm text-plum-soft">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LookBreakdown() {
  const features = [
    { label: "Base", value: "Dewy & Flawless", x: 25, y: 30 },
    { label: "Eyes", value: "Sunset Smoke", x: 70, y: 25 },
    { label: "Lips", value: "Rose Velour", x: 45, y: 75 },
    { label: "Glow", value: "Angelic Highlight", x: 30, y: 55 },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <ScrollReveal>
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
              <img 
                src="/bride-look-2.jpg" 
                alt="Makeup Detail" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            {/* Annotation tags */}
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                className="absolute z-20"
              >
                <div className="relative flex flex-col items-center">
                   <div className="w-2 h-2 rounded-full bg-blush-400 shadow-[0_0_15px_#D4456B]" />
                   <div className="mt-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                      <p className="font-body text-[10px] uppercase tracking-tighter text-white/60 mb-1">{f.label}</p>
                      <p className="font-display text-base text-white">{f.value}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div>
           <ScrollReveal>
             <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mb-8 leading-tight">Mastering The <br/> <span className="italic text-blush-400">Cinematic Reveal</span></h2>
             <p className="font-body text-white/50 text-lg mb-10 max-w-lg leading-relaxed">
               I don't just apply makeup. I sculpt features using advanced cinematic techniques that look flawless in person and breathtaking under professional lenses.
             </p>
             <div className="space-y-6">
                {[
                  "Layered Texture Management",
                  "Anatomical Highlighting",
                  "Micro-Pigment Blending",
                  "High-Definition Longevity"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blush-500/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-blush-400" />
                    </div>
                    <span className="font-body text-white/80">{item}</span>
                  </div>
                ))}
             </div>
           </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
