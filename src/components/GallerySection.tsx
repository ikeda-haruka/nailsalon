"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Heart, Eye, X, Clock, Check, ChevronRight } from "lucide-react";
import { DESIGNS, NailDesign, SALON_INFO } from "@/data/salonData";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDesign, setSelectedDesign] = useState<NailDesign | null>(null);

  const categories = [
    { id: "all", label: "All Designs", jp: "すべて" },
    { id: "spring", label: "Spring", jp: "春（桜・タンポポ）" },
    { id: "summer", label: "Summer", jp: "夏（ひまわり・海・フット）" },
    { id: "autumn", label: "Autumn", jp: "秋（ボルドー・くすみ）" },
    { id: "winter", label: "Winter", jp: "冬（ホワイト・パーツ）" },
    { id: "magnet", label: "Magnet", jp: "水光マグネット（50種+）" },
    { id: "office", label: "Office", jp: "オフィス・シンプル" },
  ];

  const filteredDesigns =
    activeCategory === "all"
      ? DESIGNS
      : DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#fffafb] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Seasonal & Trend Nail Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            豊富なデザインと、<br className="sm:hidden" />
            50種以上のマグネットカラー
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            春夏秋冬の季節を彩る華やかなデザインから、オフィスにも溶け込む上品ネイルまで。<br className="hidden sm:inline" />
            他店では手に入らない特殊な水光マグネットや強光マグネットを豊富に取り揃えています。
          </p>
        </div>

        {/* 特殊マグネットネイル 特長ハイライトバナー */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl magnet-shimmer border border-[#ffb3c6] shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-bold tracking-wider text-[#cc2855] uppercase bg-white/70 px-2.5 py-0.5 rounded-full inline-block">
                ★ 当サロンの自慢・他店と被らない品揃え
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3a2b2c]">
                マグネットカラーは常時50種類以上をご用意
              </h3>
              <p className="text-xs text-[#5e4748] leading-relaxed">
                オフィスネイルやシンプル派の方には、大人可愛い<strong className="text-[#e8436e]">ピンクベージュ系のマグネットネイル</strong>が大人気！
                水面のようにちゅるんと揺らめく「水光マグネット」や、光の筋がシャープに輝く「強光マグネット」など、特殊なカラーを取り揃えております。
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => setActiveCategory("magnet")}
                className="strawberry-button px-6 py-3 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <span>マグネットデザインを見る</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* カテゴリフィルタータブ */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#e8436e] text-white shadow-md shadow-pink-200 scale-105"
                  : "bg-white text-[#5e4748] border border-[#ffe3e9] hover:border-[#ffb3c6] hover:bg-[#fff0f3]"
              }`}
            >
              <span className="block text-[10px] opacity-80 uppercase tracking-wider">{cat.label}</span>
              <span>{cat.jp}</span>
            </button>
          ))}
        </div>

        {/* ギャラリーグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              onClick={() => setSelectedDesign(design)}
              className="strawberry-card overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* 画像コンテナ */}
                <div className="relative h-64 overflow-hidden bg-[#ffe5ec]">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* カテゴリバッジ */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#e8436e] shadow-sm">
                    {design.categoryLabel}
                  </div>
                  {/* ホバー時オーバレイ */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-xs font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> 詳細を見る
                    </span>
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-sm font-serif font-bold text-[#3a2b2c] group-hover:text-[#e8436e] transition-colors line-clamp-1">
                    {design.title}
                  </h3>
                  <p className="text-xs text-[#8c7374] line-clamp-2 leading-relaxed">
                    {design.description}
                  </p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {design.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#fff0f3] text-[#cc2855] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* カード下部: 料金 & 施術目安時間 */}
              <div className="p-5 pt-0 border-t border-[#fff0f3] mt-3 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-base text-[#e8436e]">
                  {design.price}
                </span>
                <span className="text-[#8c7374] flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-[#ff758f]" />
                  {design.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 下部CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#5e4748] mb-4">
            「こんなデザインにしたい」「自分に似合う色が知りたい」など、持ち込みデザインやオーダーメイドもご相談ください。
          </p>
          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="strawberry-button inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>HOT PEPPER Beauty でデザインクーポンを探す</span>
          </a>
        </div>

      </div>

      {/* デザイン詳細モーダル */}
      {selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ffe3e9] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedDesign(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 写真 */}
            <div className="relative h-72 w-full bg-[#ffe5ec]">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#e8436e]">
                {selectedDesign.categoryLabel}
              </div>
            </div>

            {/* 詳細情報 */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c]">
                  {selectedDesign.title}
                </h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-b border-[#ffe3e9] pb-3">
                  <span className="text-2xl font-serif font-bold text-[#e8436e]">
                    {selectedDesign.price}
                  </span>
                  <span className="text-xs text-[#8c7374] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff758f]" />
                    施術目安: {selectedDesign.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5e4748] leading-relaxed">
                {selectedDesign.description}
              </p>

              {/* 特徴リスト */}
              {selectedDesign.features && (
                <div className="bg-[#fff9fa] p-3 rounded-xl border border-[#ffd1dc] space-y-1">
                  <p className="text-[11px] font-bold text-[#3a2b2c]">✨ デザインのポイント:</p>
                  <ul className="text-[11px] text-[#5e4748] space-y-0.5">
                    {selectedDesign.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#e8436e]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-1.5 text-[#8c7374]">
                      <Check className="w-3 h-3 text-[#e8436e]" />
                      <span>自爪を削らないパラジェルベース ＆ フィルイン対応</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* 指名予約の案内 */}
              <p className="text-[11px] text-[#8c7374]">
                ※スタッフ指名の場合は指名料金 +550円（税込）を頂戴いたします。
              </p>

              {/* 予約ボタン */}
              <div className="pt-2 flex gap-3">
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="strawberry-button flex-1 text-center py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>このデザインで予約する</span>
                </a>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="px-5 py-3 rounded-full text-xs font-medium border border-[#ffe3e9] text-[#5e4748] hover:bg-gray-50"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
