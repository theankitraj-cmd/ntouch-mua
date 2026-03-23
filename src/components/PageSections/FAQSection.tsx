"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who is the best makeup artist in Patna?",
      a: "Nancy Mehta (N.Touch — Professional Makeup Artist in Patna) is one of the top-rated makeup artists in Patna, Bihar. She is Lakme Academy certified and has worked at prestigious events like Miss Universe 2025 and The Cover Girl Event. She specializes in bridal, party, HD, and airbrush makeup.",
    },
    {
      q: "How much does bridal makeup cost in Patna?",
      a: "Bridal makeup pricing depends on the package you choose. N.Touch offers premium packages including HD/Airbrush base, 3D eye makeup, hairstyling, saree draping, and skin prep. Contact Nancy at +91 89691 84453 for a personalized quote.",
    },
    {
      q: "Does Nancy Mehta provide makeup services outside Patna?",
      a: "Yes! Nancy travels to nearby cities across Bihar and Jharkhand including Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Ara, Nalanda, and Ranchi for bridal and event makeup bookings.",
    },
    {
      q: "What types of makeup services are available?",
      a: "N.Touch offers bridal makeup, party & reception glam, HD & airbrush makeup, editorial & photoshoot makeup, engagement makeup, skincare & facials, nail care, saree draping, and complete traditional styling.",
    },
    {
      q: "How far in advance should I book my bridal makeup?",
      a: "We recommend booking at least 2-3 months in advance for bridal makeup, especially during the wedding season (October-February). Early booking ensures your preferred date is secured and allows time for a trial session.",
    },
  ];

  return (
    <section id="faq" className="relative py-section bg-surface overflow-hidden section-optimize">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
             <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4">Questions</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-plum">
              Frequently Asked <span className="italic text-blush-500">Concerns</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05} className="perf-gpu">
              <div 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i ? "border-blush-200 bg-blush-50/30 shadow-lg" : "border-blush-100 bg-white hover:border-blush-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className="font-display text-xl md:text-2xl text-plum font-light">{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`w-5 h-5 ${openIndex === i ? "text-blush-500" : "text-plum/30"}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 font-body text-base md:text-lg text-plum-soft leading-relaxed border-t border-blush-100/50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
