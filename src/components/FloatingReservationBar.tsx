"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Phone, Sparkles, ChevronUp, Ticket, Award, ShoppingBag } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";
import { useAuth } from "@/context/AuthContext";

export default function FloatingReservationBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const trackClick = (action: string) => {
    try {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "floating_bar_click", action });
      }
    } catch (e) {
      // ignore
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* ページトップボタン */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="ページトップへ戻る"
          className="fixed bottom-20 sm:bottom-24 right-4 z-40 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-lavender-200 text-lavender-700 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* スマホ固定予約バー */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-lavender-200/80 py-2 sm:py-2.5 px-3 sm:px-4 shadow-[0_-8px_30px_rgba(153,117,203,0.15)] animate-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-serif font-normal text-plum-900 flex items-center gap-1.5 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              HOT PEPPER Beauty 24時間即時空席連動中 ＆ WEB会員ポイント制
            </span>
            <span className="text-[10px] text-lavender-700 font-light tracking-wide">
              10:00〜20:00 / 不定休（GW・お盆・SW休まず営業 / 専用駐車場3台）
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* WEB会員クーポン / マイページ */}
            <Link
              href={user ? "/mypage" : "/login"}
              onClick={() => trackClick("member_portal")}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full bg-white border border-gold-400 text-plum-900 text-xs font-medium shadow-sm transition-all hover:scale-102 tracking-wide"
            >
              {user ? (
                <>
                  <Award className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="truncate">マイページ ({user.points}pt)</span>
                </>
              ) : (
                <>
                  <Ticket className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="truncate">会員特典 ¥1,000OFF</span>
                </>
              )}
            </Link>

            {/* HOT PEPPER Beauty 空席確認 */}
            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("hotpepper")}
              className="luxe-button flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-xs font-medium shadow-lg tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">空席確認・Web即時予約</span>
            </a>

            {/* 公式ショップ（ネイルチップ） */}
            <Link
              href="/shop"
              aria-label="パラジェル公式オンラインショップ"
              onClick={() => trackClick("shop")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-plum-900 to-lavender-900 text-gold-300 border border-gold-400/50 flex items-center justify-center hover:scale-105 transition-all shrink-0 shadow-xs group"
              title="公式ショップ（ネイルチップ）"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>

            {/* 電話 */}
            <a
              href={`tel:${SALON_INFO.phone}`}
              aria-label="電話でお問い合わせ"
              onClick={() => trackClick("tel")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-lavender-50 text-lavender-700 border border-lavender-200 flex items-center justify-center hover:bg-lavender-100 transition-all shrink-0 shadow-xs"
            >
              <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
