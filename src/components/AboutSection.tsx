"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Heart, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section id="about" className="relative py-section bg-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blush-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-blush-100 relative shadow-xl">
                <img 
                  src="/nancy-mehta-makeup-artist-patna-bihar.jpg"
                  alt="Nancy Mehta - Best Makeup Artist in Patna Bihar with Lakme Academy Certificate" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blush-950/40 to-transparent pointer-events-none" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:-right-10 glass-dense ghost-border rounded-2xl p-5 ambient-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-500 to-blush-700 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-plum">
                      Lakme Academy
                    </p>
                    <p className="font-body text-xs text-plum-soft">
                      Certified Professional
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
                The Artist
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum leading-tight mb-6">
                About <span className="italic text-blush-500">Nancy</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base md:text-lg text-plum-soft leading-relaxed mb-6">
                Nancy Mehta is a certified Makeup Artist and Skincare Specialist with 2 years of professional experience, trained at the prestigious Lakme Academy. Skilled in creating natural and customized looks, she blends creativity with precision to deliver exceptional results for every client.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-body text-base md:text-lg text-plum-soft leading-relaxed mb-8">
                Her expertise ranges from flawless bridal styling to high-pressure event glam, including her work supporting contestants at <strong className="text-plum font-medium">Miss Universe 2025</strong> and <strong className="text-plum font-medium">The Cover Girl Event</strong>. Every look she creates ensures you step into the spotlight with absolute confidence and radiance.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Sparkles, text: "Event & Stage Makeup" },
                  { icon: Heart, text: "Skincare Specialist" },
                  { icon: Star, text: "Miss Universe Experience" },
                  { icon: Award, text: "Lakme Certified" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated transition-colors duration-200 hover:bg-blush-100 cursor-default"
                  >
                    <item.icon className="w-4 h-4 text-blush-500 flex-shrink-0" />
                    <span className="font-body text-sm text-plum">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-8 border-t border-blush-200/50 pt-8">
                <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">
                  Ethic & Approach
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Impeccable Hygiene", "Time Management", "Client Communication", "Attention to Detail", "Adaptability"].map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full border border-blush-200 bg-surface text-xs font-body tracking-wider text-plum uppercase hover:bg-blush-100 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
