"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

interface MensBrandLogoPlaceholderProps {
  className?: string;
  categoryLabel?: string;
  itemCode?: string;
  productName?: string;
  staffName?: string;
  styleName?: string;
  size?: "sm" | "md" | "lg";
}

export default function MensBrandLogoPlaceholder({
  className = "",
  categoryLabel,
  itemCode,
  productName,
  staffName,
  styleName,
  size = "md"
}: MensBrandLogoPlaceholderProps) {
  const isSmall = size === "sm";

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden select-none bg-gradient-to-br from-[#18181b] via-[#101014] to-[#09090b] ${className}`}
    >
      {/* 背景装飾：モノトーンドットグリッド ＆ シルバーフレーム */}
      <div className="absolute inset-2 sm:inset-3 border border-zinc-700/60 rounded-2xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-dashed border-zinc-800/80 rounded-xl pointer-events-none" />
      
      {/* コーナードット */}
      <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-zinc-500 opacity-60" />
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-zinc-500 opacity-60" />
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-zinc-500 opacity-60" />
      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-zinc-500 opacity-60" />

      {/* 微粒子グロー（チタンシルバー） */}
      <div className="absolute w-36 h-36 rounded-full bg-radial from-zinc-600/20 via-zinc-800/10 to-transparent blur-xl pointer-events-none" />

      {/* 中央のロゴマーク（HOMME エンブレム） */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        {/* エンブレムバッジ */}
        <div className={`relative rounded-full border border-zinc-600 bg-zinc-900/90 shadow-xl flex items-center justify-center ${isSmall ? "w-10 h-10" : "w-16 h-16 sm:w-20 sm:h-20"}`}>
          <div className="relative w-3/4 h-3/4 flex items-center justify-center">
            <Image
              src="/images/brand_emblem_homme.svg"
              alt="Salon de Fraise HOMME"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ブランドネーム */}
        <div className="space-y-0.5">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium">
            MEN&apos;S PARAGEL SALON
          </p>
          <h5 className={`font-serif font-light text-white tracking-wider leading-tight ${isSmall ? "text-xs" : "text-sm sm:text-base"}`}>
            Salon de Fraise <span className="font-medium text-zinc-300">HOMME</span>
          </h5>
          <p className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-light">
            Omotesando
          </p>
        </div>

        {/* スタッフ名 / スタイル名 / 商品情報 */}
        {(staffName || styleName || productName || itemCode || categoryLabel) && !isSmall && (
          <div className="pt-1 flex flex-col items-center gap-1 max-w-[90%]">
            {(staffName || styleName || productName) && (
              <p className="font-serif text-xs text-zinc-200 font-medium line-clamp-1">
                {staffName || styleName || productName}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {itemCode && (
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 shadow-2xs font-semibold">
                  {itemCode}
                </span>
              )}
              {categoryLabel && (
                <span className="font-serif text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                  {categoryLabel}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 公式正規品 / 公式メンズ専用バッジ */}
        {!isSmall && (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[8px] text-zinc-400 font-light mt-1">
            <ShieldCheck className="w-2.5 h-2.5 text-zinc-300 shrink-0" />
            <span>Official Men&apos;s Salon</span>
          </div>
        )}
      </div>
    </div>
  );
}
