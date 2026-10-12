import type { Metadata } from "next";
import { Shippori_Mincho, Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nailsalon-fraise.vercel.app"),
  title: "表参道のパラジェル・マグネットネイル専門サロン｜Salon de Fraise（サロンドフレーズ）",
  description: "表参道駅徒歩4分。自爪を削らないパラジェル＆高持続フィルイン専門店。3〜4週間綺麗な状態をキープ。50色以上の水光マグネット、上品オフィスネイルから最旬トレンドまで。ハンド2席・フット2席のプライベート空間、無料駐車場3台、ペット・お子様同伴OK。",
  keywords: [
    "表参道 ネイルサロン",
    "原宿 パラジェル",
    "自爪を削らない",
    "水光マグネットネイル",
    "マグネットネイル 50色",
    "フィルイン 一層残し",
    "表参道 ネイル 駐車場あり",
    "ペット同伴 ネイルサロン",
    "子連れ ネイルサロン 表参道"
  ],
  authors: [{ name: "Salon de Fraise" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://nailsalon-fraise.vercel.app",
    siteName: "Salon de Fraise 表参道",
    title: "表参道のパラジェル・マグネットネイル専門サロン｜Salon de Fraise",
    description: "自爪を削らないパラジェル＆高持続フィルイン専門店。50色以上の水光マグネットと洗練された大人空間。24時間Web即時予約受付中。",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Salon de Fraise パラジェル＆水光マグネットネイル",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "表参道のパラジェル・マグネットネイル専門サロン｜Salon de Fraise",
    description: "自爪を削らないパラジェル＆水光マグネットネイル専門店。表参道駅徒歩4分・駐車場3台完備。",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 構造化データ（LocalBusiness / NailSalon）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "name": "Salon de Fraise（サロンドフレーズ）",
    "image": "https://nailsalon-fraise.vercel.app/images/hero.jpg",
    "description": "表参道にある自爪を削らないパラジェル＆水光マグネット専門ネイルサロン。全席リクライニング・ハンド2席・フット2席、お客様専用駐車場3台完備。",
    "telephone": "03-6800-0000",
    "priceRange": "¥6,050 - ¥9,900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "神宮前4丁目12-10 メゾン・ド・フレーズ 2F",
      "addressLocality": "渋谷区",
      "addressRegion": "東京都",
      "postalCode": "150-0001",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.6672,
      "longitude": 139.7100
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "自爪を削らないパラジェル認定店", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "水光マグネット50色完備", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "お客様専用無料駐車場3台", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "ペット同伴可", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "お子様連れ可・ベビーカーOK", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "カフェドリンクサービス無料", "value": true }
    ],
    "url": "https://nailsalon-fraise.vercel.app"
  };

  return (
    <html lang="ja" className={`${shippori.variable} ${cormorant.variable} ${notoSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-lavender-200 selection:text-plum-900 overflow-x-hidden">
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
