"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, ChevronRight, Star, Sparkles, Award, Heart, Instagram } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#testimonials" },
  ];

  const isExpanded = hovered || mobileMenuOpen || !scrolled;
  const springConfig = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none section-optimize">
        <motion.nav
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          layout
          initial={false}
          animate={{
            width: isExpanded ? "100%" : "120px",
            maxWidth: isExpanded ? "640px" : "120px",
            height: isExpanded ? "64px" : "40px",
            backgroundColor: scrolled && !hovered ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.6)",
            backdropFilter: scrolled && !hovered ? "blur(8px)" : "blur(24px)",
            borderRadius: isExpanded ? "32px" : "20px"
          }}
          transition={springConfig}
          className="pointer-events-auto flex items-center justify-between px-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden text-nowrap perf-gpu"
        >
          <motion.div 
            layout="position"
            transition={springConfig}
            className="z-20 flex-shrink-0 flex items-center"
            animate={{ flex: isExpanded ? 0 : 1, justifyContent: isExpanded ? "flex-start" : "center" }}
            style={{ width: isExpanded ? "auto" : "100%" }}
          >
            <a href="#" className="font-display text-xl md:text-2xl font-semibold tracking-wide text-white">N.Touch</a>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-6 absolute right-5 z-10"
            animate={{ opacity: isExpanded ? 1 : 0, filter: isExpanded ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="font-body text-xs font-medium tracking-[0.1em] uppercase text-white/70 hover:text-white transition-colors duration-200">{link.label}</a>
            ))}
            <a href="#booking" className="ml-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wide transition-transform hover:scale-105 shadow-md flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Book
            </a>
          </motion.div>

          <motion.button
            animate={{ opacity: isExpanded ? 1 : 0, filter: isExpanded ? "blur(0px)" : "blur(4px)" }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-white absolute right-5 z-20 cursor-pointer"
            style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </motion.nav>
      </div>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, backdropFilter: "blur(40px)" } : { opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-40 bg-black/40 flex flex-col justify-center px-6 md:hidden perf-gpu"
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mt-16">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={mobileMenuOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 25 }}
              className="aspect-square bg-white/10 border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {i === 0 ? <Star className="w-5 h-5 text-white" /> : i === 1 ? <Sparkles className="w-5 h-5 text-white" /> : i === 2 ? <Award className="w-5 h-5 text-white" /> : <Heart className="w-5 h-5 text-white" />}
              </div>
              <span className="font-body text-sm tracking-widest uppercase text-white font-medium">{link.label}</span>
            </motion.a>
          ))}
          <motion.a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            className="col-span-2 h-24 bg-gradient-to-r from-blush-500 to-blush-700 border border-white/20 rounded-3xl flex items-center justify-between px-8 active:scale-95 transition-transform"
          >
            <div className="flex flex-col">
              <span className="font-display text-2xl text-white tracking-wide">Book Now</span>
              <span className="font-body text-xs text-white/70 uppercase tracking-widest">Reserve your date</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
