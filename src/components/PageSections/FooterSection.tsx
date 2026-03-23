"use client";

import React from "react";
import { Instagram, Facebook, Phone, MapPin, Mail, Sparkles, Star, Award, Heart } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative bg-blush-950 overflow-hidden section-optimize">
      <div className="h-px bg-gradient-to-r from-transparent via-blush-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 perf-gpu">
                <img src="/nancy-mehta-hero-bridal.jpg" alt="N.Touch MUA" className="w-full h-full object-cover object-top img-optimize" />
              </div>
              <h2 className="font-display text-2xl text-white tracking-widest uppercase">N.Touch</h2>
            </div>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-8 max-w-sm">
              Creating high-end bridal transformations that blends timeless elegance with modern luxury. Patna's premier destination for exquisite artistry.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-body text-xs font-semibold tracking-widest text-gold-400 uppercase">Explore</h4>
              <nav className="flex flex-col gap-3">
                {["Portfolio", "Services", "About", "Contact"].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white font-body text-sm transition-colors">{link}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-body text-xs font-semibold tracking-widest text-gold-400 uppercase">Services</h4>
              <nav className="flex flex-col gap-3">
                {["Bridal Glam", "Party Makeup", "HD Artistry", "Hair Styling"].map((link) => (
                  <a key={link} href="#services" className="text-white/60 hover:text-white font-body text-sm transition-colors">{link}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-body text-xs font-semibold tracking-widest text-gold-400 uppercase">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-blush-400" />
                </div>
                <a href="tel:+918969184453" className="text-sm font-body hover:text-white transition-colors">+91 89691 84453</a>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blush-400" />
                </div>
                <a href="mailto:nancymehta247@gmail.com" className="text-sm font-body hover:text-white transition-colors">nancymehta247@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blush-400" />
                </div>
                <address className="not-italic text-sm font-body">Patna, Bihar, India</address>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/30 tracking-widest uppercase">
            © 2026 N.Touch MUA. Signature Artistry by Nancy Mehta.
          </p>
          <p className="font-body text-xs text-white/20 tracking-widest uppercase flex items-center gap-2">
            Design & Tech by <span className="text-white/40 hover:text-gold-400 font-bold transition-all cursor-pointer">NEXAFORGE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
