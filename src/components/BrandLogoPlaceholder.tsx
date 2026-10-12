"use client";

import React from "react";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

interface BrandLogoPlaceholderProps {
  className?: string;
  categoryLabel?: string;
  itemCode?: string;
  productName?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogoPlaceholder({
  className = "",
  categoryLabel,
  itemCode,
  productName,
  size = "md"
}: BrandLogoPlaceholderProps) {
  const isSmall = size === "sm";

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden select-none bg-gradient-to-br from-[#FBF9FD] via-[#F4ECF8] to-[#F7F1E5] ${className}`}
    >
      {/* 背景装飾：オーロラ光彩 ＆ ゴールド幾何学枠 */}
      <div className="absolute inset-2 sm:inset-3 border border-gold-300/60 rounded-2xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-dashed border-lavender-300/50 rounded-xl pointer-events-none" />
      
      {/* コーナードット */}
      <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />
      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-60" />

      {/* 微粒子グロー */}
      <div className="absolute w-32 h-32 rounded-full bg-radial from-gold-300/25 via-lavender-300/20 to-transparent blur-xl pointer-events-none" />

      {/* 中央のロゴマーク（苺の花 ＆ 水光のきらめき） */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        {/* エンブレムバッジ */}
        <div className={`relative rounded-full border border-gold-400/80 bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center ${isSmall ? "w-10 h-10" : "w-16 h-16 sm:w-20 sm:h-20"}`}>
          {/* 花びらと星の幾何学シンボル */}
          <div className="absolute inset-1 rounded-full border border-lavender-200" />
          <div className="relative text-gold-600 flex flex-col items-center justify-center">
            <Sparkles className={`${isSmall ? "w-4 h-4" : "w-7 h-7 sm:w-8 sm:h-8"} text-gold-500 animate-pulse duration-1000`} />
          </div>
        </div>

        {/* ブランドネーム */}
        <div className="space-y-0.5">
          <p className="font-serif text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-lavender-700 font-medium">
            Paragel &amp; Magnet
          </p>
          <h5 className={`font-serif font-medium text-plum-950 tracking-wider leading-tight ${isSmall ? "text-xs" : "text-sm sm:text-base"}`}>
            Salon de Fraise
          </h5>
          <p className="text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-plum-500 uppercase font-light">
            Omotesando
          </p>
        </div>

        {/* 商品コード または カテゴリ情報（指定時） */}
        {(itemCode || categoryLabel) && !isSmall && (
          <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5">
            {itemCode && (
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/80 border border-lavender-200 text-plum-800 shadow-2xs font-semibold">
                {itemCode}
              </span>
            )}
            {categoryLabel && (
              <span className="font-serif text-[9px] px-2 py-0.5 rounded-full bg-gold-100/80 text-gold-900 border border-gold-300 font-medium">
                {categoryLabel}
              </span>
            )}
          </div>
        )}

        {/* 公式正規品バッジ */}
        {!isSmall && (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/70 border border-lavender-100 text-[8px] text-plum-600 font-light mt-1">
            <ShieldCheck className="w-2.5 h-2.5 text-gold-600 shrink-0" />
            <span>Salon Official Product</span>
          </div>
        )}
      </div>
    </div>
  );
}
