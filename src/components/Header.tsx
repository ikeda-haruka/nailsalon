"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Menu,
  X,
  Heart,
  Phone,
  Info,
  ChevronRight,
  Clock,
  MapPin,
  Coffee,
  Car,
  Dog,
  Armchair,
  User,
  Award,
  UserCheck,
  Ticket,
  ShoppingBag
} from "lucide-react";
import { SALON_INFO } from "@/data/salonData";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
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

  // ドロワー展開時は背景スクロールをロック
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // ESCキーでドロワーを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { num: "01", name: "Concept", jp: "サロンのこだわり・自爪育成", href: "/#concept", desc: "削らないパラジェル＆高持続フィルイン" },
    { num: "02", name: "Catalog", jp: "最旬デザインカタログ", href: "/#gallery", desc: "季節のアート・オフィスシンプル" },
    { num: "03", name: "Magnet Lab", jp: "水光マグネット体験", href: "/#magnet-lab", desc: "50種類以上の光彩シミュレーター" },
    { num: "04", name: "Menu & Price", jp: "明朗会計・料金表", href: "/#menu", desc: "全コース丁寧なウォーターケア込み" },
    { num: "05", name: "Staff", jp: "在籍ネイリスト", href: "/#staff", desc: "在籍12名（毎日2〜3名シフト/EC出荷兼務）" },
    { num: "06", name: "Salon Info", jp: "サロン案内・設備", href: "/#salon-info", desc: "ハンド2/フット2・駐車場3台・カフェ" },
    { num: "07", name: "Recruit", jp: "ネイリスト採用情報", href: "/#recruit", desc: "HPB WORK & Indeed にて掲載中" },
    { num: "08", name: "Online Shop", jp: "公式ショップ・ネイルチップ", href: "/shop", desc: "自爪を削らないパラジェルチップ＆サロン専売品" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* サイト最上部固定：ポートフォリオ実績用・架空免責バー */}
        <div
          style={{ backgroundColor: "#180d26", color: "#ffffff" }}
          className="border-b border-[#d4af6e]/50 py-2 px-3 sm:px-4 text-center select-none shadow-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-normal tracking-wide">
            <span
              style={{ backgroundColor: "#d4af6e", color: "#180d26" }}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-serif font-bold text-[10px] uppercase tracking-wider shrink-0 shadow-2xs"
            >
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>PORTFOLIO DEMO</span>
            </span>
            <span className="text-white/95 leading-relaxed truncate sm:overflow-visible sm:whitespace-normal font-sans">
              当サイトは<strong className="text-[#f7dd9d] font-bold underline decoration-[#f7dd9d]/80 underline-offset-2 mx-1">ポートフォリオ実績用の架空サンプルサイト</strong>です。掲載されている店舗名（Salon de Fraise）・人物名・施術情報等はすべて架空のものであり、実在の人物・団体とは関係ありません。
            </span>
          </div>
        </div>

        {/* ナビゲーションバー本体 */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-xl py-2.5 sm:py-3 border-b border-lavender-200/80 shadow-[0_4px_25px_rgba(134,88,203,0.06)]"
              : "bg-white/60 backdrop-blur-md py-3 sm:py-4 border-b border-white/60"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* ロゴ */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9975cb] via-[#b895ea] to-[#d4af6e] flex items-center justify-center text-white shadow-md shadow-lavender-400/30 group-hover:scale-105 transition-transform relative overflow-hidden border border-white/60 shrink-0">
                  <span className="text-white text-base font-serif font-light">✦</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-serif font-normal tracking-wide text-plum-dark">
                      Salon de Fraise
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-700 border border-lavender-200 font-medium tracking-wider hidden sm:inline-block">
                      PARAGEL
                    </span>
                  </div>
                  <p className="text-[10px] text-gold-500 font-normal tracking-widest uppercase font-serif">
                    Paragel & Water-Glow Magnet Salon
                  </p>
                </div>
              </Link>

              {/* デスクトップ用インラインナビゲーション */}
              <nav className="hidden xl:flex items-center gap-4 2xl:gap-7">
                {navLinks.slice(0, 5).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex flex-col items-center text-xs font-normal text-plum-body hover:text-lavender-600 transition-colors py-1"
                  >
                    <span className="font-serif tracking-widest text-sm font-normal text-plum-dark group-hover:text-lavender-600 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-[10px] text-plum-700 group-hover:text-gold-600 transition-colors font-normal">
                      {link.jp}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* 右側アクション群（会員マイページ/ログイン ＆ 予約ボタン ＆ ハンバーガーメニューボタン） */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* 会員マイページ / ログインボタン（PC表示） */}
                {user ? (
                  <Link
                    href="/mypage"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full bg-white text-plum-900 border border-gold-300/80 hover:border-gold-500 shadow-2xs transition-all tracking-wide group whitespace-nowrap shrink-0"
                  >
                    <Award className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span className="whitespace-nowrap">マイページ ({user.points}pt)</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full bg-white text-lavender-700 border border-lavender-300 hover:border-lavender-400 shadow-2xs transition-all tracking-wide whitespace-nowrap shrink-0"
                  >
                    <User className="w-3.5 h-3.5 text-lavender-600 shrink-0" />
                    <span className="whitespace-nowrap">ログイン・会員登録</span>
                  </Link>
                )}

                {/* 公式オンラインショップボタン（パラジェル ネイルチップ主力） */}
                <Link
                  href="/shop"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 sm:px-3.5 py-2 rounded-full bg-linear-to-r from-lavender-50 via-white to-gold-50/60 text-plum-900 border border-lavender-200 hover:border-gold-400 hover:shadow-xs shadow-2xs transition-all tracking-wide whitespace-nowrap shrink-0 group"
                  title="公式オンラインショップ・パラジェル ネイルチップ"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gold-600 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">ショップ</span>
                  <span className="hidden md:inline text-[9px] px-1.5 py-0.2 rounded-full bg-gold-400/25 text-gold-800 font-serif font-bold">
                    チップ
                  </span>
                </Link>

                {/* 即時予約ボタン（改行防止・1行表示を確実に固定） */}
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxe-button flex items-center gap-1.5 text-xs font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full tracking-wider whitespace-nowrap shrink-0 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="whitespace-nowrap">予約・空席</span>
                </a>

                {/* ハンバーガーメニューボタン（MENU文字を排除し、洗練された記号・図形アイコンに一新） */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="ナビゲーションメニューを開く"
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white hover:bg-lavender-50 border border-lavender-200 hover:border-lavender-400 text-plum-900 shadow-xs flex items-center justify-center transition-all active:scale-95 group focus:outline-none cursor-pointer shrink-0"
                >
                  <div className="w-4 h-3.5 flex flex-col justify-between py-0.5 pointer-events-none">
                    <span className="block h-[1.5px] w-4 bg-plum-900 group-hover:bg-lavender-700 transition-colors rounded-full" />
                    <span className="block h-[1.5px] w-3 bg-gold-500 group-hover:w-4 transition-all rounded-full" />
                    <span className="block h-[1.5px] w-4 bg-plum-900 group-hover:bg-lavender-700 transition-colors rounded-full" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ハンバーガードロワーメニュー（右スライドイン＆フルオーバーレイ） */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden animate-in fade-in duration-200">
          {/* 背景暗転オーバーレイ */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-plum-950/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* ドロワーパネル本体 */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white/95 backdrop-blur-2xl border-l border-lavender-200 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              {/* ドロワーヘッダー */}
              <div className="p-6 sm:p-8 border-b border-lavender-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lavender-500 to-gold-400 flex items-center justify-center text-white shadow-xs">
                    <span className="font-serif font-light text-xs">✦</span>
                  </div>
                  <div>
                    <span className="block font-serif font-normal text-base text-plum-900 tracking-wide leading-tight">
                      Salon de Fraise
                    </span>
                    <span className="text-[9px] text-lavender-600 font-light tracking-widest font-serif uppercase">
                      Menu Navigation
                    </span>
                  </div>
                </div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-10 h-10 rounded-full bg-lavender-50 border border-lavender-200 text-plum-900 hover:text-lavender-700 hover:bg-lavender-100 flex items-center justify-center transition-all group cursor-pointer"
                  aria-label="メニューを閉じる"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* 会員ステータスカード（ドロワー内上部） */}
              <div className="px-6 sm:px-8 pt-5">
                <div className="pearl-glass p-4 rounded-2xl border border-gold-300/80 bg-linear-to-r from-gold-50/70 via-white to-lavender-50/70 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-medium text-plum-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                      <span>{user ? `${user.name} 様` : "会員ポータル"}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400 text-plum-950 font-serif">
                      {user ? `${user.rank} 会員` : "新規登録¥1,000OFF"}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Link
                      href={user ? "/mypage" : "/login"}
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex-1 py-2 px-3 rounded-xl bg-plum-900 hover:bg-plum-950 text-white text-xs font-medium text-center shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-gold-300" />
                      <span>{user ? `マイページ (${user.points}pt)` : "ログイン / 新規登録"}</span>
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setIsDrawerOpen(false)}
                      className="py-2 px-3 rounded-xl bg-white border border-lavender-200 hover:border-lavender-400 text-plum-800 text-xs text-center transition-all flex items-center justify-center gap-1"
                      title="スタッフ管理画面（ポイント付与体験）"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-lavender-600" />
                      <span className="hidden sm:inline">スタッフ</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 公式オンラインショップ特集バナー（ドロワー内） */}
              <div className="px-6 sm:px-8 pt-3">
                <Link
                  href="/shop"
                  onClick={() => setIsDrawerOpen(false)}
                  className="block p-3.5 rounded-2xl bg-linear-to-r from-purple-950 via-plum-900 to-[#180d26] text-white shadow-md hover:shadow-lg transition-all border border-gold-400/50 group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400 text-plum-950 font-serif font-bold">
                          NEW OPEN
                        </span>
                        <span className="text-[11px] text-gold-200 font-serif">
                          パラジェル公式EC
                        </span>
                      </div>
                      <p className="text-xs font-serif font-medium text-white flex items-center gap-1">
                        自爪を削らないネイルチップ＆専売ジェル
                      </p>
                      <p className="text-[10px] text-white/70">
                        LEDライト・キット・パラポリッシュも完備
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold-300 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-plum-950 transition-all shrink-0 ml-2">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* メインナビゲーションリスト */}
              <div className="px-6 sm:px-8 py-5 space-y-2 flex-1">
                <p className="text-[10px] text-plum-400 uppercase tracking-widest font-serif mb-2">
                  SECTIONS & SERVICES
                </p>

                <div className="divide-y divide-lavender-100/70">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="py-3 flex items-center justify-between group hover:pl-2 transition-all duration-200"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-serif text-[11px] text-gold-500 font-light tracking-wider">
                            {link.num}
                          </span>
                          <span className="font-serif font-normal text-base sm:text-lg text-plum-900 group-hover:text-lavender-700 transition-colors tracking-wide">
                            {link.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-plum-500 font-light tracking-wide pl-6">
                          {link.jp}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-lavender-300 group-hover:text-lavender-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* クイックアクション & サロン情報フッター */}
              <div className="p-6 sm:p-8 bg-lavender-50/60 border-t border-lavender-200 space-y-4">
                
                {/* 予約・会員ボタン */}
                <div className="space-y-2">
                  <a
                    href={SALON_INFO.links.hotpepper}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsDrawerOpen(false)}
                    className="luxe-button w-full text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-md tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>HOT PEPPER Beauty 即時予約</span>
                  </a>

                  <Link
                    href={user ? "/mypage" : "/login"}
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full text-center py-2.5 rounded-full bg-white border border-gold-300 hover:border-gold-400 text-plum-900 text-xs font-medium flex items-center justify-center gap-2 shadow-2xs transition-all tracking-wide"
                  >
                    <Ticket className="w-4 h-4 text-gold-600" />
                    <span>{user ? "保有クーポン＆特典交換を見る" : "WEB会員登録で¥1,000OFFクーポン"}</span>
                  </Link>
                </div>

                {/* 営業時間・設備スペックまとめ */}
                <div className="pt-2 border-t border-lavender-200/60 grid grid-cols-2 gap-2 text-[11px] text-plum-600 font-light">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-lavender-500 shrink-0" />
                    <span>10:00〜20:00 (不定休)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>GW/お盆/SW営業</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-lavender-500 shrink-0" />
                    <span>ハンド2席 / フット2席</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-lavender-500 shrink-0" />
                    <span>専用駐車場3台完備</span>
                  </div>
                </div>

                {/* 架空サイト免責注記 */}
                <div className="p-2.5 rounded-xl bg-white/80 border border-lavender-200 text-[10px] text-plum-500 leading-relaxed font-light">
                  ※当サイトはWeb制作ポートフォリオ実績用のサンプルサイトです。掲載されている店舗名・人物名等はすべて架空のものです。
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
