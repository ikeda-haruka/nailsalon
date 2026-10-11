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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Concept", jp: "こだわり", href: "#concept" },
    { name: "Designs", jp: "デザイン", href: "#gallery" },
    { name: "Magnet Lab", jp: "水光体験", href: "#magnet-lab" },
    { name: "Menu", jp: "料金", href: "#menu" },
    { name: "Staff", jp: "スタッフ", href: "#staff" },
    { name: "Salon Info", jp: "サロン案内", href: "#salon-info" },
    { name: "Recruit", jp: "採用", href: "#recruit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl py-3 border-b border-pink-100 shadow-[0_4px_25px_rgba(255,105,180,0.08)]"
          : "bg-white/40 backdrop-blur-md py-4 sm:py-5 border-b border-white/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff3366] via-[#ff758f] to-[#ffb3c6] flex items-center justify-center text-white shadow-md shadow-pink-300/50 group-hover:scale-105 transition-transform relative overflow-hidden">
              <Sparkles className="w-5 h-5 text-white animate-twinkle-fast" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#2c181b]">
                  Salon de Fraise
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff3366] text-white font-extrabold tracking-wider shadow-sm hidden sm:inline-block">
                  PARAGEL
                </span>
              </div>
              <p className="text-[10px] text-[#ff6584] font-semibold tracking-widest uppercase">
                Paragel & Water-Glow Magnet Salon
              </p>
            </div>
          </Link>

          {/* デスクトップ ナビゲーション */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex flex-col items-center text-xs font-semibold text-[#5e4748] hover:text-[#ff3366] transition-colors py-1"
              >
                <span className="font-serif tracking-wider text-sm font-bold text-[#2c181b] group-hover:text-[#ff3366] transition-colors">
                  {link.name}
                </span>
                <span className="text-[9px] text-[#a08587] group-hover:text-[#ff6584] transition-colors font-medium">
                  {link.jp}
                </span>
              </a>
            ))}
          </nav>

          {/* 予約・CTAボタン群 */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={SALON_INFO.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-full bg-white text-[#06C755] border border-[#06C755]/30 hover:bg-[#06C755]/10 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-[#06C755]/20 text-[#06C755]" />
              <span>LINEクーポン</span>
            </a>

            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="jelly-button flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full"
            >
              <Calendar className="w-4 h-4" />
              <span>即時予約・空席</span>
            </a>
          </div>

          {/* モバイルトグル */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={SALON_INFO.links.hotpepper}
              className="jelly-button text-xs px-3.5 py-2 rounded-full font-bold sm:hidden flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>予約</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2c181b] bg-white/80 border border-pink-100 hover:bg-pink-50 transition-colors"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff3366]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-pink-100 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <div className="pb-3 border-b border-pink-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#5e4748]">10:00〜20:00（不定休・連休営業）</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#ff3366]">駐車場3台完備</span>
            </div>

            <div className="grid grid-cols-2 gap-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-pink-50/50 hover:bg-pink-100/70 border border-pink-100/60 text-left transition-all"
                >
                  <span className="block font-serif font-bold text-sm text-[#2c181b]">{link.name}</span>
                  <span className="text-[10px] text-[#ff6584] font-medium">{link.jp}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="jelly-button w-full text-center py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>HOT PEPPER Beauty で空席確認・予約</span>
              </a>
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-full font-bold text-xs bg-[#06C755] text-white flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINE限定クーポン・回数券</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
