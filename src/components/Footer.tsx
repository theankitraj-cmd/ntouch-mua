"use client";

import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Footer() {
  return (
    <footer className="bg-plum text-white py-20 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2">
          <h2 className="font-display text-4xl md:text-5xl mb-6 tracking-widest">NANCY <span className="italic text-blush-400">MEHTA</span></h2>
          <p className="font-body text-white/50 max-w-sm mb-10 text-lg leading-relaxed">
            Crafting timeless beauty and confidence for every special moment. Patna's premier destination for high-end bridal and event artistry.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Mail, Phone].map((Icon, i) => (
              <a 
                key={i} 
                href={i === 0 ? "https://instagram.com" : i === 1 ? "https://facebook.com/ntouchmua" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6 tracking-wide">Quick Links</h4>
          <ul className="space-y-4 font-body text-white/50">
            <li><a href="#about" className="hover:text-blush-400 transition-colors">About Me</a></li>
            <li><a href="#portfolio" className="hover:text-blush-400 transition-colors">Portfolio</a></li>
            <li><a href="#services" className="hover:text-blush-400 transition-colors">Services</a></li>
            <li><a href="#booking" className="hover:text-blush-400 transition-colors">Book Now</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6 tracking-wide">Contact</h4>
          <ul className="space-y-4 font-body text-white/50">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 8969184453</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> nancymehta247@gmail.com</li>
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Patna, Bihar, India</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-xs tracking-widest uppercase text-white/30">
          © 2026 NANCY MEHTA Artistry. All Rights Reserved.
        </p>
        <p className="font-body text-xs tracking-widest uppercase text-white/30 flex items-center gap-2">
          Designed with <Heart className="w-3 h-3 text-blush-500 fill-blush-500" /> for Eternal Beauty
        </p>
      </div>

      {/* Hidden SEO Content */}
      <div className="hidden">
        <h1>Best Bridal Makeup Artist in Patna - Nancy Mehta</h1>
        <p>Expert bridal makeup services in Patna, Bihar. Specializing in high-definition makeup, airbrush makeup, and party glam. Lakme Academy certified professional with international expertise.</p>
        <h2>Top 10 Makeup Artist in Patna Bihar</h2>
        <p>Nancy Mehta offers the most premium makeup experience for brides across Bihar including Patna, Gaya, Muzzafarpur, and Bhagalpur.</p>
      </div>
    </footer>
  );
}
