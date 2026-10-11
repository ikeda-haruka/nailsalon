"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, MessageCircle, Heart, Star, ShieldCheck, Clock, Award } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden aurora-bg">
      {/* 浮遊するキラキラ星装飾 */}
      <div className="absolute top-28 left-8 sm:left-20 text-2xl sm:text-3xl animate-twinkle pointer-events-none">✨</div>
      <div className="absolute top-40 right-10 sm:right-32 text-xl sm:text-2xl animate-twinkle-fast pointer-events-none text-pink-400">💖</div>
      <div className="absolute bottom-24 left-16 text-xl animate-twinkle pointer-events-none text-rose-300">🌸</div>
      <div className="absolute top-1/2 right-6 text-3xl animate-twinkle-fast pointer-events-none">🍓</div>

      {/* ふんわりオーロラグロー */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff85a1]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] bg-[#ffd1dc]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* 左カラム: コピー & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 上部バッジ */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm text-xs font-bold text-[#ff3366] hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3366]"></span>
              </span>
              <span>PARAGEL SPECIALTY SALON</span>
              <span className="text-[#a08587]">|</span>
              <span className="text-[#2c181b]">表参道・原宿</span>
            </div>

            {/* 大見出し */}
            <div className="space-y-2">
              <p className="font-serif italic text-base sm:text-xl text-[#ff6584] font-medium tracking-wide">
                — Stay Glossy, Stay Healthy —
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#2c181b] leading-[1.2] tracking-tight">
                削らない、痛まない。<br />
                <span className="water-glow-text">いちごみるく</span>の<br className="sm:hidden" />
                ちゅるんとうるツヤ爪へ
              </h1>
            </div>

            {/* リード文 */}
            <p className="text-sm sm:text-base text-[#5e4748] leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              自爪を削らず守る<strong className="text-[#ff3366] font-bold">「パラジェル専門」</strong>。
              丁寧なケアとフィルイン技術で、<strong className="text-[#2c181b] font-bold">3〜4週間綺麗な状態</strong>をキープ。
              50色以上の水光マグネットやトレンドアートで、私史上最高に可愛い指先を叶えます。
            </p>

            {/* 令和チックなピルタグ群 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-[#2c181b] border border-pink-200/80 shadow-sm flex items-center gap-1.5">
                💅 <span>自爪削りなし</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-[#2c181b] border border-pink-200/80 shadow-sm flex items-center gap-1.5">
                ✨ <span>水光マグネット50色+</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-[#2c181b] border border-pink-200/80 shadow-sm flex items-center gap-1.5">
                🚗 <span>無料駐車場3台</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold text-[#2c181b] border border-pink-200/80 shadow-sm flex items-center gap-1.5">
                🐾 <span>ペット・子連れOK</span>
              </span>
            </div>

            {/* CTAボタン群 */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="jelly-button w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 group shadow-xl"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>HOT PEPPER Beauty で予約</span>
              </a>

              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-bold bg-[#06C755] hover:bg-[#05b34c] text-white shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINE限定クーポンGET</span>
              </a>
            </div>

            {/* 連休営業告知マイクロバナー */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-100/70 border border-pink-200 text-xs font-bold text-[#ff3366]">
              <span>🎀 GW・お盆・シルバーウィークも休まず営業中（10:00〜20:00）</span>
            </div>

            {/* ハイライト数値 */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-md mx-auto lg:mx-0">
              <div className="jelly-glass p-3 rounded-2xl text-center">
                <span className="block font-serif font-black text-2xl text-[#ff3366]">3〜4w</span>
                <span className="text-[10px] font-bold text-[#5e4748]">高持続キープ</span>
              </div>
              <div className="jelly-glass p-3 rounded-2xl text-center">
                <span className="block font-serif font-black text-2xl text-[#ff3366]">50+</span>
                <span className="text-[10px] font-bold text-[#5e4748]">マグネット色数</span>
              </div>
              <div className="jelly-glass p-3 rounded-2xl text-center">
                <span className="block font-serif font-black text-2xl text-[#ff3366]">0 yen</span>
                <span className="text-[10px] font-bold text-[#5e4748]">自爪サンディング</span>
              </div>
            </div>

          </div>

          {/* 右カラム: ビジュアルフォト ＆ インスタライクなUI */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* フォトカード本体 */}
              <div className="relative rounded-[2.5rem] overflow-hidden p-3 bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(255,105,180,0.25)]">
                <div className="relative rounded-[2rem] overflow-hidden h-[420px] sm:h-[480px]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Salon de Fraise パラジェル＆水光マグネットネイル"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* 写真上のインスタ風リアクションバッジ */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#ff3366] shadow-md hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 fill-[#ff3366]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-amber-500 shadow-md">
                      <Star className="w-5 h-5 fill-amber-400" />
                    </div>
                  </div>

                  {/* 写真下部キャプション */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#ff3366] uppercase tracking-wider inline-block mb-1.5 shadow-sm">
                      Signature Look
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white drop-shadow-md">
                      うるうる水光マグネット × いちごみるく
                    </h3>
                    <p className="text-xs text-pink-100 font-medium">
                      透け感ピンクベージュ / 50種類以上のマグネットカラー
                    </p>
                  </div>
                </div>
              </div>

              {/* フローティングカード1: パラジェル認定 */}
              <div className="absolute -top-4 -left-4 sm:-left-8 jelly-glass p-3.5 rounded-2xl flex items-center gap-3 shadow-xl animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff3366] to-[#ff85a1] flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#2c181b]">自爪を削らない</p>
                  <p className="text-[10px] text-[#ff6584] font-bold">パラジェル専門店</p>
                </div>
              </div>

              {/* フローティングカード2: フィルイン */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 jelly-glass p-3.5 rounded-2xl flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#2c181b]">高持続フィルイン</p>
                  <p className="text-[10px] text-[#ff3366] font-bold">3〜4週間浮かない</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
