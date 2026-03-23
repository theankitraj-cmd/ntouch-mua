import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N.Touch MUA | Nancy Mehta — Best Makeup Artist in Patna, Bihar",
  description:
    "Nancy Mehta is Patna's top-rated Lakme Academy certified makeup artist. Specializing in bridal makeup, party glam, HD & airbrush makeup, editorial looks, and skincare. Serving Patna, Bihar and nearby cities. Book your luxury makeup transformation today.",
  keywords: [
    "makeup artist Patna",
    "best makeup artist in Patna",
    "bridal makeup Patna",
    "bridal makeup artist Bihar",
    "Patna makeup artist",
    "Nancy Mehta makeup artist",
    "N.Touch MUA",
    "Lakme certified makeup artist Patna",
    "Bihar wedding makeup",
    "party makeup Patna",
    "HD makeup Patna",
    "airbrush makeup Patna",
    "best bridal makeup artist Bihar",
    "makeup artist near me Patna",
    "wedding makeup artist Patna Bihar",
    "engagement makeup Patna",
    "reception makeup Bihar",
    "editorial makeup artist Patna",
    "professional makeup artist Patna",
    "luxury makeup artist Bihar",
    "skincare specialist Patna",
    "makeup artist for wedding Patna",
    "freelance makeup artist Patna",
    "top makeup artist Bihar",
    "Miss Universe makeup artist",
    "celebrity makeup artist Patna",
  ],
  openGraph: {
    title: "N.Touch MUA | Nancy Mehta — Best Makeup Artist in Patna, Bihar",
    description:
      "Lakme Academy certified. Bridal, party, HD & airbrush makeup specialist in Patna, Bihar. As seen at Miss Universe 2025 & The Cover Girl Event. Book now!",
    type: "website",
    locale: "en_IN",
    siteName: "N.Touch MUA",
    images: [
      {
        url: "/og-nancy-mehta-ntouch-mua.png",
        width: 1200,
        height: 630,
        alt: "N.Touch MUA - Nancy Mehta - Lakme Certified Makeup Artist Patna Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "N.Touch MUA | Nancy Mehta — Best Makeup Artist in Patna",
    description:
      "Lakme certified bridal & editorial makeup artist in Patna, Bihar. 100+ happy brides. Book your transformation!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ntouchmua.com",
  },
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Patna",
    "geo.position": "25.6093;85.1376",
    "ICBM": "25.6093, 85.1376",
    "og:locality": "Patna",
    "og:region": "Bihar",
    "og:country-name": "India",
  },
};

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": "https://ntouchmua.com/#business",
      name: "N.Touch MUA — Nancy Mehta",
      alternateName: "Best Bridal Makeup Artist in Patna - N.Touch MUA",
      description:
        "Nancy Mehta is the best bridal makeup artist in Patna, Bihar. Lakme Academy certified and specializing in luxury bridal makeup, HD makeup, airbrush makeup, and editorial looks. Top-rated wedding makeup artist in Patna.",
      url: "https://ntouchmua.com",
      telephone: "+918969184453",
      email: "nancymehta247@gmail.com",
      image: "https://ntouchmua.com/nancy-mehta-hero-bridal.jpg",
      priceRange: "₹₹-₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Boring Road / Kankarbagh Area",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.6093,
        longitude: 85.1376,
      },
      areaServed: [
        { "@type": "City", name: "Patna" },
        { "@type": "City", name: "Gaya" },
        { "@type": "City", name: "Muzaffarpur" },
        { "@type": "City", name: "Bhagalpur" },
        { "@type": "City", name: "Darbhanga" },
        { "@type": "City", name: "Ara" },
        { "@type": "City", name: "Nalanda" },
        { "@type": "State", name: "Bihar" },
        { "@type": "State", name: "Jharkhand" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
      sameAs: [
        "https://instagram.com/n.touchmua",
        "https://facebook.com/ntouchmua",
        "https://wa.me/918969184453",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Shristi" },
          datePublished: "2025-06-15",
          reviewBody:
            "Nancy made all my wildest dreams come true! Best makeup for my bachelorette party. I felt unstoppable!",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Ankita" },
          datePublished: "2025-07-20",
          reviewBody:
            "Nancy has impeccable taste and insane vision. She elevated my features flawlessly. Pure artistry!",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Kalash" },
          datePublished: "2025-08-10",
          reviewBody:
            "She gave me a signature glow that felt completely me but elevated to perfection. Never felt so beautiful!",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Makeup Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bridal Makeup",
              description:
                "Complete bridal makeup package with HD/Airbrush base, 3D eye makeup, hairstyling, saree draping, and skin prep. Lasts 16+ hours.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Party & Reception Makeup",
              description:
                "Glamorous party makeup for receptions, engagements, and special events in Patna.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HD & Airbrush Makeup",
              description:
                "High-definition and airbrush makeup for camera-ready, flawless finish.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Editorial & Photoshoot Makeup",
              description:
                "Professional editorial and photoshoot makeup for magazines, portfolios, and fashion shows.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Skincare & Facials",
              description:
                "Professional skincare treatments including cleansing, exfoliation, and hydration facials.",
            },
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": "https://ntouchmua.com/#person",
      name: "Nancy Mehta",
      jobTitle: "Professional Makeup Artist",
      description:
        "Lakme Academy certified makeup artist with 2 years of experience. Has worked at Miss Universe 2025 and The Cover Girl Event. Based in Patna, Bihar.",
      url: "https://ntouchmua.com",
      image: "https://ntouchmua.com/nancy-mehta-hero-bridal.jpg",
      telephone: "+918969184453",
      email: "nancymehta247@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Lakme Academy",
      },
      knowsAbout: [
        "Bridal Makeup",
        "HD Makeup",
        "Airbrush Makeup",
        "Editorial Makeup",
        "Skincare",
        "Saree Draping",
        "Party Makeup",
        "Stage Makeup",
      ],
      award: [
        "Lakme Academy Certification 2025",
        "Makeup Helper at Miss Universe 2025",
        "Makeup Helper at The Cover Girl Event 2025",
      ],
      worksFor: {
        "@type": "BeautySalon",
        name: "N.Touch MUA",
      },
      sameAs: [
        "https://instagram.com/n.touchmua",
        "https://facebook.com/ntouchmua",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ntouchmua.com/#website",
      url: "https://ntouchmua.com",
      name: "N.Touch MUA — Nancy Mehta",
      description: "Best Bridal Makeup Artist in Patna, Bihar",
      publisher: {
        "@id": "https://ntouchmua.com/#person",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ntouchmua.com/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ntouchmua.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://ntouchmua.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Meet Nancy Mehta",
          item: "https://ntouchmua.com/nancy-mehta",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Portfolio",
          item: "https://ntouchmua.com/#portfolio",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is the best makeup artist in Patna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nancy Mehta (N.Touch MUA) is one of the best makeup artists in Patna, Bihar. She is Lakme Academy certified and has experience working at prestigious events like Miss Universe 2025 and The Cover Girl Event.",
          },
        },
        {
          "@type": "Question",
          name: "How much does bridal makeup cost in Patna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bridal makeup costs in Patna vary based on the package. N.Touch MUA offers premium bridal packages that include HD/Airbrush base, 3D eye makeup, hairstyling, saree draping, and complete skin prep. Contact Nancy Mehta at +91 89691 84453 for detailed pricing.",
          },
        },
        {
          "@type": "Question",
          name: "Does Nancy Mehta provide makeup services outside Patna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Nancy Mehta travels to nearby cities in Bihar and Jharkhand including Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Ara, Nalanda, and Ranchi for bridal and event makeup.",
          },
        },
        {
          "@type": "Question",
          name: "What types of makeup services does N.Touch MUA offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "N.Touch MUA offers bridal makeup, party & reception makeup, HD & airbrush makeup, editorial & photoshoot makeup, engagement makeup, skincare & facials, saree draping, and traditional styling services in Patna, Bihar.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600&family=Great+Vibes&family=Anton&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
