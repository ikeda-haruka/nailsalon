"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Heart, Eye, X, Clock, Check, ChevronRight, Bookmark } from "lucide-react";
import { DESIGNS, NailDesign, SALON_INFO } from "@/data/salonData";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDesign, setSelectedDesign] = useState<NailDesign | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label: "ALL", jp: "すべて" },
    { id: "spring", label: "SPRING", jp: "春（桜・タンポポ）" },
    { id: "summer", label: "SUMMER", jp: "夏（ひまわり・フット）" },
    { id: "autumn", label: "AUTUMN", jp: "秋（ボルドー・くすみ）" },
    { id: "winter", label: "WINTER", jp: "冬（ホワイト・パーツ）" },
    { id: "magnet", label: "MAGNET", jp: "水光マグネット50色+" },
    { id: "office", label: "OFFICE", jp: "オフィス・シンプル" },
  ];

  const filteredDesigns =
    activeCategory === "all"
      ? DESIGNS
      : DESIGNS.filter((d) => d.category === activeCategory);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="py-24 bg-[#fff8f9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nail Art Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            最旬デザインカタログ
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            季節のトレンドから、他店と被らない50種類の水光マグネットまで。<br className="hidden sm:inline" />
            思わず指先に見惚れてしまうデザインがきっと見つかります。
          </p>
        </div>

        {/* カテゴリ切り替え（ぷっくりピルボタン） */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "jelly-button shadow-md scale-105"
                  : "bg-white text-[#5e4748] border border-pink-100 hover:bg-pink-50"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] ml-1.5 opacity-80">({cat.jp})</span>
            </button>
          ))}
        </div>

        {/* Instagram風デザイングリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredDesigns.map((design) => {
            const isLiked = likedIds[design.id];
            return (
              <div
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className="jelly-glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-white"
              >
                <div>
                  {/* 画像コンテナ (Instagramスクエア風) */}
                  <div className="relative aspect-square overflow-hidden bg-pink-100">
                    <Image
                      src={design.image}
                      alt={design.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* カテゴリバッジ */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#ff3366] shadow-sm">
                      {design.categoryLabel}
                    </div>

                    {/* いいねボタン */}
                    <button
                      onClick={(e) => toggleLike(e, design.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-transform active:scale-125"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isLiked ? "fill-[#ff3366] text-[#ff3366]" : "text-[#5e4748]"
                        }`}
                      />
                    </button>

                    {/* ホバー時オーバレイ */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
                        <Eye className="w-4 h-4" /> 詳細を見る
                      </span>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#2c181b] group-hover:text-[#ff3366] transition-colors line-clamp-1">
                      {design.title}
                    </h3>

                    {/* ハッシュタグ */}
                    <div className="flex flex-wrap gap-1">
                      {design.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] text-[#ff6584] font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* カード下部: 料金 & 施術時間 */}
                <div className="p-4 pt-0 flex items-center justify-between text-xs">
                  <span className="font-serif font-black text-sm sm:text-base text-[#ff3366]">
                    {design.price}
                  </span>
                  <span className="text-[10px] text-[#8c7374] flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-pink-400" />
                    {design.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 下部予約CTA */}
        <div className="mt-14 text-center">
          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="jelly-button inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold shadow-xl"
          >
            <Calendar className="w-4 h-4" />
            <span>HOT PEPPER Beauty で全デザイン・クーポンを見る</span>
          </a>
        </div>

      </div>

      {/* 詳細モーダル */}
      {selectedDesign && (
        <div
          onClick={() => setSelectedDesign(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-2xl border border-pink-100 relative animate-in zoom-in-95 duration-200"
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedDesign(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 写真 */}
            <div className="relative aspect-square w-full bg-pink-100">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[#ff3366]">
                {selectedDesign.categoryLabel}
              </div>
            </div>

            {/* 詳細コンテンツ */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-serif font-black text-[#2c181b]">
                  {selectedDesign.title}
                </h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-b border-pink-100 pb-3">
                  <span className="text-2xl font-serif font-black text-[#ff3366]">
                    {selectedDesign.price}
                  </span>
                  <span className="text-xs text-[#8c7374] flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#ff6584]" />
                    施術目安: {selectedDesign.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5e4748] leading-relaxed font-medium">
                {selectedDesign.description}
              </p>

              {/* 特徴ピル */}
              <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100 space-y-1 text-xs">
                <p className="font-bold text-[#2c181b] text-[11px]">✨ デザインのポイント:</p>
                <p className="text-[11px] text-[#ff3366] font-semibold">
                  • 自爪を削らないパラジェルベース使用<br />
                  • 3〜4週間浮かない高持続フィルイン対応
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jelly-button flex-1 text-center py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>このデザインで予約する</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
