"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How early should I book for my bridal makeup?", a: "To ensure availability, I recommend booking at least 4-6 months in advance, especially for wedding season peaks (November-February)." },
    { q: "Do you travel for destination weddings?", a: "Yes, I travel all across India and internationally. For outside Patna, travel and accommodation are to be provided by the client." },
    { q: "What brands of makeup do you use?", a: "I use exclusively high-end premium brands like Estée Lauder, MAC, Huda Beauty, Dior, and Charlotte Tilbury to ensure a flawless and long-lasting finish." },
    { q: "Can I get a trial before the big day?", a: "Absolutely! I highly recommend a bridal trial to finalize your look. Trials are paid and can be adjusted if you confirm the booking." },
  ];

  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-plum mb-4">Frequently Asked <span className="italic text-blush-500">Questions</span></h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="border border-blush-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className="font-display text-xl md:text-2xl text-plum transition-colors group-hover:text-blush-500">{faq.q}</span>
                  {openIndex === i ? <Minus className="w-5 h-5 text-blush-500" /> : <Plus className="w-5 h-5 text-plum" />}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="font-body text-plum-soft leading-relaxed">{faq.a}</p>
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
