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
      bg: "from-pink-300 via-rose-300 to-amber-200",
    },
    {
      id: "magnet",
      title: "水光50色",
      en: "Magnet",
      icon: "🧲",
      href: "#magnet-lab",
      isNew: true,
      bg: "from-fuchsia-400 via-pink-400 to-rose-300",
    },
    {
      id: "paragel",
      title: "削らない",
      en: "Paragel",
      icon: "💅",
      href: "#concept",
      isNew: false,
      bg: "from-rose-400 via-pink-300 to-pink-100",
    },
    {
      id: "staff",
      title: "ネイリスト",
      en: "Staff",
      icon: "✨",
      href: "#staff",
      isNew: false,
      bg: "from-pink-400 via-rose-400 to-purple-300",
    },
    {
      id: "drink",
      title: "カフェ6種",
      en: "Café",
      icon: "☕️",
      href: "#salon-info",
      isNew: false,
      bg: "from-amber-300 via-orange-300 to-pink-300",
    },
    {
      id: "parking",
      title: "駐車場3台",
      en: "Parking",
      icon: "🚗",
      href: "#salon-info",
      isNew: false,
      bg: "from-sky-300 via-pink-300 to-rose-300",
    },
    {
      id: "holiday",
      title: "連休営業",
      en: "GW/お盆",
      icon: "🎀",
      href: "#salon-info",
      isNew: false,
      bg: "from-red-400 via-pink-400 to-amber-200",
    },
    {
      id: "pet-kids",
      title: "子連れ/ペット",
      en: "Welcome",
      icon: "🐾",
      href: "#salon-info",
      isNew: false,
      bg: "from-emerald-300 via-teal-300 to-pink-300",
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
              {/* Instagram風グラデーションリング */}
              <div className="story-ring-pink p-[3px] rounded-full group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white p-1 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full bg-gradient-to-tr ${story.bg} flex items-center justify-center text-xl sm:text-2xl shadow-inner group-hover:rotate-6 transition-transform`}>
                    {story.icon}
                  </div>
                </div>
              </div>

              {/* NEWバッジ */}
              {story.isNew && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ff3366] text-white text-[9px] font-black tracking-wider uppercase shadow-md animate-pulse">
                  NEW
                </span>
              )}
            </div>

            <div className="text-center">
              <span className="block text-[11px] font-bold text-[#2c181b] group-hover:text-[#ff3366] transition-colors leading-tight">
                {story.title}
              </span>
              <span className="block text-[9px] text-[#a08587] font-semibold tracking-wider uppercase">
                {story.en}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
