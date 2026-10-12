"use client";

import React from "react";
import { Sparkles, Heart, Coffee, Car, Dog, Star, Compass } from "lucide-react";

export default function StoryHighlights() {
  const stories = [
    {
      id: "spring",
      title: "春ネイル",
      en: "Spring",
      icon: "🌸",
      href: "#gallery",
      isNew: true,
      bg: "from-lavender-300 via-pink-200 to-gold-200",
    },
    {
      id: "magnet",
      title: "水光50色",
      en: "Magnet",
      icon: "🧲",
      href: "#magnet-lab",
      isNew: true,
      bg: "from-lavender-400 via-lavender-300 to-gold-300",
    },
    {
      id: "paragel",
      title: "削らない",
      en: "Paragel",
      icon: "💅",
      href: "#concept",
      isNew: false,
      bg: "from-lavender-200 via-pearl-100 to-gold-200",
    },
    {
      id: "staff",
      title: "ネイリスト",
      en: "Staff",
      icon: "✨",
      href: "#staff",
      isNew: false,
      bg: "from-gold-300 via-lavender-200 to-lavender-400",
    },
    {
      id: "drink",
      title: "カフェ6種",
      en: "Café",
      icon: "☕️",
      href: "#salon-info",
      isNew: false,
      bg: "from-gold-200 via-amber-100 to-lavender-200",
    },
    {
      id: "parking",
      title: "駐車場3台",
      en: "Parking",
      icon: "🚗",
      href: "#salon-info",
      isNew: false,
      bg: "from-lavender-200 via-sky-100 to-gold-200",
    },
    {
      id: "holiday",
      title: "連休営業",
      en: "GW/お盆",
      icon: "✦",
      href: "#salon-info",
      isNew: false,
      bg: "from-gold-300 via-lavender-300 to-lavender-500",
    },
    {
      id: "pet-kids",
      title: "子連れ/ペット",
      en: "Welcome",
      icon: "🐾",
      href: "#salon-info",
      isNew: false,
      bg: "from-lavender-300 via-emerald-100 to-gold-200",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
        {stories.map((story) => (
          <a
            key={story.id}
            href={story.href}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          >
            <div className="relative">
              {/* Instagram風ラベンダー＆ゴールドグラデーションリング */}
              <div className="p-[3px] rounded-full bg-gradient-to-tr from-lavender-500 via-gold-400 to-lavender-300 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white p-1 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full bg-gradient-to-tr ${story.bg} flex items-center justify-center text-xl sm:text-2xl shadow-inner group-hover:rotate-6 transition-transform`}>
                    {story.icon}
                  </div>
                </div>
              </div>

              {/* NEWバッジ */}
              {story.isNew && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-gold-500 text-plum-950 text-[9px] font-normal tracking-widest uppercase shadow-md animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <div className="text-center">
              <span className="block text-[11px] font-normal text-plum-900 group-hover:text-lavender-700 transition-colors leading-tight tracking-wide">
                {story.title}
              </span>
              <span className="block text-[9px] text-plum-500 font-serif font-light tracking-widest uppercase">
                {story.en}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
