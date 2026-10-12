"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, MessageCircle, Heart, Star, ShieldCheck, Clock, Award } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden aurora-bg">
      {/* 浮遊する上品なキラキラ光彩装飾 */}
      <div className="absolute top-28 left-8 sm:left-20 text-2xl sm:text-3xl animate-twinkle pointer-events-none text-lavender-400">✨</div>
      <div className="absolute top-40 right-10 sm:right-32 text-xl sm:text-2xl animate-twinkle-fast pointer-events-none text-gold-400">✧</div>
      <div className="absolute bottom-24 left-16 text-xl animate-twinkle pointer-events-none text-lavender-300">🪞</div>
      <div className="absolute top-1/2 right-6 text-2xl animate-twinkle-fast pointer-events-none text-gold-500">✨</div>

      {/* ふんわりラベンダー＆シャンパンゴールドのオーロラグロー */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-lavender-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] bg-gold-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* 左カラム: コピー & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 上部バッジ */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-lavender-200 shadow-sm text-xs font-bold text-lavender-700 hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender-600"></span>
              </span>
              <span className="tracking-wider">PARAGEL SPECIALTY SALON</span>
              <span className="text-lavender-300">|</span>
              <span className="text-plum-900 font-semibold">表参道・原宿</span>
            </div>

            {/* 大見出し */}
            <div className="space-y-2">
              <p className="font-serif italic text-base sm:text-xl text-gold-600 font-medium tracking-wider">
                — Pure Luster & Healthy Nails —
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-plum-900 leading-[1.25] tracking-tight">
                削らない、傷まない。<br />
                <span className="water-glow-text">透き通る水光ラベンダー</span>と<br className="sm:hidden" />
                シャンパンゴールドのうるツヤ爪へ
              </h1>
            </div>

            {/* リード文 */}
            <p className="text-sm sm:text-base text-plum-700 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              自爪を削らず健やかに守る<strong className="text-lavender-700 font-bold">「パラジェル専門」</strong>。
              丁寧なウォーターケアと高持続フィルイン技術で、<strong className="text-plum-900 font-bold">3〜4週間美しい状態</strong>をキープ。
              50色以上の水光マグネットと上品なニュアンスアートで、大人の手元に洗練された輝きを宿します。
            </p>

            {/* 大人女子向けピルタグ群 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-plum-900 border border-lavender-200 shadow-xs flex items-center gap-1.5">
                💅 <span>自爪サンディング不要</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-plum-900 border border-gold-200 shadow-xs flex items-center gap-1.5">
                ✨ <span>水光マグネット50色+</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-plum-900 border border-lavender-200 shadow-xs flex items-center gap-1.5">
                🚗 <span>無料駐車場3台</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-plum-900 border border-lavender-200 shadow-xs flex items-center gap-1.5">
                🐾 <span>ペット・子連れOK</span>
              </span>
            </div>

            {/* CTAボタン群 */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="luxe-button w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 group shadow-xl"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-50 border border-lavender-200 text-xs font-bold text-lavender-700 shadow-xs">
              <span className="text-gold-500">✦</span>
              <span>年末年始を除き、GW・お盆・シルバーウィークも休まず営業中（10:00〜20:00）</span>
            </div>

            {/* ハイライト数値 */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-md mx-auto lg:mx-0">
              <div className="pearl-glass p-3.5 rounded-2xl text-center border border-lavender-100 shadow-xs">
                <span className="block font-serif font-black text-2xl text-lavender-700">3〜4w</span>
                <span className="text-[10px] font-bold text-plum-700">高持続フィルイン</span>
              </div>
              <div className="pearl-glass p-3.5 rounded-2xl text-center border border-lavender-100 shadow-xs">
                <span className="block font-serif font-black text-2xl text-gold-600">50+</span>
                <span className="text-[10px] font-bold text-plum-700">マグネット色数</span>
              </div>
              <div className="pearl-glass p-3.5 rounded-2xl text-center border border-lavender-100 shadow-xs">
                <span className="block font-serif font-black text-2xl text-lavender-700">0 yen</span>
                <span className="text-[10px] font-bold text-plum-700">自爪削り負担</span>
              </div>
            </div>

          </div>

          {/* 右カラム: ビジュアルフォト ＆ 上品なUI */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* フォトカード本体 */}
              <div className="relative rounded-[2.5rem] overflow-hidden p-3 bg-white/80 backdrop-blur-xl border border-lavender-200 shadow-[0_20px_50px_rgba(153,117,203,0.2)]">
                <div className="relative rounded-[2rem] overflow-hidden h-[420px] sm:h-[480px]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Salon de Fraise パラジェル＆水光ラベンダーマグネットネイル"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* 写真上のリアクションバッジ */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-lavender-600 shadow-md hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 fill-lavender-500 text-lavender-500" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gold-500 shadow-md">
                      <Star className="w-5 h-5 fill-gold-400 text-gold-500" />
                    </div>
                  </div>

                  {/* 写真下部キャプション */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gold-500/90 text-plum-950 uppercase tracking-wider inline-block mb-1.5 shadow-sm">
                      Signature Look
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white drop-shadow-md">
                      透き通る水光ラベンダー × シャンパンゴールド
                    </h3>
                    <p className="text-xs text-lavender-100 font-medium">
                      大人ラベンダーベージュ / 50種類以上の微粒子マグネットカラー
                    </p>
                  </div>
                </div>
              </div>

              {/* フローティングカード1: パラジェル認定 */}
              <div className="absolute -top-4 -left-4 sm:-left-8 pearl-glass p-3.5 rounded-2xl flex items-center gap-3 shadow-xl border border-lavender-200 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lavender-500 to-lavender-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-plum-900">自爪を削らない</p>
                  <p className="text-[10px] text-lavender-700 font-bold">パラジェル専門店</p>
                </div>
              </div>

              {/* フローティングカード2: フィルイン */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 pearl-glass p-3.5 rounded-2xl flex items-center gap-3 shadow-xl border border-gold-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-400 to-gold-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-plum-900">高持続フィルイン</p>
                  <p className="text-[10px] text-gold-700 font-bold">3〜4週間浮かない</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
