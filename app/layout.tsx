import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Altitude PH - Fuel Your Adventure",
  description: "Where great coffee meets outdoor passion. Your pit stop for cycling, running, and unforgettable outdoor experiences.",
  keywords: ["coffee shop", "cycling", "running", "outdoor sports", "cafe", "Quezon City", "Philippines", "specialty coffee"],
  authors: [{ name: "Altitude PH" }],
  openGraph: {
    title: "Altitude PH - Fuel Your Adventure",
    description: "Where great coffee meets outdoor passion. Your pit stop for cycling, running, and unforgettable outdoor experiences.",
    url: "https://altitudeph.com",
    siteName: "Altitude PH",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/logo_white.png",
        width: 1200,
        height: 630,
        alt: "Altitude PH - Coffee and Outdoor Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altitude PH - Fuel Your Adventure",
    description: "Where great coffee meets outdoor passion. Your pit stop for cycling, running, and unforgettable outdoor experiences.",
    images: ["/logo_white.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://altitudeph.com",
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
    name: "Altitude PH",
    description: "Where great coffee meets outdoor passion. Your pit stop for cycling, running, and unforgettable outdoor experiences.",
    url: "https://altitudeph.com",
    telephone: "+63-XXX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street",
      addressLocality: "Quezon City",
      addressRegion: "Metro Manila",
      postalCode: "1100",
      addressCountry: "PH"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.6760,
      longitude: 121.0437
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "14:00",
        closes: "19:00"
      }
    ],
    sameAs: [
      "https://www.facebook.com/altitudecoffeeph",
      "https://www.instagram.com/altitudecoffeeph"
    ],
    priceRange: "$$",
    servesCuisine: "Coffee",
    hasMenu: "https://altitudeph.com#menu"
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
