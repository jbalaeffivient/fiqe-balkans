import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Balkan Peaks ADV | Guided Hiking Adventures in Kosovo",
  description: "Small-group guided hiking adventures across Kosovo, Albania and Montenegro. Discover the Peaks of the Balkans with expert local guides.",
  keywords: ["Peaks of the Balkans", "Kosovo hiking tours", "Albania hiking", "Balkans adventure travel", "Balkan Peaks ADV"],
  openGraph: {
    title: "Walk Beyond the Known | Balkan Peaks ADV",
    description: "Europe's wildest mountain journey, guided by the people who call it home.",
    type: "website",
  },
  icons: { icon: "/logo-bpadv-02.svg", shortcut: "/logo-bpadv-02.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Balkan Peaks ADV",
    description: "Premium small-group hiking adventures in Kosovo, Albania and Montenegro.",
    address: { "@type": "PostalAddress", addressLocality: "Pejë", addressCountry: "XK" },
    areaServed: ["Kosovo", "Albania", "Montenegro"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
  };
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {children}
      </body>
    </html>
  );
}
