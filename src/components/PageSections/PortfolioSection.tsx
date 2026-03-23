"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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

export function PortfolioSection() {
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

  const filtered = activeFilter === "All" ? works : works.filter((w) => w.category === activeFilter);

  const gridPatterns = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2", "", "", "md:col-span-2"];

  return (
    <section id="portfolio" className="relative py-section overflow-hidden bg-surface-elevated transition-colors duration-700 section-optimize">
      <AnimatePresence>
        {hoveredImage !== null && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none perf-gpu"
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

      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blush-200/20 rounded-full blur-[150px] pointer-events-none z-0 perf-gpu" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-4 transition-colors duration-500">Portfolio</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-colors duration-500 ${hoveredImage ? 'text-white' : 'text-plum'}`}>
              Bridal & Editorial Portfolio My <span className="italic text-blush-500">Artistry</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={`font-body text-base max-w-xl mx-auto transition-colors duration-500 ${hoveredImage ? 'text-white/80' : 'text-plum-soft'}`}>
              Each look is a masterpiece crafted with precision and passion. Browse through my collection of transformations.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-blush-500 text-white shadow-lg shadow-blush-500/25"
                    : hoveredImage ? "text-white/60 hover:text-white" : "text-plum-soft hover:text-plum hover:bg-blush-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {filtered.map((work, i) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredImage(work.id)}
              onMouseLeave={() => setHoveredImage(null)}
              className={`relative group rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 perf-gpu ${gridPatterns[i % gridPatterns.length]}`}
              onClick={() => setSelectedImage(work.id)}
            >
              <img
                src={work.img}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 img-optimize"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-950/90 via-blush-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-gold-300 mb-1">{work.category}</p>
                <h3 className="font-display text-xl md:text-2xl text-white font-light drop-shadow-sm">{work.title}</h3>
                <p className="font-body text-sm text-white/70 drop-shadow-sm">{work.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full aspect-[4/3] sm:aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-white/10 perf-gpu"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={works.find((w) => w.id === selectedImage)?.img}
                alt={works.find((w) => w.id === selectedImage)?.title}
                className="absolute inset-0 w-full h-full object-cover img-optimize"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="font-display text-3xl md:text-4xl text-white mb-2">{works.find((w) => w.id === selectedImage)?.title}</p>
                <p className="font-body text-sm md:text-base text-white/70 tracking-wide">{works.find((w) => w.id === selectedImage)?.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
