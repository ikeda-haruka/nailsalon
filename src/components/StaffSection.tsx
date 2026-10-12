"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Award, Calendar, CheckCircle2 } from "lucide-react";
import { STAFFS, SALON_INFO } from "@/data/salonData";
import BrandLogoPlaceholder from "@/components/BrandLogoPlaceholder";

export default function StaffSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="staff" className="py-20 sm:py-24 bg-gradient-to-b from-white via-lavender-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Top Nailists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-900 leading-[1.35] tracking-wide">
            在籍ネイリスト
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            サロンには総勢12名のプロネイリストが在籍（毎日2〜3名シフト勤務）。<br className="hidden sm:inline" />
            丁寧なサロン施術に加え、公式オンラインショップのネイルチップ制作・出荷梱包もスタッフが責任を持って担当しています。<br className="hidden sm:inline" />
            スタッフ指名料: <strong className="text-gold-700 font-serif font-medium tracking-wider">{SALON_INFO.nominationFee}</strong>
          </p>
        </div>

        {/* スタッフカード一覧（クリエイター風ネイル作品ポートレート） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STAFFS.map((staff) => (
            <div
              key={staff.id}
              className="pearl-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between group overflow-hidden border border-lavender-200/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* ネイル作品写真ポートレート */}
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-5 bg-lavender-100">
                  {!failedImages[staff.id] ? (
                    <Image
                      src={staff.image}
                      alt={`${staff.name} (${staff.kana}) ${staff.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={() => setFailedImages(prev => ({ ...prev, [staff.id]: true }))}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <BrandLogoPlaceholder
                      categoryLabel={staff.role}
                      productName={staff.name}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* 在籍ネイリストバッジ */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-normal text-lavender-700 shadow-2xs flex items-center gap-1.5 border border-lavender-100 font-serif tracking-wide">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    <span>在籍プロネイリスト</span>
                  </div>

                  {/* 経験年数バッジ */}
                  <div className="absolute top-3 right-3 bg-plum-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-light text-white shadow-2xs font-serif tracking-wider">
                    {staff.experience}
                  </div>

                  {/* 写真下部のネームオーバーレイ */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-light uppercase tracking-widest text-gold-300 font-serif">
                      {staff.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-white drop-shadow tracking-wide">
                      {staff.name}
                      <span className="text-xs font-serif font-light ml-2 text-lavender-200 tracking-wider">
                        {staff.kana}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* 担当シグネチャー作品の案内 */}
                <div className="mb-3.5 p-3 rounded-2xl bg-lavender-50/70 border border-lavender-100">
                  <span className="text-[9px] font-normal uppercase tracking-widest text-lavender-700 font-serif block">
                    SIGNATURE ART
                  </span>
                  <p className="text-xs font-serif font-normal text-plum-900 truncate tracking-wide mt-0.5">
                    {staff.signatureDesignTitle}
                  </p>
                </div>

                {/* 得意技術タグ */}
                <div className="mb-4">
                  <p className="text-[10px] font-light text-plum-500 uppercase tracking-widest mb-1.5 font-serif">
                    SPECIALTY
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white text-lavender-700 font-light border border-lavender-200 shadow-2xs tracking-wide"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* メッセージ */}
                <p className="text-xs text-plum-700 leading-relaxed mb-5 font-light tracking-wide bg-white/80 p-3 rounded-2xl border border-lavender-100">
                  &ldquo;{staff.message}&rdquo;
                </p>
              </div>

              {/* 指名予約ボタン */}
              <div className="pt-3.5 border-t border-lavender-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[11px] text-plum-500 font-light tracking-wide">指名料金</span>
                  <span className="font-serif font-medium text-gold-700 tracking-wider">{SALON_INFO.nominationFee}</span>
                </div>
                <div className="pt-1">
                  <a
                    href={SALON_INFO.links.hotpepper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxe-button w-full text-center py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md tracking-wider"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{staff.name} を指名してWeb即時予約</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 指名料金 ＆ 体制案内 */}
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <p className="text-xs text-plum-900 font-medium tracking-wide">
            ✦ 在籍ネイリスト総勢12名体制（代表ネイリスト池田・高橋・水野をはじめ全12名が在籍／毎日2〜3名がシフト出勤）
          </p>
          <p className="text-[11px] text-plum-600 font-light tracking-wide">
            ※毎日のサロンワークに加え、公式オンラインショップ（自爪を削らないネイルチップ等）の検品梱包・出荷業務もスタッフが兼任しております。
          </p>
          <p className="text-[11px] text-plum-500 font-light tracking-wide">
            ※スタッフをご指名いただく場合、メニュー料金に追加で指名料金（550円）を頂戴いたします。
          </p>
        </div>

      </div>
    </section>
  );
}
