import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { HOURS, SITE, formatTime24 } from "./site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const title = `${SITE.name} | ${SITE.tagline}`;

export const metadata: Metadata = {
  ...(SITE.url && { metadataBase: new URL(SITE.url), alternates: { canonical: SITE.url } }),
  title,
  description: SITE.description,
  keywords: ["coffee shop", "specialty coffee", "cafe", "cycling", "running", "outdoors", "Malaybalay City", "Bukidnon", "Philippines"],
  authors: [{ name: SITE.name }],
  openGraph: {
    title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A biscuit being dipped into a latte at altitude.cc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: SITE.name,
    description: SITE.description,
    ...(SITE.url && { url: SITE.url, hasMenu: `${SITE.url}#menu` }),
    telephone: SITE.phone.replaceAll(" ", "-"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.province,
      addressCountry: "PH"
    },
    geo: {
      "@type": "GeoCoordinates",
      ...SITE.geo
    },
    openingHoursSpecification: HOURS.filter((h) => h.open !== null).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: formatTime24(h.open as number),
      closes: formatTime24(h.close as number)
    })),
    sameAs: [SITE.facebook, SITE.instagram],
    priceRange: "$$",
    servesCuisine: "Coffee"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
