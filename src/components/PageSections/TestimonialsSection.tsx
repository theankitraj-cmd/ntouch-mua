"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { GoldParticles } from "./HeroSection";

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

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const reviews = [
    {
      name: "Shristi",
      event: "Party / Bachelorette",
      text: "Nancy made all my wildest dreams come true! I never felt confident rocking bold and dramatic styles, but she created an absolute masterpiece for my bachelorette party. I felt unstoppable and my pictures look like they belong in a magazine. Best day ever!",
      rating: 5,
    },
    {
      name: "Ankita",
      event: "Editorial Glam",
      text: "Nancy has impeccable taste and insane vision, but her real superpower is how genuinely she listens to what her clients feel comfortable in. She elevated my features flawlessly without making me look like a different person. Pure artistry and pure magic!",
      rating: 5,
    },
    {
      name: "Kalash",
      event: "Reception",
      text: "As someone who usually doesn't wear much makeup, I never really felt comfortable dressing up until I met Nancy. She gave me a signature glow that felt completely 'me', but elevated to absolute perfection. I have never felt so beautiful and confident in my entire life!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="relative py-section bg-blush-950 overflow-hidden section-optimize">
      <GoldParticles />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-10">
        <ScrollReveal className="flex-shrink-0 flex justify-center">
          <div className="w-32 h-44 md:w-48 md:h-64 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl perf-gpu">
            <img
              src="/nancy-mehta-hero-bridal.jpg"
              alt="Bridal Makeup Look by N.Touch"
              className="w-full h-full object-cover object-top img-optimize"
            />
          </div>
        </ScrollReveal>
        <div className="flex-1">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-400 mb-4">Client Love</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Words From <span className="italic text-blush-400">My Brides</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="relative min-h-[300px] md:min-h-[250px]">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 0.95,
                  rotateY: active === i ? 0 : -10,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 perf-gpu"
                style={{
                  pointerEvents: active === i ? "auto" : "none",
                  perspective: 1000,
                }}
              >
                <div className="glass ghost-border rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                  <Quote className="w-10 h-10 text-gold-400/40 mx-auto mb-6" />
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-8 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-display text-xl text-white font-medium">{review.name}</p>
                    <p className="font-body text-sm text-white/50">{review.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active === i ? "w-8 bg-gold-400" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
