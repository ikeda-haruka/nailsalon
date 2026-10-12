"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Calendar, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { MENS_STAFFS, MENS_SALON_INFO } from "@/data/mensSalonData";
import MensBrandLogoPlaceholder from "@/components/mens/MensBrandLogoPlaceholder";

export default function MensStaffSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="staff" className="py-24 sm:py-32 mens-bg relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>All Male Nailists ── 在籍5名</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            店員は全員男性。<br />
            気兼ねなく通えるプロフェッショナル陣
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            黒・グレー・白を基調としたミニマル＆ラグジュアリーな完全個室空間に、総勢5名の専任男性ネイリストが在籍。<br className="hidden sm:inline" />
            男性特有の爪の悩み、骨格、ライフスタイルに寄り添い、シャープで清潔感ある理想の指先へと導きます。<br className="hidden sm:inline" />
            スタッフ指名料: <strong className="text-white font-mono">{MENS_SALON_INFO.nominationFee}</strong>
          </p>
        </div>

        {/* スタッフ一覧カードグリッド（5名） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {MENS_STAFFS.map((staff) => (
            <div
              key={staff.id}
              className="mens-glass-card rounded-3xl p-5 flex flex-col justify-between group transition-all duration-300 space-y-4"
            >
              <div className="space-y-3">
                {/* 写真コンテナ（男性ネイリスト顔写真ポートレート：黒・グレー・白スタジオ統一テンポ） */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-lg">
                  {!failedImages[staff.id] ? (
                    <Image
                      src={staff.image}
                      alt={`${staff.name} (${staff.kana}) ${staff.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      onError={() => setFailedImages(prev => ({ ...prev, [staff.id]: true }))}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 contrast-[1.04]"
                    />
                  ) : (
                    <MensBrandLogoPlaceholder
                      staffName={staff.name}
                      categoryLabel={staff.role}
                      size="md"
                    />
                  )}
                  {/* 黒・グレー・白のシネマティックモノトーン統一グラデーション */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

                  {/* 歴年数バッジ */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-zinc-900/95 backdrop-blur-sm text-zinc-300 text-[10px] font-mono border border-zinc-700 shadow-sm">
                    {staff.experience}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] text-zinc-400 font-mono tracking-wider">{staff.kana}</p>
                    <h3 className="font-serif text-lg font-medium leading-tight tracking-wide drop-shadow-sm">{staff.name}</h3>
                  </div>
                </div>

                {/* 役職・得意分野 */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                    {staff.role}
                  </span>
                  <p className="text-[11px] text-zinc-300 font-light leading-snug">
                    <strong className="text-white font-medium">得意:</strong> {staff.specialty}
                  </p>
                </div>

                {/* メッセージ */}
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed pt-2 border-t border-zinc-800/80">
                  &ldquo;{staff.message}&rdquo;
                </p>

                {/* 代表スタイル */}
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[10px] text-zinc-300">
                  <span className="text-zinc-500 block">担当シグネチャースタイル:</span>
                  <span className="font-medium text-white">{staff.signatureStyle}</span>
                </div>
              </div>

              {/* 指名予約ボタン */}
              <div className="pt-2">
                <a
                  href={MENS_SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{staff.name} を指名予約</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* スタッフ注記 */}
        <div className="text-center text-xs text-zinc-500 font-light space-y-1 max-w-2xl mx-auto">
          <p>✦ サロン在籍スタッフ5名（全員男性ネイリスト）は、サロンワークに加えてメンズ専用公式オンラインショップの出荷検品業務も責任を持って担当しております。</p>
        </div>

      </div>
    </section>
  );
}
