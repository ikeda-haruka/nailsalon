"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, Heart, Star, ShieldCheck, Clock, Award, Ticket } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-48 sm:pt-44 lg:pt-48 pb-10 sm:pb-16 overflow-hidden aurora-bg">
      {/* 繊細な光彩グロー */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-lavender-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] bg-gold-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 左カラム: コピー & CTA（スマホでファーストビューに予約ボタンまで収まる設計） */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* 上部バッジ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-lavender-200/80 shadow-xs text-xs font-normal text-lavender-700">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lavender-500"></span>
              </span>
              <span className="tracking-widest font-serif text-[11px]">PARAGEL & MAGNET NAIL SALON</span>
              <span className="text-lavender-300">|</span>
              <span className="text-plum-800 font-normal">表参道</span>
            </div>

            {/* 大見出し */}
            <div className="space-y-2">
              <p className="font-serif italic text-sm sm:text-base text-gold-600 font-light tracking-widest">
                — Pure Luster & Healthy Nails —
              </p>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-plum-900 leading-[1.3] sm:leading-[1.35] tracking-wide">
                自爪を削らない、うるおい美爪。<br />
                <span className="water-glow-text">透き通る水光ラベンダー</span>と<br className="sm:hidden" />
                シャンパンゴールドの煌めき
              </h1>
            </div>

            {/* リード文 */}
            <p className="text-xs sm:text-sm text-plum-900 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal tracking-wide">
              自爪を削らず健やかに守る<strong className="text-lavender-700 font-semibold">「パラジェル専門」</strong>。
              丁寧なウォーターケアと高持続フィルインで、<strong className="text-plum-950 font-semibold">3〜4週間綺麗な状態</strong>をキープ。
              50色以上の水光マグネットと上品なニュアンスアートで、大人の手元に洗練された輝きを宿します。
            </p>

            {/* こだわりポイント（絵文字を排除し洗練されたピルタグへ） */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-0.5">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-normal text-plum-800 border border-lavender-200/70 shadow-2xs flex items-center gap-1.5 tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-lavender-600" />
                <span>自爪サンディング不要</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-normal text-plum-800 border border-gold-200/70 shadow-2xs flex items-center gap-1.5 tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>水光マグネット50色+</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-normal text-plum-800 border border-lavender-200/70 shadow-2xs flex items-center gap-1.5 tracking-wide">
                <Clock className="w-3.5 h-3.5 text-lavender-500" />
                <span>3〜4週持続フィルイン</span>
              </span>
            </div>

            {/* CTAボタン群: スマホで押しやすくファーストビューで即時予約へ誘導 */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'cta_click_hotpepper_hero' }); } catch(e){}
                }}
                className="luxe-button w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 group shadow-lg tracking-wider"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>空席確認・Web即時予約</span>
              </a>

              <Link
                href="/login"
                className="gold-button w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102 tracking-wide"
              >
                <Ticket className="w-4 h-4 text-plum-950" />
                <span>WEB会員登録で¥1,000OFF</span>
              </Link>
            </div>

            {/* 連休営業告知マイクロバナー */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lavender-50/80 border border-lavender-200/60 text-[11px] font-normal text-lavender-800 shadow-2xs tracking-wide">
              <span className="text-gold-500">✦</span>
              <span>GW・お盆・SWも休まず営業（10:00〜20:00 / 専用駐車場3台完備）</span>
            </div>

            {/* ハイライト数値 */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-sm mx-auto lg:mx-0">
              <div className="pearl-glass p-3 rounded-2xl text-center border border-lavender-100 shadow-2xs">
                <span className="block font-serif font-medium text-xl sm:text-2xl text-lavender-700 tracking-wider">3〜4w</span>
                <span className="text-[10px] font-medium text-plum-800 tracking-wide">高持続フィルイン</span>
              </div>
              <div className="pearl-glass p-3 rounded-2xl text-center border border-lavender-100 shadow-2xs">
                <span className="block font-serif font-medium text-xl sm:text-2xl text-gold-600 tracking-wider">50+</span>
                <span className="text-[10px] font-medium text-plum-800 tracking-wide">マグネット色数</span>
              </div>
              <div className="pearl-glass p-3 rounded-2xl text-center border border-lavender-100 shadow-2xs">
                <span className="block font-serif font-medium text-xl sm:text-2xl text-lavender-700 tracking-wider">0 yen</span>
                <span className="text-[10px] font-medium text-plum-800 tracking-wide">自爪削り負担</span>
              </div>
            </div>

          </div>

          {/* 右カラム: ビジュアルフォト ＆ 上品なUI */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* フォトカード本体 */}
              <div className="relative rounded-[2.5rem] overflow-hidden p-2.5 sm:p-3 bg-white/80 backdrop-blur-xl border border-lavender-200/80 shadow-[0_20px_50px_rgba(153,117,203,0.14)]">
                <div className="relative rounded-[2rem] overflow-hidden h-[360px] sm:h-[440px]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Salon de Fraise パラジェル＆水光ラベンダーマグネットネイル"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* 写真下部キャプション */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-500/90 text-plum-950 tracking-widest uppercase inline-block mb-1 shadow-sm font-serif">
                      Signature Look
                    </span>
                    <h3 className="font-serif font-normal text-base sm:text-lg text-white drop-shadow-md tracking-wide">
                      透き通る水光ラベンダー × シャンパンゴールド
                    </h3>
                    <p className="text-[11px] text-lavender-100 font-light tracking-wide mt-0.5">
                      自爪を削らないパラジェルベース / 50種類以上の微粒子パウダー
                    </p>
                  </div>
                </div>
              </div>

              {/* フローティングバッジ1: パラジェル認定 */}
              <div className="absolute -top-3 -left-3 sm:-left-6 pearl-glass px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg border border-lavender-200/80">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lavender-500 to-lavender-400 flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-plum-900 tracking-wide">自爪を削らない</p>
                  <p className="text-[9px] text-lavender-700 font-normal">パラジェル登録店</p>
                </div>
              </div>

              {/* フローティングバッジ2: フィルイン */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 pearl-glass px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg border border-gold-200/80">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-400 to-gold-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-plum-900 tracking-wide">高持続フィルイン</p>
                  <p className="text-[9px] text-gold-700 font-normal">3〜4週間浮かない</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
