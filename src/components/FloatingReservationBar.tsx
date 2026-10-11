"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MessageCircle, Phone, Sparkles, ChevronUp } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function FloatingReservationBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* ページトップボタン */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="ページトップへ戻る"
          className="fixed bottom-24 right-4 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-[#ff3366] shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* フローティングCTAバー */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-xl border-t border-white/60 py-2.5 px-4 shadow-[0_-8px_30px_rgba(255,51,102,0.15)] animate-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-black text-[#2c181b] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ff3366]" />
              リアルタイム空席受付中（24h即時予約OK）
            </span>
            <span className="text-[10px] text-[#ff6584] font-bold">
              10:00〜20:00 / 不定休（GW・お盆・SW休まず営業中）
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* LINEクーポン */}
            <a
              href={SALON_INFO.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white text-xs font-bold shadow-md transition-all hover:scale-102"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">LINEクーポン</span>
            </a>

            {/* HOT PEPPER Beauty */}
            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="jelly-button flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 sm:px-7 py-2.5 rounded-full text-xs font-bold shadow-xl"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">空席確認・即時予約</span>
            </a>

            {/* 電話 */}
            <a
              href={`tel:${SALON_INFO.phone}`}
              aria-label="電話する"
              className="w-10 h-10 rounded-full bg-pink-100/80 text-[#ff3366] flex items-center justify-center hover:bg-pink-200 transition-all shrink-0 shadow-xs"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
