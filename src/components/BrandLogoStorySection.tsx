"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldCheck, Gem, Flower2, Award } from "lucide-react";

export default function BrandLogoStorySection() {
  const logoElements = [
    {
      icon: Flower2,
      tag: "MOTIF 01",
      title: "5枚の苺の花弁（Fraise）",
      meaning: "花言葉「尊重と愛情」「先見の明」",
      desc: "フランス語で「苺」を意味する Fraise。苺の花言葉は『尊重と愛情』『幸福』『先見の明』です。毎日酷使される手元を愛おしみ、自分自身を大切に慈しむ贅沢なひとときをお届けしたいという祈りを、5枚の花びらの幾何学エンブレムに宿しています。"
    },
    {
      icon: ShieldCheck,
      tag: "MOTIF 02",
      title: "シャンパンゴールドの二重環",
      meaning: "自爪を一切削らないパラジェルの誠実な誓い",
      desc: "自爪の表面を一切サンディングしない（削らない）パラジェル技術と、褪せない永遠の美しさを象徴するデュアルゴールドサークル。お客様の大切なお爪の健康と美しさを、一生涯守り続けるサロンの誇りと約束を表現しています。"
    },
    {
      icon: Gem,
      tag: "MOTIF 03",
      title: "淡い紫（ラベンダー）と水光の光彩",
      meaning: "心ほどける静寂の空間 ＆ 揺らめく水光マグネット",
      desc: "白・淡い紫・シャンパンゴールドで統一された表参道のプライベート空間を表現。中央のダイヤモンドスターは、水面のようにちゅるんと揺らめく水光マグネットの神秘的な輝きを表し、ふと指先を見るたびに自信と安らぎが湧き上がる光を象徴しています。"
    }
  ];

  return (
    <section id="brand-story" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-lavender-50/30 to-white">
      {/* 背景装飾 */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-radial from-lavender-300/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-radial from-gold-300/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-lavender-100 via-white to-gold-100 border border-gold-300/80 shadow-2xs font-serif text-xs font-medium tracking-widest text-plum-950 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Brand Philosophy &amp; Emblem Message</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-plum-950 leading-tight">
            ブランドロゴに込められたメッセージ
          </h2>

          <p className="text-xs sm:text-sm text-plum-700 font-light leading-relaxed">
            「尊重・愛情・先見の明」── 指先を見るたび、自分を愛するための小さな奇跡。<br className="hidden sm:inline" />
            Salon de Fraise 表参道のすべての施術と公式製品に息づく、美と健康への哲学をご紹介します。
          </p>
        </div>

        {/* メインコンテンツ：ロゴエンブレム ＆ 3つの象徴 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 左側（5カラム）：ブランドロゴエンブレムの美しい拡大表示 */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="pearl-glass p-8 sm:p-10 rounded-[2.5rem] border-2 border-gold-300 shadow-2xl relative overflow-hidden bg-linear-to-br from-white via-lavender-50/40 to-gold-50/30 max-w-md w-full text-center group">
              {/* 光彩エフェクト */}
              <div className="shimmer-sweep pointer-events-none opacity-40" />

              {/* ブランドロゴSVG */}
              <div className="relative aspect-square w-64 sm:w-72 mx-auto rounded-3xl overflow-hidden shadow-md border border-lavender-200/80 bg-white">
                <Image
                  src="/images/brand_logo.svg"
                  alt="Salon de Fraise 公式ブランドロゴエンブレム"
                  fill
                  className="object-contain p-3 group-hover:scale-102 transition-transform duration-500"
                  priority
                />
              </div>

              {/* キャプション */}
              <div className="mt-6 space-y-1">
                <p className="font-serif text-xs tracking-[0.25em] uppercase text-gold-800 font-semibold">
                  Official Salon Emblem
                </p>
                <h4 className="font-serif text-lg font-medium text-plum-950">
                  Salon de Fraise Omotesando
                </h4>
                <p className="text-[11px] text-plum-600 font-light leading-relaxed pt-1">
                  自爪を削らないパラジェル認定サロン ＆ 50種水光マグネット
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-lavender-200/70 flex items-center justify-around text-[10px] text-plum-700 font-serif">
                <span>✦ 白 (Pure White)</span>
                <span>✦ 淡い紫 (Pale Lavender)</span>
                <span>✦ 金 (Champagne Gold)</span>
              </div>
            </div>
          </div>

          {/* 右側（7カラム）：3つのモチーフの詳細カード */}
          <div className="lg:col-span-7 space-y-5">
            {logoElements.map((elem, idx) => {
              const IconComp = elem.icon;
              return (
                <div
                  key={idx}
                  className="pearl-glass p-6 sm:p-7 rounded-3xl border border-lavender-200/90 shadow-sm hover:shadow-md hover:border-gold-300 transition-all bg-white/90 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0 border border-gold-300">
                        <IconComp className="w-5 h-5 text-gold-700" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-lavender-700 block font-semibold">
                          {elem.tag}
                        </span>
                        <h4 className="font-serif text-base font-medium text-plum-950">
                          {elem.title}
                        </h4>
                      </div>
                    </div>

                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-lavender-100 text-plum-900 border border-lavender-200 font-serif font-medium hidden sm:inline-block">
                      {elem.meaning}
                    </span>
                  </div>

                  <p className="sm:hidden text-[10px] text-gold-800 font-medium">
                    ✦ {elem.meaning}
                  </p>

                  <p className="text-xs text-plum-700 leading-relaxed font-light pl-0 sm:pl-13">
                    {elem.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* ブランドステートメントバナー（サロンおよび公式オンラインショップ共通の誓い） */}
        <div className="rounded-[2.5rem] bg-linear-to-r from-plum-950 via-purple-950 to-[#180d26] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-gold-400/40 text-center space-y-4 max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-gold-400/20 via-transparent to-transparent blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-300">
              Our Promise to Your Fingertips
            </span>

            <h3 className="text-lg sm:text-2xl font-serif font-light text-white leading-relaxed">
              「手元は、毎日自分の視界に最も入る場所だからこそ。<br className="hidden sm:inline" />
              自爪を削らず守り、飾るたびに心までほどける贅沢を。」
            </h3>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              サロンでの施術はもちろん、公式オンラインショップでお届けするネイルチップや専売ジェルに至るまで、すべての製品にこのロゴの信念が宿っています。<br />
              製品画像が生成されていない製品にもこの公式ブランドロゴを表示し、在籍ネイリスト12名がサロンワークの合間に確かな品質をお約束して丁寧にお届けしています。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
