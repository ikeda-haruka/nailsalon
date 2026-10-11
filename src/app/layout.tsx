import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingReservationBar from "@/components/FloatingReservationBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Salon de Fraise | パラジェル＆水光マグネットネイル専門店",
  description: "削らない自爪に優しいパラジェル専門店。丁寧なケアとフィルイン技術で3〜4週間綺麗な状態をキープ。50種類以上の水光マグネットカラーや季節のデザイン、大人可愛いイチゴミルク空間。ハンド2席・フット2席、お客様駐車場3台完備。ペット・お子様同伴OK。",
  keywords: ["パラジェル", "フィルイン", "ネイルサロン", "水光マグネット", "マグネットネイル", "イチゴミルク", "オフィスネイル"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${jakarta.variable} ${playfair.variable} ${notoSans.variable}`}>
      <body className="antialiased selection:bg-[#ff85a1] selection:text-white">
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
