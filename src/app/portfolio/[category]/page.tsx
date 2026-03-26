import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { portfolioData, MakeupCategory } from '../../../lib/portfolio-categories';

export async function generateStaticParams() {
  return Object.keys(portfolioData).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category as MakeupCategory;
  const data = portfolioData[category];

  if (!data) return { title: 'Portfolio Not Found' };

  return {
    title: `Best ${data.title} Artist in Patna | Makeover By Nancy`,
    description: data.description,
    alternates: {
      canonical: `https://ntouchmua.com/portfolio/${category}`,
    }
  };
}

export default async function PortfolioCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category as MakeupCategory;
  const data = portfolioData[category];

  if (!data) {
    return <div className="min-h-screen items-center justify-center flex text-plum-950 font-display text-2xl">Category Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Cinematic Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-plum-950 overflow-hidden flex flex-col items-center text-center">
        {/* Light Leaks / Aura Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blush-400/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-gold-400 mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" /> {data.subtitle}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8 tracking-tight drop-shadow-lg">
            {data.title}
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Magazine Style Masonry Gallery */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {data.images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-3xl overflow-hidden break-inside-avoid shadow-2xl group
                ${img.aspect === 'portrait' ? 'aspect-[3/4]' : img.aspect === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'}
              `}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Floating CTA embedded section */}
      <section className="py-24 bg-blush-50 px-6 text-center border-t border-plum-950/10">
        <h2 className="font-display text-4xl md:text-6xl text-plum-950 mb-6 font-light">Ready to steal the spotlight?</h2>
        <p className="font-body text-lg md:text-xl text-plum-950/70 mb-10 max-w-xl mx-auto">
          Secure your dates for {data.title.toLowerCase()} before our calendar is fully booked.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-plum-900 to-plum-950 text-gold-400 px-10 py-5 rounded-full font-body font-semibold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all w-full sm:w-auto">
            Book Appointment <Calendar className="w-5 h-5" />
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 border border-plum-950/20 text-plum-950 px-10 py-5 rounded-full font-body font-medium text-lg hover:bg-plum-950/5 transition-all w-full sm:w-auto">
            Back to Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-8 text-center bg-surface text-plum-950/60 font-body border-t border-plum-950/10">
        <p>&copy; 2025 Makeover By Nancy. Best {data.title} Artist in Patna.</p>
      </footer>
    </main>
  );
}
