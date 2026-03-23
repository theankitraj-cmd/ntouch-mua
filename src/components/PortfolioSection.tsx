"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Sparkles, MessageCircle, 
  ArrowRight, Heart 
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filters = ["All", "Bridal", "Party", "Editorial"];

  const works = [
    { id: 1, category: "Bridal", title: "Royal Bride", subtitle: "Traditional elegance", img: "/title-marathi-bride.jpg" },
    { id: 2, category: "Party", title: "Glam Night", subtitle: "Evening sophistication", img: "/editorial-collabs.jpg" },
    { id: 3, category: "Editorial", title: "Vogue Feature", subtitle: "Editorial artistry", img: "/editorial-editorials.jpg" },
    { id: 4, category: "Bridal", title: "Dream Wedding", subtitle: "Timeless beauty", img: "/title-bride.jpg" },
    { id: 5, category: "Party", title: "Reception Glow", subtitle: "Radiant finish", img: "/bride-look-2.jpg" },
    { id: 6, category: "Editorial", title: "Fashion Week", subtitle: "Bold & creative", img: "/title-indo-western.jpg" },
    { id: 7, category: "Bridal", title: "Bengali Bride", subtitle: "Cultural beauty", img: "/title-bengali-bride.jpg" },
    { id: 8, category: "Party", title: "Birthday Glam", subtitle: "Celebration look", img: "/bride-engagement.jpg" },
  ];

  const filtered =
    activeFilter === "All"
      ? works
      : works.filter((w) => w.category === activeFilter);

  const gridPatterns = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
  ];

  return (
    <section id="portfolio" className="relative py-section overflow-hidden bg-surface-elevated transition-colors duration-700">
      <AnimatePresence>
        {hoveredImage !== null && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${135 + hoveredImage * 30}deg, 
                  hsl(${340 + hoveredImage * 8}, 60%, 40%), 
                  hsl(${330 + hoveredImage * 10}, 50%, 15%))`
              }}
            />
            <div className="absolute inset-0 bg-surface-elevated/70 backdrop-blur-[60px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blush-200/20 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
             <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4 transition-colors duration-500">
               Portfolio
             </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-colors duration-500 ${hoveredImage !== null ? 'text-white' : 'text-plum'}`}>
              My <span className="italic text-blush-500">Artistry</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={`font-body text-base max-w-xl mx-auto transition-colors duration-500 ${hoveredImage !== null ? 'text-white/80' : 'text-plum-soft'}`}>
              Each look is a masterpiece crafted with precision and passion.
              Browse through my collection of transformations.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {["All", "Bridal", "Party", "Editorial"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full font-body text-sm tracking-widest uppercase transition-all duration-300 ${activeFilter === filter ? 'bg-plum text-white shadow-lg' : 'bg-white/50 text-plum hover:bg-white border border-blush-100'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {filtered.map((work, i) => (
            <ScrollReveal 
              key={work.id} 
              delay={i * 0.05}
              className={gridPatterns[i % gridPatterns.length]}
            >
              <motion.div
                onMouseEnter={() => setHoveredImage(work.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => setSelectedImage(work.id)}
                className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="font-body text-xs tracking-widest uppercase text-blush-300 mb-2">{work.category}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-1">{work.title}</h3>
                  <p className="font-body text-sm text-white/70 italic">{work.subtitle}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BentoServices() {
  const services = [
    { title: "Bridal", desc: "The signature royal transformation", icon: Sparkles, color: "bg-rose-50" },
    { title: "Party", desc: "Modern glam for every celebration", icon: Heart, color: "bg-purple-50" },
    { title: "Editorial", desc: "High fashion art for collabs", icon: ShoppingBag, color: "bg-blue-50" },
    { title: "Lessons", desc: "Master the art of self-makeup", icon: MessageCircle, color: "bg-amber-50" },
  ];

  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-plum text-white p-12 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">Elite Services <br/> For Every <span className="italic text-blush-400">Occasion</span></h3>
              <p className="font-body text-lg text-white/60 max-w-sm mb-10">Experience professional artistry tailored to your unique beauty and style goals.</p>
            </div>
            <motion.a 
              href="#booking"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-xl font-display tracking-wide group"
            >
              Start Your Journey <ArrowRight className="w-6 h-6 text-blush-400 transition-transform group-hover:translate-x-2" />
            </motion.a>
          </div>
          
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`${s.color} p-10 rounded-[2.5rem] flex flex-col justify-between border border-black/5 hover:border-black/10 transition-all`}
            >
              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm mb-8">
                <s.icon className="w-8 h-8 text-plum" />
              </div>
              <div>
                <h4 className="font-display text-2xl md:text-3xl text-plum mb-3">{s.title}</h4>
                <p className="font-body text-plum-soft">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
