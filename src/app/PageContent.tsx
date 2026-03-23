"use client";

import React from "react";
import { SplashScreen } from "@/components/SplashSection";
import { Navbar } from "@/components/NavBar";
import { HeroSection } from "@/components/PageSections/HeroSection";
import { TrustSection, SocialProofMarquee } from "@/components/PageSections/TrustSection";
import { AboutSection } from "@/components/PageSections/AboutSection";
import { PortfolioSection } from "@/components/PageSections/PortfolioSection";
import { BentoServices } from "@/components/PageSections/ServiceSections";
import { TestimonialsSection } from "@/components/PageSections/TestimonialsSection";
import { FAQSection } from "@/components/PageSections/FAQSection";
import { BookingSection } from "@/components/PageSections/BookingSection";
import { FooterSection } from "@/components/PageSections/FooterSection";

export default function PageContent() {
  return (
    <main className="bg-surface smooth-scroll-container h-screen overflow-y-auto overflow-x-hidden">
      <SplashScreen />
      <Navbar />
      
      {/* ── 120 FPS PERFORMANCE SECTIONS ── */}
      <div className="relative">
        <HeroSection />
        <SocialProofMarquee />
        <TrustSection />
        <AboutSection />
        <PortfolioSection />
        <BentoServices />
        <TestimonialsSection />
        <FAQSection />
        <BookingSection />
        <FooterSection />
      </div>

      {/* SEO Hidden Content */}
      <div className="sr-only">
        <h1>Nancy Mehta - Best Bridal Makeup Artist in Patna</h1>
        <p>Lakme Academy certified professional makeup artist in Patna, Bihar. Specializing in Bridal, Party, HD, and Airbrush makeup with 7+ years of experience.</p>
      </div>
    </main>
  );
}
