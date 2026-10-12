import type { Metadata } from "next";
import { Shippori_Mincho, Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingReservationBar from "@/components/FloatingReservationBar";

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
  title: "Salon de Fraise | パラジェル＆水光マグネットネイル専門店",
  description: "削らない自爪に優しいパラジェル専門店。丁寧なケアとフィルイン技術で3〜4週間綺麗な状態をキープ。50種類以上の水光マグネットカラーや季節のデザイン、白・ラベンダー・ゴールドが織りなす洗練された大人空間。ハンド2席・フット2席、お客様駐車場3台完備。ペット・お子様同伴OK。",
  keywords: ["パラジェル", "フィルイン", "ネイルサロン", "水光マグネット", "マグネットネイル", "表参道ネイル", "オフィスネイル"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${shippori.variable} ${cormorant.variable} ${notoSerif.variable}`}>
      <body className="antialiased selection:bg-lavender-200 selection:text-plum-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingReservationBar />
      </body>
    </html>
  );
}
