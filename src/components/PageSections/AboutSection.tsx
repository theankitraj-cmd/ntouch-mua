"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Check, ShoppingBag, Sparkles } from "lucide-react";

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

export function OverviewGrid() {
  const highlights = [
    { 
      icon: Sparkles, 
      title: "Signature Glow", 
      desc: "Luminous, skin-first artistry that looks breathtaking in person and on 4K camera.",
      color: "from-blush-100 to-blush-200"
    },
    { 
      icon: Award, 
      title: "Precision HD", 
      desc: "Advanced techniques for ultra-defined, high-definition results tailored to your unique features.",
      color: "from-gold-100 to-gold-200"
    },
    { 
      icon: ShoppingBag, 
      title: "Luxury Kit", 
      desc: "Exclusively using premium global brands like Dior, Chanel, Charlotte Tilbury, and Estee Lauder.",
      color: "from-blush-50 to-blush-100"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-24 mb-16 section-optimize">
      {highlights.map((h, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="group h-full p-10 rounded-[40px] bg-white border border-blush-100 transition-all hover:shadow-2xl hover:shadow-blush-200/50 hover:-translate-y-2 perf-gpu">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center mb-8`}>
              <h.icon className="w-7 h-7 text-plum" />
            </div>
            <h4 className="font-display text-2xl text-plum mb-4">{h.title}</h4>
            <p className="font-body text-plum-soft leading-relaxed">{h.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-section bg-surface overflow-hidden section-optimize">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/30 rounded-full blur-[120px] pointer-events-none perf-gpu" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-blush-100 relative shadow-xl perf-gpu">
                <img 
                  src="/nancy-mehta-makeup-artist-patna-bihar.jpg"
                  alt="Nancy Mehta - Best Makeup Artist in Patna Bihar with Lakme Academy Certificate" 
                  className="absolute inset-0 w-full h-full object-cover img-optimize"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blush-950/40 to-transparent pointer-events-none" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:-right-10 glass-dense ghost-border rounded-2xl p-5 ambient-shadow perf-gpu"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-500 to-blush-700 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-plum">Lakme Academy</p>
                    <p className="font-body text-xs text-plum-soft">Certified Professional</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-blush-500 block mb-4">The Creative Visionary</span>
              <h2 className="font-display text-5xl md:text-6xl text-plum leading-tight">
                Authenticity is our <br /> <span className="italic text-gold-500">Masterpiece.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-lg text-plum-soft leading-relaxed">
                As a Lakmé Academy certified specialist, Nancy Mehta approach to makeup is rooted in enhancing your innate elegance rather than masking it.
              </p>
              <p className="font-body text-lg text-plum-soft leading-relaxed mt-4">
                Based in Patna, Bihar, she has spent over 7 years perfecting the art of "Glow from Within" – a signature look that has graced hundreds of brides across the region.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Lakme Academy Certified", "7+ Years Experience", "100% Premium Products", "Available for Destination Weddings"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-sm text-plum">
                    <div className="w-5 h-5 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-blush-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <a href="#services" className="inline-flex items-center gap-4 py-4 px-10 rounded-full bg-plum text-white font-body font-medium tracking-wide hover:shadow-xl transition-all perf-gpu">
                Discover Our Craft
                <ShoppingBag className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>
        </div>

        <OverviewGrid />
      </div>
    </section>
  );
}
