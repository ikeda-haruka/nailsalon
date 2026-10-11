"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MessageCircle, Phone, Sparkles, ChevronUp } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function FloatingReservationBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 100pxスクロールしたら表示
      setIsVisible(window.scrollY > 100);
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
      {/* ページトップへ戻るボタン */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="ページトップへ戻る"
          className="fixed bottom-24 right-4 z-40 w-11 h-11 rounded-full bg-white/90 border border-[#ffb3c6] text-[#e8436e] shadow-lg flex items-center justify-center hover:bg-[#ffe5ec] hover:scale-105 transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* フローティングCTAバー */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ffe3e9] py-2.5 px-4 shadow-[0_-4px_20px_rgba(232,67,110,0.12)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-[#3a2b2c] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#e8436e]" />
              WEB即時予約受付中（空席カレンダー閲覧可）
            </span>
            <span className="text-[10px] text-[#8c7374]">
              営業時間 10:00〜20:00 / 不定休（GW・お盆・SW休まず営業）
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* LINEクーポン */}
            <a
              href={SALON_INFO.links.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full bg-[#06C755] text-white text-xs font-bold shadow-sm hover:bg-[#05b34c] transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">LINE限定クーポン</span>
            </a>

            {/* HOT PEPPER Beauty */}
            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="strawberry-button flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold shadow-md"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">空席確認・即時予約</span>
            </a>

            {/* 電話 */}
            <a
              href={`tel:${SALON_INFO.phone}`}
              aria-label="電話する"
              className="w-10 h-10 rounded-full bg-[#ffe5ec] text-[#e8436e] flex items-center justify-center hover:bg-[#ffd1dc] transition-all shrink-0"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
