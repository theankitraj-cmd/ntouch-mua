import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N.Touch MUA | Nancy Mehta — Luxury Makeup Artist, Patna",
  description:
    "Lakme Academy certified makeup artist specializing in bridal, party, and editorial looks. Book your transformation with Nancy Mehta in Patna, Bihar.",
  keywords: [
    "makeup artist",
    "bridal makeup",
    "Patna makeup artist",
    "Nancy Mehta",
    "N.Touch MUA",
    "Lakme certified",
    "Bihar wedding makeup",
  ],
  openGraph: {
    title: "N.Touch MUA | Nancy Mehta — Luxury Makeup Artist",
    description:
      "Transform with Nancy Mehta. Lakme Academy certified. Bridal, party & editorial looks in Patna, Bihar.",
    type: "website",
  },
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
