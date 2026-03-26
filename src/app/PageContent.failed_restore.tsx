"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/PageSections/HeroSection";
import { SocialProofMarquee, TrustSection } from "@/components/PageSections/TrustSection";
import { AboutSection } from "@/components/PageSections/AboutSection";
import { PortfolioSection } from "@/components/PageSections/PortfolioSection";
import { 
  StackingProcess, 
  LookBreakdown, 
  AppleScrollText, 
  VibeMatcher, 
  ShopNancysKit, 
  InstagramSync, 
  HolographicCard,
  EditorialLookbook,
  MobileBookingBar
} from "@/components/PageSections/ExtendedSections";
import { BentoServices } from "@/components/PageSections/ServiceSections";
import { TestimonialsSection } from "@/components/PageSections/TestimonialsSection";
import { FAQSection } from "@/components/PageSections/FAQSection";
import { BookingSection } from "@/components/PageSections/BookingSection";
import { FooterSection } from "@/components/PageSections/FooterSection";
import { SplashScreen } from "@/components/SplashSection";
import { AnimatePresence } from "framer-motion";

export default function PageContent() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll polyfill for Safari
    if (typeof window !== "undefined" && "scrollBehavior" in document.documentElement.style === false) {
      import("smoothscroll-polyfill").then((module) => {
        module.polyfill();
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-surface selection:bg-blush-200 selection:text-plum text-left">
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <Navbar />
      
      <div className="relative z-0">
        <HeroSection />
        
        <SocialProofMarquee />
        
        <AboutSection />
        
        <TrustSection />
        
        <EditorialLookbook />
        
        <StackingProcess />
        
        <PortfolioSection />
        
        <LookBreakdown />
        
        <AppleScrollText />
        
        <BentoServices />
        
        <VibeMatcher />
        
        <ShopNancysKit />
        
        <TestimonialsSection />
        
        <InstagramSync />
        
        <HolographicCard />
        
        <FAQSection />
        
        <BookingSection />
        
        <FooterSection />

        <MobileBookingBar />
      </div>
    </main>
  );
}
