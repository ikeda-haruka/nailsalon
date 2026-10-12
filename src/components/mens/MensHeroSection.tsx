"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, ShoppingBag, Users, CheckCircle2 } from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";
import MensBrandLogoPlaceholder from "@/components/mens/MensBrandLogoPlaceholder";

export default function MensHeroSection() {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-36 sm:pt-40 pb-20 overflow-hidden mens-bg">
      {/* 背景のモノトーンメッシュグラデーション */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-radial from-zinc-700/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-radial from-zinc-600/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 左側テキスト（7カラム） */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* コンセプトバッジ */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono tracking-wider text-zinc-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>全員男性ネイリスト（5名在籍） / 完全個室・半個室</span>
            </div>

            {/* メインキャッチコピー */}
            <div className="space-y-3">
              <p className="font-serif text-sm sm:text-base text-zinc-400 tracking-[0.2em] uppercase">
                Fix The Stereotype ──
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.25] tracking-tight">
                「男なのに、なんでネイル？」<br />
                その言葉に、もう息苦しさを<br className="hidden sm:inline" />
                <span className="font-medium mens-silver-text">感じなくていい。</span>
              </h1>
            </div>

            {/* サブコピー */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              「ネイル＝女性のもの」という固定概念を壊すために立ち上がった、メンズ専用パラジェルサロン。<br />
              手元はビジネスでも日常でも、自分と他人の視界に最も入る場所だからこそ。<br />
              自爪を削らず守るパラジェルと、塗っていることがバレない完全マット仕上げで、<br className="hidden sm:inline" />
              堂々とした清潔感と自信をあなたの指先に宿します。
            </p>

            {/* 3つの安心ポイント */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2 text-xs text-zinc-300">
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                店員は全員男性（気兼ねゼロ）
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                削らないパラジェル専門
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                バレないツヤ消し自爪風
              </span>
            </div>

            {/* アクションボタン */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href={MENS_SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="mens-button-white w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-2xl tracking-wider cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>HOT PEPPER でメンズ即時予約</span>
              </a>

              <Link
                href="/mens/shop"
                className="mens-button-silver w-full sm:w-auto px-7 py-4 rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-300" />
                <span>メンズ公式ショップを見る</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* 右側ビジュアルカード（5カラム） */}
          <div className="lg:col-span-5 relative">
            <div className="mens-glass p-5 sm:p-7 rounded-[2.5rem] relative overflow-hidden shadow-2xl group">
              
              {/* 写真フレーム */}
              <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner">
                {!imageError ? (
                  <Image
                    src="/images/mens_matte_black.jpg"
                    alt="男性の指先に似合うマットブラック×スモーキーチタンネイル"
                    fill
                    priority
                    onError={() => setImageError(true)}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <MensBrandLogoPlaceholder
                    styleName="マットブラック × スモーキーチタン"
                    categoryLabel="SIGNATURE MENS STYLE"
                  />
                )}
                
                {/* オーバーレイグラデーション */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* スタイルキャプション */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-xs text-white flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block font-semibold">
                      SIGNATURE MENS STYLE
                    </span>
                    <p className="font-serif text-sm font-medium mt-0.5 text-zinc-100">
                      マットブラック × スモーキーチタン
                    </p>
                    <p className="text-[10px] text-zinc-400 font-light">
                      男性の骨格に似合う、シャープで知的な指先
                    </p>
                  </div>
                  <span className="font-serif text-sm text-zinc-200 border border-zinc-700 px-2.5 py-1 rounded-lg bg-zinc-900">
                    ¥11,000
                  </span>
                </div>
              </div>

              {/* カード下部のサロンステータス */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block">在籍スタッフ</span>
                  <span className="font-serif text-sm text-white font-medium">男性 5名</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block">空間仕様</span>
                  <span className="font-serif text-sm text-white font-medium">完全個室</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block">処方</span>
                  <span className="font-serif text-sm text-white font-medium">削らない</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
