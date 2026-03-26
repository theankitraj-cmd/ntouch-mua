export type MakeupCategory = 'bridal-makeup' | 'party-makeup' | 'engagement-makeup' | 'hd-airbrush-makeup';

export const portfolioData: Record<MakeupCategory, {
  title: string;
  subtitle: string;
  description: string;
  images: { src: string; alt: string; aspect: "portrait" | "landscape" | "square" }[];
}> = {
  'bridal-makeup': {
    title: 'Bridal Artistry',
    subtitle: 'The Royal Indian Bride',
    description: 'Transforming into a regal bride requires absolute precision and premium artistry. From multi-dimensional eye makeup to a sweat-proof 16-hour base, we ensure you look breathtaking from the pheras to the bidaai.',
    images: [
      { src: '/nancy-mehta-hero-bridal.jpg', alt: 'Signature Bridal Makeup Nancy Mehta', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1200', alt: 'HD Bridal Base', aspect: 'square' },
      { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200', alt: 'Classic Indian Bride Styling', aspect: 'landscape' },
      { src: 'https://images.unsplash.com/photo-1512496015851-a1dc8a477858?q=80&w=1200', alt: 'Reception Glam Bride', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1588513706481-64536f947bba?q=80&w=1200', alt: 'Flawless Airbrush Bridal Makeup', aspect: 'square' },
    ]
  },
  'party-makeup': {
    title: 'Party Glamour',
    subtitle: 'Steal the Limelight',
    description: 'Whether it is a high-profile cocktail night, a sangeet, or a subtle gathering, our Party Glam packages offer the perfect balance of sophistication and modern styling to make you stand out.',
    images: [
      { src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200', alt: 'Heavy Party Glam', aspect: 'landscape' },
      { src: 'https://images.unsplash.com/photo-1516975080661-42bfc1d09e53?q=80&w=1200', alt: 'Soft Party Makeup', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200', alt: 'Sangeet Party Look', aspect: 'square' },
      { src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200', alt: 'Subtle Matte Party Finish', aspect: 'portrait' },
    ]
  },
  'engagement-makeup': {
    title: 'Engagement Ring',
    subtitle: 'Soft, Elegant & Timeless',
    description: 'Your engagement requires a dewy, glowing base that looks naturally luminous. We focus on enhancing your features with soft blush tones, subtle highlighters, and elegant hairstyling.',
    images: [
      { src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200', alt: 'Soft Engagement Look Patna', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1200', alt: 'Pink Tone Engagement Makeup', aspect: 'square' },
      { src: 'https://images.unsplash.com/photo-1588513706481-64536f947bba?q=80&w=1200', alt: 'Natural Glow Makeup', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1512496015851-a1dc8a477858?q=80&w=1200', alt: 'Dewy Engagement Base', aspect: 'landscape' },
    ]
  },
  'hd-airbrush-makeup': {
    title: 'HD & Airbrush',
    subtitle: 'The Ultimate Camera-Ready Finish',
    description: 'HD (High Definition) and Airbrush techniques offer a seamless, poreless, and completely waterproof base. Perfect for 4K cameras, summer weddings, or clients who want zero touch-ups.',
    images: [
      { src: 'https://images.unsplash.com/photo-1588513706481-64536f947bba?q=80&w=1200', alt: 'Airbrush Poreless Finish', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1516975080661-42bfc1d09e53?q=80&w=1200', alt: 'HD Base Makeup Patna', aspect: 'square' },
      { src: '/nancy-mehta-hero-bridal.jpg', alt: 'Waterproof Bridal HD Makeup', aspect: 'portrait' },
      { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1200', alt: 'Camera Ready HD Makeup', aspect: 'landscape' },
    ]
  }
};
