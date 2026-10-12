"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Coffee, Car, Dog, ShieldCheck, Calendar, Users, Eye } from "lucide-react";

export default function StoryHighlights() {
  const highlights = [
    {
      id: "magnet",
      title: "水光マグネット50色",
      en: "Water Glow Magnet",
      desc: "角度で光彩が走る",
      tag: "TREND",
      href: "#magnet-lab",
      image: "/images/magnet_nail.jpg",
      iconType: "image",
      gradient: "from-lavender-400/20 via-gold-300/20 to-lavender-500/20",
      accent: "text-lavender-700",
      badge: "POPULAR",
    },
    {
      id: "spring",
      title: "春の限定デザイン",
      en: "Spring Floral Art",
      desc: "桜＆タンポポカラー",
      tag: "NEW",
      href: "#gallery",
      image: "/images/spring_nail.jpg",
      iconType: "image",
      gradient: "from-pink-300/20 via-lavender-300/20 to-gold-200/20",
      accent: "text-gold-600",
      badge: "SEASONAL",
    },
    {
      id: "paragel",
      title: "自爪を削らないパラジェル",
      en: "Non-Sanding Base",
      desc: "ダメージ0%の爪育",
      tag: "CARE",
      href: "#concept",
      image: "/images/hero.jpg",
      iconType: "image",
      gradient: "from-lavender-300/20 via-white to-gold-300/20",
      accent: "text-lavender-700",
      badge: "SPECIALTY",
    },
    {
      id: "staff",
      title: "在籍ネイリスト3名",
      en: "Top Nailists",
      desc: "池田・高橋・水野",
      tag: "TEAM",
      href: "#staff",
      icon: Users,
      iconType: "icon",
      gradient: "from-gold-300/20 via-lavender-200/20 to-white",
      accent: "text-plum-900",
      badge: "EXPERT",
    },
    {
      id: "drink",
      title: "無料カフェドリンク6種",
      en: "Café Amenities",
      desc: "珈琲・ラテ・紅茶等",
      tag: "CAFÉ",
      href: "#salon-info",
      icon: Coffee,
      iconType: "icon",
      gradient: "from-gold-200/20 via-amber-100/20 to-white",
      accent: "text-gold-600",
      badge: "FREE",
    },
    {
      id: "parking",
      title: "お客様専用駐車場3台",
      en: "Private Parking",
      desc: "雨の日やお車来店も安心",
      tag: "ACCESS",
      href: "#salon-info",
      icon: Car,
      iconType: "icon",
      gradient: "from-lavender-200/20 via-sky-100/20 to-white",
      accent: "text-lavender-700",
      badge: "PARKING",
    },
    {
      id: "holiday",
      title: "GW・お盆・SW連休営業",
      en: "Holiday Open 10-20h",
      desc: "年末年始以外休まず営業",
      tag: "OPEN",
      href: "#salon-info",
      icon: Calendar,
      iconType: "icon",
      gradient: "from-gold-300/20 via-lavender-300/20 to-white",
      accent: "text-gold-700",
      badge: "ALL-SEASON",
    },
    {
      id: "pet-kids",
      title: "ペット・お子様同伴OK",
      en: "Welcome with Family",
      desc: "ベビーカー・小型犬歓迎",
      tag: "WELCOME",
      href: "#salon-info",
      icon: Dog,
      iconType: "icon",
      gradient: "from-lavender-300/20 via-pink-100/20 to-white",
      accent: "text-lavender-700",
      badge: "COMFORT",
    },
  ];

  // 無限ループ用に2周分連結
  const doubledHighlights = [...highlights, ...highlights];

  return (
    <section className="relative w-full py-7 sm:py-9 overflow-hidden bg-gradient-to-r from-pearl-50 via-white to-pearl-50 border-y border-lavender-200/60 shadow-xs">
      {/* 左右のソフトフェードグラデーションマスク（自然なフェードイン・フェードアウト） */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* 上部マイクロキャプション */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-serif font-light text-plum-500 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping inline-block" />
          <span>Salon Highlights & Features</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-serif font-light text-lavender-500 tracking-wider">
          ✦ Flowing Stream • Tap to Explore
        </span>
      </div>

      {/* ★ 自動で優雅に流れ続ける無限マーキーティッカー */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-flow flex items-center gap-4 sm:gap-6 py-2 px-4 cursor-grab active:cursor-grabbing">
          {doubledHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={`${item.id}-${idx}`}
                href={item.href}
                className="group relative shrink-0 flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-full bg-white/90 backdrop-blur-md border border-lavender-200/90 shadow-sm hover:border-gold-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* 走る水光シマーエフェクト */}
                <div className="shimmer-sweep" />

                {/* 左側：写真サムネイル or アイコン */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-lavender-400 via-gold-300 to-lavender-500 shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white relative flex items-center justify-center">
                    {item.iconType === "image" && item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    ) : (
                      Icon && (
                        <div className={`w-full h-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-plum-900 group-hover:rotate-6 transition-transform`}>
                          <Icon className="w-5 h-5 text-lavender-700" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 右側：テキスト情報 */}
                <div className="text-left pr-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-serif font-normal px-2 py-0.2 rounded-full bg-lavender-100/90 text-lavender-700 border border-lavender-200 tracking-wider">
                      {item.badge}
                    </span>
                    <span className="text-[9px] font-serif font-light text-plum-400 tracking-widest uppercase">
                      {item.en}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-serif font-normal text-plum-900 group-hover:text-lavender-700 transition-colors tracking-wide whitespace-nowrap">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-plum-500 font-light tracking-wide whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>

                {/* ホバー時に現れる矢印光彩 */}
                <span className="text-xs font-serif font-light text-gold-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all pl-1">
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
