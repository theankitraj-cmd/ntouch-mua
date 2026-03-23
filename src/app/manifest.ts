import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "N.Touch MUA | Nancy Mehta",
    short_name: "N.Touch MUA",
    description: "Best Bridal Makeup Artist in Patna, Bihar. Lakme Academy Certified.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F8",
    theme_color: "#4E0B2F",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
