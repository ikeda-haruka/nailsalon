"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Heart, Eye, X, Clock, Check, ChevronRight, Bookmark } from "lucide-react";
import { DESIGNS, NailDesign, SALON_INFO } from "@/data/salonData";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeColor, setActiveColor] = useState<string>("all");
  const [activePrice, setActivePrice] = useState<string>("all");
  const [selectedDesign, setSelectedDesign] = useState<NailDesign | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [showFilterBar, setShowFilterBar] = useState(false);

  const categories = [
    { id: "all", label: "ALL", jp: "すべて" },
    { id: "office", label: "OFFICE", jp: "オフィス向け" },
    { id: "simple", label: "SIMPLE", jp: "シンプル" },
    { id: "glam", label: "TREND", jp: "華やかトレンド" },
    { id: "magnet", label: "MAGNET", jp: "水光マグネット" },
    { id: "foot", label: "FOOT", jp: "フットネイル" },
  ];

  const colorOptions = [
    { id: "all", label: "全カラー" },
    { id: "lavender", label: "ラベンダー系" },
    { id: "beige", label: "ベージュ・肌馴染み" },
    { id: "gold", label: "ゴールド・光沢" },
    { id: "pink", label: "ピンク・パステル" },
    { id: "white", label: "ホワイト・シェル" },
  ];

  const priceOptions = [
    { id: "all", label: "全予算" },
    { id: "under8000", label: "〜¥7,999（シンプル）" },
    { id: "under9000", label: "¥8,000〜¥8,999（人気帯）" },
    { id: "over9000", label: "¥9,000〜（こだわりアート）" },
  ];

  const filteredDesigns = DESIGNS.filter((d) => {
    // カテゴリフィルター
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    // カラーフィルター
    if (activeColor !== "all" && d.colorTone !== activeColor) return false;
    // 価格フィルター
    if (activePrice === "under8000" && d.priceValue >= 8000) return false;
    if (activePrice === "under9000" && (d.priceValue < 8000 || d.priceValue >= 9000)) return false;
    if (activePrice === "over9000" && d.priceValue < 9000) return false;
    return true;
  });

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveColor("all");
    setActivePrice("all");
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-gradient-to-b from-white via-lavender-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Nail Art Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-900 leading-[1.35] tracking-wide">
            最旬デザインカタログ
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            写真を主役に、目的・カラー・ご予算に合わせて直感的に探せるカタログです。<br className="hidden sm:inline" />
            全メニュー自爪を削らないパラジェルベース使用。お好みのカラーへ無料で変更可能です。
          </p>
        </div>

        {/* 目的別タブ（ピルボタン） */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-normal tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-lavender-500 ${
                activeCategory === cat.id
                  ? "luxe-button shadow-md scale-102"
                  : "bg-white text-plum-700 border border-lavender-200 hover:bg-lavender-50"
              }`}
            >
              <span className="font-serif">{cat.label}</span>
              <span className="text-[10px] ml-1.5 opacity-80 font-sans">({cat.jp})</span>
            </button>
          ))}
        </div>

        {/* 絞り込みトグルボタン & 詳細条件パネル */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <button
              onClick={() => setShowFilterBar(!showFilterBar)}
              className="inline-flex items-center gap-1.5 text-lavender-700 hover:text-lavender-900 font-medium cursor-pointer tracking-wide"
            >
              <span className="text-gold-600">✦</span>
              <span>{showFilterBar ? "条件絞り込みを閉じる ▲" : "色・予算でさらに絞り込む ▼"}</span>
            </button>
            <span className="text-plum-500 font-light">
              該当: <strong className="text-plum-900 font-serif font-medium">{filteredDesigns.length}</strong> 件
            </span>
          </div>

          {showFilterBar && (
            <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-lavender-200 shadow-md space-y-3.5 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
              {/* カラー絞り込み */}
              <div>
                <p className="text-[11px] font-normal text-plum-900 mb-1.5 font-serif">カラー系統:</p>
                <div className="flex flex-wrap gap-1.5">
                  {colorOptions.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveColor(c.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-light transition-all ${
                        activeColor === c.id
                          ? "bg-lavender-600 text-white font-normal shadow-xs"
                          : "bg-lavender-50/80 text-plum-700 hover:bg-lavender-100"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 予算絞り込み */}
              <div>
                <p className="text-[11px] font-normal text-plum-900 mb-1.5 font-serif">ご予算帯:</p>
                <div className="flex flex-wrap gap-1.5">
                  {priceOptions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePrice(p.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-light transition-all ${
                        activePrice === p.id
                          ? "bg-gold-500 text-plum-950 font-normal shadow-xs"
                          : "bg-gold-50/80 text-plum-700 hover:bg-gold-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* フィルターリセット */}
              {(activeColor !== "all" || activePrice !== "all" || activeCategory !== "all") && (
                <div className="pt-1 text-right">
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-plum-500 hover:text-lavender-700 underline font-light cursor-pointer"
                  >
                    絞り込み条件をリセット
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 写真主役のデザイングリッド（Instagramスクエア風・統一比率） */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredDesigns.map((design) => {
              const isLiked = likedIds[design.id];
              return (
                <div
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className="pearl-glass rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-lavender-200/70"
                >
                  <div>
                    {/* 画像コンテナ (1:1 スクエア統一) */}
                    <div className="relative aspect-square overflow-hidden bg-lavender-100">
                      <Image
                        src={design.image}
                        alt={`パラジェルネイルデザイン ${design.title} ${design.categoryLabel}`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* カテゴリバッジ */}
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-normal text-lavender-700 shadow-2xs border border-lavender-100 font-serif tracking-wide">
                        {design.categoryLabel}
                      </div>

                      {/* いいねボタン */}
                      <button
                        onClick={(e) => toggleLike(e, design.id)}
                        aria-label="お気に入りに追加"
                        className="absolute top-2.5 right-2.5 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-transform active:scale-125 border border-lavender-100"
                      >
                        <Heart
                          className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-colors ${
                            isLiked ? "fill-lavender-600 text-lavender-600" : "text-plum-400"
                          }`}
                        />
                      </button>

                      {/* ホバー時オーバレイ */}
                      <div className="absolute inset-0 bg-plum-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <span className="px-3 py-1 rounded-full bg-white/40 backdrop-blur-md text-xs font-normal flex items-center gap-1.5 tracking-wide">
                          <Eye className="w-3.5 h-3.5" /> 詳細を見る
                        </span>
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="p-3 sm:p-4 space-y-1.5">
                      <h3 className="text-xs sm:text-sm font-serif font-normal text-plum-900 group-hover:text-lavender-700 transition-colors line-clamp-1 tracking-wide">
                        {design.title}
                      </h3>

                      {/* バッジ: 色変更可・パラジェル込 */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {design.colorChangeable && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-lavender-50 text-lavender-700 font-normal border border-lavender-200">
                            色変更無料
                          </span>
                        )}
                        {design.paragelIncluded && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-50 text-gold-700 font-normal border border-gold-200">
                            パラジェル込
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* カード下部: 料金 & 施術時間 */}
                  <div className="p-3 sm:p-4 pt-0 flex items-center justify-between text-xs border-t border-lavender-100/60 mt-1">
                    <span className="font-serif font-medium text-sm sm:text-base text-gold-700 tracking-wider">
                      {design.price}
                    </span>
                    <span className="text-[10px] text-plum-700 flex items-center gap-1 font-normal tracking-wide">
                      <Clock className="w-3 h-3 text-lavender-500" />
                      {design.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 pearl-glass rounded-3xl border border-lavender-200 max-w-md mx-auto space-y-3">
            <p className="text-xs text-plum-600 font-light">
              該当するデザインが見つかりませんでした。
            </p>
            <button
              onClick={resetFilters}
              className="luxe-button px-5 py-2 rounded-full text-xs font-medium"
            >
              条件をリセットする
            </button>
          </div>
        )}

        {/* 下部予約CTA */}
        <div className="mt-12 text-center">
          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="luxe-button inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium shadow-lg tracking-wider"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2rem] sm:rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-2xl border border-lavender-200 relative animate-in zoom-in-95 duration-200"
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedDesign(null)}
              aria-label="閉じる"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-plum-950/50 text-white flex items-center justify-center hover:bg-plum-950/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 写真 */}
            <div className="relative aspect-square w-full bg-lavender-100">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-normal text-lavender-700 border border-lavender-100 font-serif tracking-wide">
                {selectedDesign.categoryLabel}
              </div>
            </div>

            {/* 詳細コンテンツ */}
            <div className="p-5 sm:p-6 space-y-3.5">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-normal text-plum-900 tracking-wide">
                  {selectedDesign.title}
                </h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-b border-lavender-100 pb-2.5">
                  <span className="text-xl sm:text-2xl font-serif font-light text-gold-600 tracking-wider">
                    {selectedDesign.price}
                  </span>
                  <span className="text-xs text-plum-500 flex items-center gap-1 font-light">
                    <Clock className="w-3.5 h-3.5 text-lavender-500" />
                    施術目安: {selectedDesign.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide">
                {selectedDesign.description}
              </p>

              {/* 特徴バッジ群 */}
              <div className="p-3 rounded-2xl bg-lavender-50/70 border border-lavender-200 space-y-1 text-xs">
                <p className="font-normal text-plum-900 text-[11px] tracking-wide font-serif">✦ 施術仕様・安心保証:</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-lavender-800 border border-lavender-200">
                    自爪を削らないパラジェル込
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-lavender-800 border border-lavender-200">
                    高持続フィルイン（3〜4週持続）
                  </span>
                  {selectedDesign.colorChangeable && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gold-700 border border-gold-200">
                      カラー変更無料（約200色）
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-2.5">
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxe-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>このデザインで即時予約する</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
