"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, MessageCircle, ShieldCheck, Heart, Clock, Award, ChevronDown } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#fff3f5] via-[#fff9fa] to-white">
      {/* 背景の装飾サークル & ふんわりブラー */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#ffe5ec] to-[#fff0f3] rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#ffd1dc] rounded-full blur-2xl opacity-40 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 左カラム: キャッチコピー＆説明＆CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* 上部バッジ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#ffb3c6] shadow-sm text-xs text-[#e8436e] font-semibold animate-bounce duration-1000">
              <Sparkles className="w-4 h-4 fill-[#ff758f] text-[#ff758f]" />
              <span>自爪を削らないパラジェル専門サロン</span>
              <span className="hidden sm:inline text-[#8c7374]">| 表参道・原宿</span>
            </div>

            {/* メイン見出し */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3a2b2c] leading-[1.25] tracking-tight">
              削らない、痛まない。<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8436e] via-[#ff758f] to-[#ff99ac]">
                いちごみるく
              </span>
              のように<br className="sm:hidden" />
              愛らしく艶めく指先へ
            </h1>

            {/* サブテキスト */}
            <p className="text-sm sm:text-base text-[#5e4748] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              シンプルから最旬トレンドまで、お気に入りがきっと見つかる豊富なデザイン。<br className="hidden sm:inline" />
              丁寧なウォーターケアと自爪に優しい<strong className="text-[#e8436e] font-semibold">【フィルイン技術】</strong>で、3〜4週間ずっと美しい指先を楽しんでいただけます。
            </p>

            {/* 特長ピルタグ */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs px-3 py-1 rounded-full bg-[#ffe5ec] text-[#cc2855] font-medium border border-pink-200">
                ✨ 自爪削りなし（パラジェル）
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#ffe5ec] text-[#cc2855] font-medium border border-pink-200">
                💅 水光マグネット50色以上
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#ffe5ec] text-[#cc2855] font-medium border border-pink-200">
                🚗 無料駐車場3台
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#ffe5ec] text-[#cc2855] font-medium border border-pink-200">
                🐾 ペット・お子様同伴歓迎
              </span>
            </div>

            {/* CTAボタン群 */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="strawberry-button w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>HOT PEPPER Beauty で予約</span>
              </a>

              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-bold bg-[#06C755] text-white hover:bg-[#05a847] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>公式LINEで限定クーポンGET</span>
              </a>
            </div>

            {/* 営業案内マイクロテキスト */}
            <div className="text-xs text-[#8c7374] flex items-center justify-center lg:justify-start gap-4 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#e8436e]" />
                営業時間 10:00〜20:00
              </span>
              <span>•</span>
              <span className="text-[#e8436e] font-semibold">
                GW・お盆・SWも休まず営業中
              </span>
            </div>

            {/* 実績バッジエリア */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#ffd1dc]/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center p-2 rounded-xl bg-white/70 border border-[#ffe3e9]">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#e8436e]">3〜4週</div>
                <div className="text-[10px] text-[#8c7374]">美しさ長持ちキープ</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/70 border border-[#ffe3e9]">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#e8436e]">50+</div>
                <div className="text-[10px] text-[#8c7374]">マグネットカラー</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/70 border border-[#ffe3e9]">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#e8436e]">100%</div>
                <div className="text-[10px] text-[#8c7374]">パラジェル使用</div>
              </div>
            </div>
          </div>

          {/* 右カラム: ビジュアル写真 & フローティングバッジ */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* 装飾の背後フレーム */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ffb3c6] via-[#ffd1dc] to-[#ffe5ec] rounded-[2.5rem] rotate-2 blur-sm opacity-60" />
              
              {/* メイン画像コンテナ */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image
                  src="/images/hero.jpg"
                  alt="Salon de Fraise パラジェル＆水光マグネットネイル"
                  width={600}
                  height={500}
                  priority
                  className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* 写真内のグラデーションオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* 写真内下部テキスト */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#ffd1dc] font-semibold">
                    Signature Design
                  </span>
                  <p className="text-base font-serif font-bold text-white drop-shadow">
                    うるうる水光マグネット × イチゴミルクニュアンス
                  </p>
                </div>
              </div>

              {/* フローティングバッジ1: パラジェル認定 */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#ffb3c6] shadow-xl rounded-2xl p-3 flex items-center gap-3 animate-pulse duration-3000">
                <div className="w-10 h-10 rounded-full bg-[#ffe5ec] flex items-center justify-center text-[#e8436e]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3a2b2c]">サンディング不要</p>
                  <p className="text-[10px] text-[#8c7374]">自爪を削らないパラジェル</p>
                </div>
              </div>

              {/* フローティングバッジ2: 丁寧なケアと長持ち */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#ffb3c6] shadow-xl rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff758f] flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3a2b2c]">高持続フィルイン技術</p>
                  <p className="text-[10px] text-[#e8436e] font-semibold">3〜4週間綺麗な状態キープ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* スクロールダウンインジケーター */}
        <div className="mt-12 text-center">
          <a
            href="#concept"
            className="inline-flex flex-col items-center text-xs text-[#8c7374] hover:text-[#e8436e] transition-colors"
          >
            <span>詳しく見る</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#ff758f]" />
          </a>
        </div>
      </div>
    </section>
  );
}
