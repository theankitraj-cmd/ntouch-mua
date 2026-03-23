"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  const reviews = [
    { name: "Anjali Sharma", role: "Bride", text: "Nancy is an absolute magician! My wedding makeup stayed perfect all night long, and I've never felt more beautiful. Highly recommend her for any bride!" },
    { name: "Priya Raj", role: "Events", text: "The attention to detail Nancy provides is unmatched. She understood exactly what I wanted for my reception. Her work is truly professional and high-end." },
    { name: "Meera Singh", role: "Editorial", text: "Working with Nancy for our fashion shoot was a breeze. Her grasp of lighting and textures is incredible. The results on camera were flawless." },
  ];

  return (
    <section id="reviews" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-plum mb-6">What My <span className="italic text-blush-500">Clients Say</span></h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-10 rounded-[2.5rem] bg-surface relative border border-blush-100 hover:shadow-2xl transition-all h-full flex flex-col justify-between">
                <Quote className="w-10 h-10 text-blush-200 absolute top-8 right-8" />
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="font-body text-lg text-plum leading-relaxed italic mb-8">"{r.text}"</p>
                </div>
                <div>
                  <h4 className="font-display text-xl text-plum mb-1">{r.name}</h4>
                  <p className="font-body text-sm text-plum-soft uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
