"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Heart, Droplets, Clock, CheckCircle2, Star, Coffee, Car, Dog, Baby } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function ConceptSection() {
  const points = [
    {
      step: "POINT 01",
      title: "自爪を一切削らない「パラジェル専門」",
      tag: "Non-Sanding",
      desc: "従来のジェルネイルは密着のため爪表面を削る必要がありましたが、パラジェルは最高峰の吸着力で【自爪サンディング不要】。薄く傷んだ爪も、自爪を健康に育てながらジェルを楽しめます。",
      highlight: "爪が薄い・痛むお悩みから解放",
      badge: "自爪ダメージ0%",
    },
    {
      step: "POINT 02",
      title: "アセトンを使わない「高持続フィルイン」",
      tag: "Fill-in Tech",
      desc: "付け替え時に皮膚や爪を極度に乾燥させるアセトン溶剤を使わず、ベースを一層残して新しく塗布。爪周りの丁寧なウォーターケアと美フォルム形成で、浮きにくく美しい仕上がりに。",
      highlight: "爪周りの皮膚や自爪を守る一層残し",
      badge: "アセトン不使用",
    },
    {
      step: "POINT 03",
      title: "3〜4週間ずっと綺麗な状態をキープ",
      tag: "Long Lasting",
      desc: "水仕事や生活習慣、乾燥に負けない丁寧なベース設計。日々のオイル保湿アドバイスもしっかりお伝えし、次回のご来店まで浮きや欠けのない快適な生活をお約束します。",
      highlight: "ホームケアのアドバイスも充実",
      badge: "3〜4週キープ",
    },
  ];

  return (
    <section id="concept" className="py-24 bg-gradient-to-b from-white via-lavender-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-black tracking-wider uppercase border border-lavender-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Why Salon de Fraise?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-plum-900">
            ずっと美しい指先を保つ、<br />
            3つの理由
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-medium leading-relaxed">
            ジェルネイルを続けると爪が薄くなる…そんな不安をゼロに。<br className="hidden sm:inline" />
            丁寧なウォーターケアと最新技術で、大人の手元を品格ある輝きへ導きます。
          </p>
        </div>

        {/* 3つのポイントカード（雑誌LOOKBOOK風） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="pearl-glass rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-lavender-200/80 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
            >
              {/* 背景の淡いアクセントサークル */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-lavender-200/40 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black tracking-widest text-lavender-700 uppercase bg-lavender-50 px-2.5 py-1 rounded-full border border-lavender-200">
                    {p.step}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-plum-900 border border-gold-200 shadow-xs">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-plum-900 mb-3 leading-snug group-hover:text-lavender-700 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-plum-700 leading-relaxed mb-6 font-medium">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-lavender-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-xs font-bold text-lavender-700">
                  {p.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* サロン内観 ＆ 快適設備バナー */}
        <div className="pearl-glass rounded-[2.5rem] p-8 sm:p-12 border border-lavender-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 左側: サロン内観写真 */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-lg h-72 sm:h-96">
              <Image
                src="/images/interior.jpg"
                alt="Salon de Fraise サロン内観 ハンド2席・フット2席"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-lavender-700 shadow-sm border border-lavender-200">
                ハンド2席・フット2席プライベート空間
              </div>
            </div>

            {/* 右側: 快適おもてなし案内 */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-black tracking-wider uppercase border border-lavender-200">
                <span>Relaxing Luxury Atmosphere</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-plum-900 leading-snug">
                白・淡い紫・シャンパンゴールドの洗練された空間で、<br />
                心までほどける贅沢なひとときを
              </h3>

              <p className="text-xs sm:text-sm text-plum-700 leading-relaxed font-medium">
                全席リクライニングチェア仕様。ハンド2席・フット2席の静かなプライベート空間で、ゆったりとした時間をお過ごしいただけます。
                ペットやお子様連れ（ベビーカー入店OK）でのご来店も大歓迎です。
              </p>

              {/* 4つのフィーチャーピル */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/90 border border-lavender-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum-900">カフェドリンク6種</p>
                    <p className="text-[10px] text-plum-500">珈琲・紅茶・緑茶・ラテ等</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-lavender-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lavender-50 border border-lavender-200 flex items-center justify-center text-lavender-600 shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum-900">お客様専用駐車場</p>
                    <p className="text-[10px] text-plum-500">無料パーキング3台完備</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-lavender-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lavender-50 border border-lavender-200 flex items-center justify-center text-lavender-600 shrink-0">
                    <Dog className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum-900">ペット同伴歓迎</p>
                    <p className="text-[10px] text-plum-500">愛犬・愛猫と一緒にご来店OK</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-lavender-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
                    <Baby className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-plum-900">お子様連れOK</p>
                    <p className="text-[10px] text-plum-500">ベビーカーの横付け対応</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3〜4週持続の秘訣・ケアアドバイスカード */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-lavender-50/80 border border-lavender-200 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white text-lavender-600 shadow-sm flex items-center justify-center shrink-0 border border-lavender-200">
            <Droplets className="w-7 h-7 text-lavender-600" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h4 className="text-sm sm:text-base font-bold text-plum-900 flex items-center justify-center sm:justify-start gap-2">
              <span>3〜4週間綺麗な状態を保つ秘訣【ネイリスト直伝のホームケア】</span>
              <span className="text-[10px] bg-gold-500 text-plum-950 px-2 py-0.5 rounded-full font-bold">Point</span>
            </h4>
            <p className="text-xs text-plum-700 leading-relaxed font-medium">
              ネイルの持ちは爪の状態、水仕事や生活習慣、日々のオイルや保湿ケアによって変わります。
              1日数回のネイルオイル塗布でハイポニキウム（爪の裏側）を保湿することで、浮きのない美しい状態がずっと続きます。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
