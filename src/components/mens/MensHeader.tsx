"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  X,
  Menu,
  ShoppingBag,
  Award,
  User,
  ShieldCheck,
  ChevronRight,
  ArrowLeftRight
} from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";
import { useAuth } from "@/context/AuthContext";

export default function MensHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Concept", jp: "設立の想い・固定概念の打破", href: "/mens#concept" },
    { name: "Menu & Price", jp: "料金・身だしなみメニュー", href: "/mens#menu" },
    { name: "Style Catalog", jp: "メンズスタイルカタログ", href: "/mens#catalog" },
    { name: "Staff", jp: "男性ネイリスト（在籍5名）", href: "/mens#staff" },
    { name: "Recruit", jp: "男性スタッフ採用情報", href: "/mens#recruit" },
    { name: "Online Shop", jp: "メンズ公式ショップ", href: "/mens/shop" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        
        {/* レディースサロンとの切り替えアナウンスバナー */}
        <div className="bg-[#09090b] text-zinc-400 border-b border-zinc-800 py-1.5 px-3 sm:px-4 text-[11px] text-center select-none flex items-center justify-center gap-2">
          <span>✦ メンズ専用パラジェルネイルサロン 【全員男性ネイリスト / 完全個室】</span>
          <span className="text-zinc-600">|</span>
          <Link
            href="/"
            className="text-zinc-300 hover:text-white underline inline-flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeftRight className="w-3 h-3 text-gold-400" />
            <span>レディースサロン（Salon de Fraise）はこちら</span>
          </Link>
        </div>

        {/* ナビゲーションバー本体（モノトーン・ダークガラス） */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[#0f0f12]/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl py-3"
              : "bg-[#0f0f12]/80 backdrop-blur-md border-b border-zinc-800/60 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              
              {/* ブランドロゴ */}
              <Link href="/mens" className="flex items-center gap-3 group shrink-0">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-md group-hover:border-zinc-400 transition-colors">
                  <span className="font-serif text-sm tracking-wider font-semibold">H</span>
                </div>
                <div>
                  <span className="block font-serif font-medium text-base sm:text-lg text-white tracking-widest leading-none">
                    Salon de Fraise <span className="text-zinc-400 font-light text-xs sm:text-sm tracking-widest uppercase">HOMME</span>
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase mt-0.5 block">
                    MEN&apos;S PARAGEL SALON
                  </span>
                </div>
              </Link>

              {/* デスクトップナビゲーション */}
              <nav className="hidden lg:flex items-center gap-6 text-xs text-zinc-300 font-medium tracking-wide">
                {navLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="hover:text-white transition-colors relative py-1"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* 右側アクションエリア */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* 会員マイページ（共通ポイント＆共通アカウント） */}
                {user ? (
                  <Link
                    href="/mypage"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full bg-zinc-900 text-zinc-200 border border-zinc-700 hover:border-zinc-500 transition-all shadow-xs"
                    title="会員マイページ（サロン・ショップ共通）"
                  >
                    <Award className="w-3.5 h-3.5 text-zinc-300" />
                    <span>マイページ ({user.points}pt)</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600 transition-all"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>ログイン</span>
                  </Link>
                )}

                {/* メンズ専用公式ショップボタン */}
                <Link
                  href="/mens/shop"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 sm:px-3.5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500 transition-all shadow-xs"
                  title="メンズ専用公式オンラインショップ"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-zinc-300" />
                  <span>メンズEC</span>
                </Link>

                {/* 即時WEB予約ボタン */}
                <a
                  href={MENS_SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mens-button-white flex items-center gap-1.5 text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full tracking-wider whitespace-nowrap shadow-lg cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>メンズ予約</span>
                </a>

                {/* ハンバーガーボタン */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="メニューを開く"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <div className="w-4 h-3.5 flex flex-col justify-between py-0.5">
                    <span className="block h-[1.5px] w-4 bg-zinc-200 rounded-full" />
                    <span className="block h-[1.5px] w-3 bg-zinc-400 rounded-full" />
                    <span className="block h-[1.5px] w-4 bg-zinc-200 rounded-full" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* モバイル＆全画面ドロワーメニュー */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden animate-in fade-in duration-200">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0f0f12] border-l border-zinc-800 shadow-2xl flex flex-col justify-between overflow-y-auto p-6 sm:p-8 space-y-6 text-white">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-serif text-lg tracking-wider block">Salon de Fraise HOMME</span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">MEN&apos;S NAVIGATION</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* リンク一覧 */}
              <div className="space-y-3">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-600 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <p className="font-serif text-sm text-white">{link.name}</p>
                      <p className="text-[11px] text-zinc-400 font-light mt-0.5">{link.jp}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </Link>
                ))}
              </div>

              {/* レディースサロンへの切り替え */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                <span className="text-[10px] text-gold-400 font-serif font-medium">✦ 提携サロン</span>
                <p className="text-zinc-300 font-light text-[11px]">
                  女性向けパラジェル＆水光マグネットサロン「Salon de Fraise」のWEBサイトへ移動します。
                </p>
                <Link
                  href="/"
                  className="block text-center py-2.5 px-4 rounded-xl bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors"
                >
                  レディースサロンを見る
                </Link>
              </div>

              {/* 予約ボタン */}
              <div className="space-y-2 pt-2">
                <a
                  href={MENS_SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mens-button-white block text-center py-3.5 rounded-full text-xs font-semibold shadow-lg"
                >
                  HOT PEPPER でメンズ即時予約
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
