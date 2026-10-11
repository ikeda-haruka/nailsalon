"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Heart, Droplets, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function ConceptSection() {
  const points = [
    {
      num: "01",
      title: "自爪を一切削らない「パラジェル専門」",
      subtitle: "Non-Sanding Gel",
      desc: "従来のジェルネイルは密着を高めるために自爪の表面を削る必要がありましたが、パラジェルは最高峰の密着技術により爪を全く削りません。自爪が薄くならず、健康な美爪を保ったままジェルネイルを長く楽しんでいただけます。",
      icon: ShieldCheck,
      highlight: "爪が薄くて痛む・ジェルをお休みしていた方にも安心"
    },
    {
      num: "02",
      title: "丁寧なケア＆高持続「フィルイン技術」",
      subtitle: "Fill-in Technique",
      desc: "ジェルオフ時に自爪や皮膚を乾燥させるアセトン溶剤を使わず、ベースジェルを一層残して付け替える「フィルイン技術」を採用。丁寧なウォーターケアで甘皮周りを整え、爪への負担を極限まで抑えます。",
      icon: Sparkles,
      highlight: "アセトンを使わない一層残しで爪の健康を第一に"
    },
    {
      num: "03",
      title: "3〜4週間ずっと綺麗な状態をキープ",
      subtitle: "Long Lasting & Care",
      desc: "ネイルの持ちは爪の状態、水仕事や生活習慣、保湿ケアによっても変化します。当店では一人ひとりの爪質に合わせたベースジェルの選定と丁寧なフォルム形成を行い、3〜4週間浮きのない美しい仕上がりを実現します。",
      icon: Clock,
      highlight: "施術後のオイル保湿や美爪ケア方法もしっかりサポート"
    }
  ];

  return (
    <section id="concept" className="py-24 bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#fff0f3] rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#e8436e]" />
            <span>Salon de Fraise のこだわり</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            美しさと健康を両立する、<br className="sm:hidden" />
            パラジェル専門サロン
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            豊富なデザイン数があり、シンプルからトレンドまでお気に入りがきっと見つかります。<br className="hidden sm:inline" />
            傷んだ爪をいたわり、ずっとネイルを楽しんでほしいという想いから生まれたサロンです。
          </p>
        </div>

        {/* 3つの強みカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.num}
                className="strawberry-card p-8 relative flex flex-col justify-between group hover:border-[#ff758f]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif font-bold text-[#ffd1dc] group-hover:text-[#ff758f] transition-colors">
                      {point.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] flex items-center justify-center text-[#e8436e] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] tracking-widest text-[#ff758f] font-bold uppercase block mb-1">
                    {point.subtitle}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#3a2b2c] mb-3 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#5e4748] leading-relaxed mb-6">
                    {point.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ffe3e9] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8436e] shrink-0 mt-0.5" />
                  <span className="text-[11px] font-medium text-[#cc2855]">
                    {point.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* サロン内観＆おもてなし訴求バナー */}
        <div className="bg-gradient-to-r from-[#fff3f5] via-[#fff8f9] to-[#ffe8ee] rounded-[2.5rem] p-8 sm:p-12 border border-[#ffd1dc] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/images/interior.jpg"
                alt="Salon de Fraise サロン内観 ハンド2席・フット2席"
                width={600}
                height={400}
                className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#e8436e]">
                ハンド2席・フット2席
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#ff758f] tracking-wider uppercase">
                Comfort & Hospitality
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#3a2b2c]">
                いちごみるくのような優しい空間で、<br />
                心まで満たされる特別なひとときを
              </h3>
              <p className="text-xs sm:text-sm text-[#5e4748] leading-relaxed">
                全席リクライニング仕様のハンド2席・フット2席をご用意。周りを気にせずゆったりおくつろぎいただけます。
                ペットやお子様連れでのご来店も大歓迎！ベビーカーの横付けも可能です。
              </p>

              {/* おもてなしスペックリスト */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-[#ffe3e9]">
                  <p className="font-bold text-[#3a2b2c] mb-0.5">☕ 無料カフェドリンク</p>
                  <p className="text-[11px] text-[#8c7374]">珈琲・紅茶・緑茶・ラテ等全6種</p>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#ffe3e9]">
                  <p className="font-bold text-[#3a2b2c] mb-0.5">🚗 お客様専用駐車場</p>
                  <p className="text-[11px] text-[#8c7374]">無料駐車場3台完備</p>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#ffe3e9]">
                  <p className="font-bold text-[#3a2b2c] mb-0.5">🐾 ペット同伴可能</p>
                  <p className="text-[11px] text-[#8c7374]">愛犬・愛猫と一緒にご来店OK</p>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#ffe3e9]">
                  <p className="font-bold text-[#3a2b2c] mb-0.5">👶 お子様同伴可能</p>
                  <p className="text-[11px] text-[#8c7374]">ベビーカーのままご入店いただけます</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ネイルを3〜4週間綺麗に保つためのケアガイド・アドバイス */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#fff9fa] border border-[#ffd1dc] flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe5ec] flex items-center justify-center text-[#e8436e] shrink-0">
            <Droplets className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <h4 className="text-base font-bold text-[#3a2b2c] flex items-center justify-center md:justify-start gap-2">
              <span>3〜4週間綺麗な状態を保つ秘訣【ネイリスト直伝のホームケア】</span>
              <span className="text-[10px] bg-[#e8436e] text-white px-2 py-0.5 rounded-full">アドバイス</span>
            </h4>
            <p className="text-xs text-[#5e4748] leading-relaxed">
              ネイルの持ちは、爪の状態はもちろん、水仕事や生活習慣、日々のオイルや保湿ケアによって大きく変わります。
              指先の乾燥を防ぐため、1日2〜3回のネイルオイル塗布を推奨しています。施術時には爪質に合わせた最適なケア方法を丁寧にお伝えします。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
