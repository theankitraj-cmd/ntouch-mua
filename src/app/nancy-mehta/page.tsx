import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Nancy Mehta — Professional Makeup Artist in Patna, Bihar | N.Touch — Professional Makeup Artist in Patna",
  description:
    "Nancy Mehta is a Lakme Academy certified professional makeup artist based in Patna, Bihar. Specializing in bridal, HD, airbrush, and editorial makeup. Known for her work at Miss Universe 2025 and The Cover Girl Event. Book your appointment today.",
  keywords: [
    "Nancy Mehta",
    "Nancy Mehta makeup artist",
    "Nancy Mehta Patna",
    "who is Nancy Mehta",
    "N.Touch — Professional Makeup Artist in Patna",
    "Nancy Mehta bridal makeup",
    "Nancy Mehta Miss Universe",
    "best makeup artist Patna",
    "Lakme certified Patna",
    "makeup artist Bihar",
    "Nancy Mehta portfolio",
    "Nancy Mehta contact",
    "Nancy Mehta reviews",
  ],
  openGraph: {
    title: "Nancy Mehta — Professional Makeup Artist in Patna | N.Touch — Professional Makeup Artist in Patna",
    description:
      "Lakme Academy certified. Bridal, HD & airbrush makeup specialist. As seen at Miss Universe 2025. Based in Patna, Bihar.",
    type: "profile",
    locale: "en_IN",
    images: [
      {
        url: "/nancy-mehta-makeup-artist-patna-bihar.jpg",
        width: 600,
        height: 800,
        alt: "Nancy Mehta - Professional Makeup Artist Patna Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nancy Mehta — Best Makeup Artist in Patna, Bihar",
    description:
      "Lakme certified. Miss Universe 2025 experience. 100+ happy brides. Book now!",
    images: ["/nancy-mehta-makeup-artist-patna-bihar.jpg"],
  },
  alternates: {
    canonical: "https://ntouchmua.com/nancy-mehta",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://ntouchmua.com/#person",
    name: "Nancy Mehta",
    alternateName: ["N.Touch — Professional Makeup Artist in Patna", "Nancy Mehta — Best Bridal Makeup Artist in Patna", "Nancy Mehta Makeup Artist"],
    jobTitle: "Professional Makeup Artist",
    description:
      "Nancy Mehta, professionally known as N.Touch — Professional Makeup Artist in Patna, is a Lakme Academy certified makeup artist based in Patna, Bihar. She has 2+ years of professional experience and has worked at Miss Universe 2025 and The Cover Girl Event 2025.",
    url: "https://ntouchmua.com/nancy-mehta",
    image: "https://ntouchmua.com/nancy-mehta-makeup-artist-patna-bihar.jpg",
    telephone: "+918969184453",
    email: "nancymehta247@gmail.com",
    birthPlace: { "@type": "Place", name: "Bihar, India" },
    nationality: { "@type": "Country", name: "India" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800001",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lakme Academy",
      url: "https://lakmeacademy.co.in",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "Lakme Academy Certification in Makeup Artistry & Skincare",
      recognizedBy: {
        "@type": "Organization",
        name: "Lakme Academy",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Makeup Artist",
      occupationLocation: {
        "@type": "City",
        name: "Patna",
      },
      skills: "Bridal Makeup, HD Makeup, Airbrush Makeup, Editorial Makeup, Skincare, Saree Draping, Party Makeup, Stage Makeup",
    },
    knowsAbout: [
      "Bridal Makeup",
      "HD Makeup",
      "Airbrush Makeup",
      "Editorial Makeup",
      "Skincare & Facials",
      "Saree Draping",
      "Party & Reception Makeup",
      "Stage & Event Makeup",
      "Traditional Indian Makeup",
      "Camera-Ready Makeup",
    ],
    award: [
      "Lakme Academy Certified Makeup Artist & Skincare Specialist (2025)",
      "Makeup Helper — Miss Universe 2025 Pageant",
      "Makeup Helper — The Cover Girl Event 2025",
    ],
    memberOf: {
      "@type": "Organization",
      name: "N.Touch — Professional Makeup Artist in Patna",
      url: "https://ntouchmua.com",
    },
    worksFor: {
      "@type": "BeautySalon",
      name: "N.Touch — Professional Makeup Artist in Patna",
      url: "https://ntouchmua.com",
    },
    sameAs: [
      "https://ntouchmua.com",
      "https://instagram.com/n.touchmua",
      "https://facebook.com/ntouchmua",
      "https://wa.me/918969184453",
    ],
  },
  dateCreated: "2025-01-01",
  dateModified: new Date().toISOString().split("T")[0],
};

export default function NancyMehtaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FFF8F8]">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#4E0B2F] via-[#8B2252] to-[#D4456B] py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 50%, rgba(212,175,55,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,176,202,0.2), transparent 50%)",
              }}
            />
          </div>
          <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
              <img
                src="/nancy-mehta-makeup-artist-patna-bihar.jpg"
                alt="Nancy Mehta - Best Makeup Artist in Patna Bihar"
                className="w-full h-full object-cover"
                width={600}
                height={800}
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/60 mb-3">
                Lakme Academy Certified
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Nancy Mehta
              </h1>
              <p className="text-base md:text-lg text-white/70 mb-6 max-w-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Professional Makeup Artist & Skincare Specialist — Patna, Bihar
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs text-white/60 tracking-wider uppercase">
                  Miss Universe 2025
                </span>
                <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs text-white/60 tracking-wider uppercase">
                  Cover Girl Event
                </span>
                <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs text-white/60 tracking-wider uppercase">
                  100+ Happy Brides
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Nancy Mehta — Full SEO Content */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <article itemScope itemType="https://schema.org/Article">
              <h2
                className="text-3xl md:text-4xl font-light text-[#2E131E] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                itemProp="headline"
              >
                Who is <span className="italic" style={{ color: "#D4456B" }}>Nancy Mehta</span>?
              </h2>

              <div className="prose prose-lg max-w-none" style={{ fontFamily: "'Outfit', sans-serif", color: "#584144", lineHeight: "1.8" }} itemProp="articleBody">
                <p>
                  <strong style={{ color: "#2E131E" }}>Nancy Mehta</strong>, professionally known as <strong style={{ color: "#2E131E" }}>N.Touch — Professional Makeup Artist in Patna</strong>, is one of the most sought-after makeup artists in Patna, Bihar. A Lakme Academy certified Makeup Artist and Skincare Specialist, Nancy brings over 2 years of dedicated professional experience in the beauty and fashion industry.
                </p>

                <p>
                  Nancy gained national recognition through her remarkable work at two of India&apos;s most prestigious beauty events — the <strong style={{ color: "#2E131E" }}>Miss Universe 2025</strong> pageant and <strong style={{ color: "#2E131E" }}>The Cover Girl Event 2025</strong>. At these events, she worked as a makeup helper, delivering camera-ready, flawless makeup and skincare treatments to contestants under high-pressure, time-sensitive environments.
                </p>

                <h3 className="text-xl font-medium mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2E131E" }}>
                  Expertise & Services
                </h3>
                <p>
                  Nancy specializes in a comprehensive range of beauty services tailored for every occasion. Her core expertise includes:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                  <li><strong>Bridal Makeup</strong> — Complete bridal packages with HD/Airbrush base, 3D eye makeup, hairstyling, and saree draping for the perfect wedding day look.</li>
                  <li><strong>HD & Airbrush Makeup</strong> — High-definition and airbrush techniques for a flawless, camera-ready, long-lasting finish.</li>
                  <li><strong>Party & Reception Makeup</strong> — Glamorous looks for receptions, engagements, and special celebrations.</li>
                  <li><strong>Editorial & Photoshoot Makeup</strong> — Professional-grade makeup for fashion shoots, portfolios, and magazine features.</li>
                  <li><strong>Skincare & Facials</strong> — Specialized skincare treatments including deep cleansing, exfoliation, and hydration facials.</li>
                  <li><strong>Saree Draping & Traditional Styling</strong> — Expert traditional Indian styling for a complete, polished look.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2E131E" }}>
                  Service Areas in Bihar & Jharkhand
                </h3>
                <p>
                  Based in Patna, Nancy serves clients across Bihar and Jharkhand. She is available for on-location bookings in <strong>Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Ara, Nalanda, Ranchi</strong>, and surrounding areas. Whether it&apos;s a grand palace wedding or an intimate home ceremony, Nancy brings her full professional setup to your doorstep.
                </p>

                <h3 className="text-xl font-medium mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2E131E" }}>
                  Why Choose Nancy Mehta?
                </h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                  <li><strong>Lakme Academy Certified</strong> — Trained and certified by India&apos;s premier beauty academy.</li>
                  <li><strong>Miss Universe 2025 Experience</strong> — Hands-on experience at India&apos;s highest level of beauty pageantry.</li>
                  <li><strong>100+ Happy Clients</strong> — A proven track record of delighted brides and clients across Bihar.</li>
                  <li><strong>Impeccable Hygiene Standards</strong> — Uses sanitized, premium tools and products for every client.</li>
                  <li><strong>Punctual & Professional</strong> — Known for strict time management and seamless on-site execution.</li>
                  <li><strong>Personalized Approach</strong> — Every look is customized to enhance each client&apos;s unique beauty and personality.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2E131E" }}>
                  Contact Nancy Mehta
                </h3>
                <p>
                  Ready to book your transformation? Get in touch with Nancy today:
                </p>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  <li>📱 <strong>Phone / WhatsApp:</strong> <a href="tel:+918969184453" style={{ color: "#D4456B" }}>+91 89691 84453</a></li>
                  <li>📧 <strong>Email:</strong> <a href="mailto:nancymehta247@gmail.com" style={{ color: "#D4456B" }}>nancymehta247@gmail.com</a></li>
                  <li>🌐 <strong>Website:</strong> <a href="https://ntouchmua.com" style={{ color: "#D4456B" }}>ntouchmua.com</a></li>
                  <li>📸 <strong>Instagram:</strong> <a href="https://instagram.com/n.touchmua" style={{ color: "#D4456B" }}>@n.touchmua</a></li>
                </ul>
              </div>
            </article>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm tracking-widest uppercase font-medium shadow-lg transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4456B, #8B2252)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Book Your Appointment
              </Link>
              <p className="mt-4 text-sm" style={{ color: "#584144", fontFamily: "'Outfit', sans-serif" }}>
                Or call directly: <a href="tel:+918969184453" className="underline" style={{ color: "#D4456B" }}>+91 89691 84453</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
