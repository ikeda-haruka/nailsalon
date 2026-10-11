"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Menu, X, Heart, MessageCircle, Phone } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "コンセプト", href: "#concept" },
    { name: "デザイン一覧", href: "#gallery" },
    { name: "メニュー・料金", href: "#menu" },
    { name: "スタッフ紹介", href: "#staff" },
    { name: "サロン設備・案内", href: "#salon-info" },
    { name: "空席・ご予約", href: "#reservation" },
    { name: "採用情報", href: "#recruit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-[#ffe3e9]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff758f] to-[#ffb3c6] flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#3a2b2c]">
                  Salon de Fraise
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#ffe5ec] text-[#e8436e] font-medium hidden sm:inline-block">
                  パラジェル専門
                </span>
              </div>
              <p className="text-[10px] text-[#8c7374] tracking-wider font-sans">
                サロンドフレーズ 表参道・原宿
              </p>
            </div>
          </Link>

          {/* デスクトップ ナビゲーション */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#5e4748] hover:text-[#e8436e] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff758f] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* 予約・CTAボタン群 */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={SALON_INFO.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-[#06C755]/10 text-[#06C755] hover:bg-[#06C755]/20 transition-all border border-[#06C755]/30"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755]" />
              <span>公式LINEクーポン</span>
            </a>

            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="strawberry-button flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full"
            >
              <Calendar className="w-4 h-4" />
              <span>即時予約・空席確認</span>
            </a>
          </div>

          {/* モバイルメニュー切り替えボタン */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={SALON_INFO.links.hotpepper}
              className="strawberry-button text-xs px-3 py-1.5 rounded-full font-medium sm:hidden flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>予約</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#5e4748] hover:text-[#e8436e] hover:bg-[#ffe5ec] focus:outline-none transition-colors"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルドロワーメニュー */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#ffe3e9] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-[#ffe3e9] flex items-center justify-between">
              <span className="text-xs text-[#8c7374]">営業時間 10:00〜20:00（不定休・連休営業）</span>
              <span className="text-xs text-[#e8436e] font-semibold">駐車場3台完備</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#3a2b2c] hover:text-[#e8436e] py-1 border-b border-pink-50"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="strawberry-button w-full text-center py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>HOT PEPPER Beauty で予約・空席を見る</span>
              </a>
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-full font-bold text-sm bg-[#06C755] text-white flex items-center justify-center gap-2 hover:bg-[#05b34c] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINEで限定クーポン・回数券を取得</span>
              </a>
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full text-center py-2.5 rounded-full font-medium text-xs bg-[#ffe5ec] text-[#3a2b2c] flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#e8436e]" />
                <span>お電話でのお問い合わせ: {SALON_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
