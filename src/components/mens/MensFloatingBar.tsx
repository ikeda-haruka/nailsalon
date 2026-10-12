"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Phone, Sparkles, ChevronUp, Ticket, Award, ShoppingBag } from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";
import { useAuth } from "@/context/AuthContext";

export default function MensFloatingBar() {
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

  if (!isVisible) return null;

  return (
    <>
      {/* ページトップボタン（メンズ用モノトーン） */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="ページトップへ戻る"
          className="fixed bottom-20 sm:bottom-24 right-4 z-40 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-white shadow-2xl flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* スマホ・PC固定予約バー（メンズ用モノトーン） */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/90 py-2 sm:py-2.5 px-3 sm:px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-serif font-normal text-white flex items-center gap-1.5 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              HOT PEPPER Beauty 24時間メンズ即時予約受付中
            </span>
            <span className="text-[10px] text-zinc-400 font-light tracking-wide">
              全員男性ネイリスト（在籍5名） / 完全個室・半個室完備 / 会員ポイント共通利用可
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* 会員マイページ / ログイン */}
            <Link
              href={user ? "/mypage" : "/login"}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-medium shadow-sm transition-all hover:bg-zinc-800 tracking-wide"
            >
              {user ? (
                <>
                  <Award className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">マイページ ({user.points}pt)</span>
                </>
              ) : (
                <>
                  <Ticket className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">会員特典 ¥1,000OFF</span>
                </>
              )}
            </Link>

            {/* HOT PEPPER Beauty メンズ即時予約 */}
            <a
              href={MENS_SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="mens-button-white flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold shadow-lg tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">メンズWeb即時予約</span>
            </a>

            {/* メンズ公式ショップ */}
            <Link
              href="/mens/shop"
              aria-label="メンズ公式ショップ"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all shrink-0"
              title="メンズ公式オンラインショップ"
            >
              <ShoppingBag className="w-4 h-4" />
            </Link>

            {/* 電話 */}
            <a
              href={`tel:${MENS_SALON_INFO.phone}`}
              aria-label="メンズサロンへ電話"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all shrink-0"
              title="電話問い合わせ"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
