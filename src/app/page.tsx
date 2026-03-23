"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Modular Components
import { Booking } from "@/components/Booking";
import { Navbar } from "@/components/Navbar";
import { Hero, SocialProofMarquee, TrustStrip } from "@/components/HeroSection";
import { About } from "@/components/AboutSection";
import { Portfolio, BentoServices } from "@/components/PortfolioSection";
import { StackingProcess, LookBreakdown } from "@/components/ProcessSection";
import { Testimonials } from "@/components/TestimonialsSection";
import { SplashScreen } from "@/components/SplashSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { 
  MobileBookingBar, 
  AppleScrollText, 
  VibeMatcher, 
  ShopNancysKit, 
  InstagramSync, 
  HolographicCard, 
  EditorialLookbook
} from "@/components/InteractiveFeatures";

// UI Components
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSiteVisible(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <motion.main
        initial={{ opacity: 0, y: 100, scale: 0.98 }}
        animate={siteVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.98 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <Navbar />
        <Hero />
        <SocialProofMarquee />
        <TrustStrip />
        <About />
        <AppleScrollText />
        <Portfolio />
        <BentoServices />
        <StackingProcess />
        <LookBreakdown />
        <VerticalImageStack />
        <EditorialLookbook />
        <Testimonials />
        <VibeMatcher />
        <ShopNancysKit />
        <InstagramSync />
        <HolographicCard />
        <FAQSection />
        <Booking />
        <Footer />
        
        {/* Mobile Sticky CTA */}
        {siteVisible && <MobileBookingBar />}
      </motion.main>
    </>
  );
}
