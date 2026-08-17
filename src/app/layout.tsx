import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { business } from "@/lib/constants";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "SIMETRI COFFEE ROASTERS | Coffee Shop Bekasi", template: "%s | SIMETRI COFFEE ROASTERS" },
  description: "SIMETRI COFFEE ROASTERS adalah coffee shop di Bekasi dengan ambience nyaman, kopi berkualitas, tempat kerja, meeting, dan reservasi meja.",
  openGraph: {
    title: "SIMETRI COFFEE ROASTERS | Coffee Shop Bekasi",
    description: "Coffee shop premium di Bekasi untuk kopi, kerja, meeting, dan reservasi meja.",
    images: ["/images/background-main-page.png"],
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.name,
    address: business.address,
    telephone: business.phone,
    priceRange: business.priceRange,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", reviewCount: "2522" },
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [business.instagramUrl]
  };
  return (
    <html lang="id">
      <body className={dmSans.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
