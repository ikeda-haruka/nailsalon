import type { Metadata } from "next";
import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingReservationBar from "@/components/FloatingReservationBar";

const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salon de Fraise (サロンドフレーズ) | パラジェル＆水光マグネット専門ネイルサロン",
  description: "削らない自爪に優しいパラジェル専門店。丁寧なケアとフィルイン技術で3〜4週間綺麗な状態をキープ。50種類以上の水光マグネットカラーや季節のデザイン、大人可愛いイチゴミルクトーンの癒やし空間。ハンド2席・フット2席、お客様駐車場3台完備。ペット・お子様同伴OK。",
  keywords: ["パラジェル", "フィルイン", "ネイルサロン", "マグネットネイル", "水光マグネット", "イチゴミルク", "春ネイル", "夏ネイル", "秋ネイル", "冬ネイル", "オフィスネイル"],
  openGraph: {
    title: "Salon de Fraise | パラジェル＆水光マグネット専門ネイルサロン",
    description: "自爪を削らず守るパラジェルと、50種以上の水光マグネット。大人可愛いイチゴミルク空間で極上のネイル体験を。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${shippori.variable} ${notoSans.variable}`}>
      <body className="antialiased selection:bg-[#ffb3c6] selection:text-[#3a2b2c]">
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
