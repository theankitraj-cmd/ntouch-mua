import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { locations, AreaKey } from '../../../lib/locations';

export async function generateStaticParams() {
  return Object.keys(locations).map((area) => ({
    area,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const area = resolvedParams.area || '';
  const areaName = locations[area as AreaKey] || area.replace('-', ' ');
  return {
    title: `Best Bridal Makeup Artist in ${areaName}, Patna | Makeover By Nancy`,
    description: `Looking for the best bridal, HD, or airbrush makeup artist near ${areaName}? Makeover By Nancy provides premium luxury bridal makeup services in ${areaName}, Patna. Book your slot today!`,
    alternates: {
      canonical: `https://ntouchmua.com/locations/${area}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ area: string }> }) {
  const resolvedParams = await params;
  const area = resolvedParams.area || '';
  const areaName = locations[area as AreaKey] || area.replace('-', ' ');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Hyper-Local Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 bg-plum-950 overflow-hidden text-center flex-1 flex flex-col items-center justify-center">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-[-20%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-blush-400/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-400 mb-6 font-medium text-sm md:text-base">
             <MapPin className="w-4 h-4" /> Top Rated Makeup Artist near {areaName}, Patna
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white mb-6 leading-tight">
            Premium Bridal Makeup in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">
              {areaName}
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Makeover By Nancy brings luxury bridal, HD, and airbrush makeup services right to {areaName}. Discover your perfect wedding look with Nancy Mehta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-plum-950 px-8 py-4 rounded-full font-body font-semibold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all w-full sm:w-auto">
              Book Your Date <Calendar className="w-5 h-5" />
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-body font-medium text-lg hover:bg-white/5 transition-all w-full sm:w-auto">
              View Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Hyper-Local Benefits */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
             <Image src="/nancy-mehta-hero-bridal.jpg" alt={`Bridal Makeup in ${areaName}`} fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 to-transparent" />
             <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />)}
                </div>
                <p className="text-white font-display text-xl">"The best makeup experience in {areaName}!"</p>
             </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-display text-plum-950 mb-8">Why Choose Makeover By Nancy for your Wedding in {areaName}?</h2>
            <div className="space-y-6">
              {[
                `Travels directly to your venue in ${areaName} or anywhere in Patna.`,
                `Uses Premium International Brands (NARS, Huda Beauty, MAC, Charlotte Tilbury).`,
                `Lakme Academy Certified with 100+ Happy Brides across Bihar.`,
                `Flawless HD & Airbrush base for a sweat-proof, long-lasting look (12+ hours).`
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-gold-400/20 p-2 rounded-full text-gold-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-lg text-plum-950/80 font-body leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-8 text-center bg-surface border-t border-plum-950/10 text-plum-950/60 font-body">
        <p>&copy; 2025 Makeover By Nancy. Serving {areaName}, Patna and beyond.</p>
      </footer>
    </div>
  );
}
