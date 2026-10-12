"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, ChevronRight, Eye } from "lucide-react";
import MensBrandLogoPlaceholder from "@/components/mens/MensBrandLogoPlaceholder";

export default function MensGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "natural" | "matte" | "magnet">("all");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const styles = [
    {
      id: "style-1",
      title: "自爪風ナチュラルマット仕上げ",
      category: "natural",
      categoryName: "ビジネス・身だしなみ",
      price: "¥8,800",
      time: "60分",
      image: "/images/mens_natural_matte.jpg",
      popular: true,
      desc: "一切のツヤを消し去り、手入れの行き届いた清潔な自爪そのものに見せるNo.1人気スタイル。名刺交換や商談でもバレずに好印象。"
    },
    {
      id: "style-2",
      title: "漆黒マットブラック × チタンライン",
      category: "matte",
      categoryName: "モード＆ストリート",
      price: "¥11,000",
      time: "75分",
      image: "/images/mens_matte_black.jpg",
      desc: "男性のスクエアな爪に映えるマットブラック。シルバーアクセサリーや時計と抜群の相性を誇る大人の自己表現スタイル。"
    },
    {
      id: "style-3",
      title: "スモーキーチタン 水光マグネット",
      category: "magnet",
      categoryName: "メンズマグネット",
      price: "¥11,000",
      time: "75分",
      image: "/images/mens_matte_black.jpg",
      desc: "黒曜石のような深みのあるブラックベースに、微粒子のシルバー光筋をシャープに集めた立体光彩アート。"
    },
    {
      id: "style-4",
      title: "自爪補強クリア＆ウォーターケア",
      category: "natural",
      categoryName: "自爪補強・割れ爪予防",
      price: "¥7,700",
      time: "50分",
      image: "/images/mens_clear_care.jpg",
      desc: "筋トレや楽器演奏、PC作業で割れやすい爪をパラジェルの弾力膜でガッチリ保護。深爪緩和にも最適。"
    }
  ];

  const filtered = selectedCategory === "all" ? styles : styles.filter(s => s.category === selectedCategory);

  return (
    <section id="catalog" className="py-24 sm:py-32 mens-bg relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Mens Style Catalog</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            男性の指先を引き締める、<br />
            モノトーン＆マットスタイル
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            清潔感を極めた素爪風から、エッジの効いたモードデザインまで。<br />
            男性ネイリストが一人ひとりの骨格・手の形に合わせてご提案します。
          </p>
        </div>

        {/* スタイル一覧グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="mens-glass-card rounded-3xl overflow-hidden group flex flex-col justify-between transition-all"
            >
              <div>
                {/* 写真コンテナ */}
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-zinc-950">
                  {!failedImages[item.id] ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 contrast-125"
                    />
                  ) : (
                    <MensBrandLogoPlaceholder
                      styleName={item.title}
                      categoryLabel={item.categoryName}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {item.popular && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white text-zinc-950 font-serif text-[10px] font-bold shadow-md">
                      人気No.1
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-baseline text-white">
                    <span className="text-[10px] font-mono text-zinc-300">{item.categoryName}</span>
                    <span className="font-serif text-sm font-semibold">{item.price}</span>
                  </div>
                </div>

                {/* 本文エリア */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-[10px] text-zinc-500 font-mono block">
                  施術目安: {item.time} （ウォーターケア込）
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
