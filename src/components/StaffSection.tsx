"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Award, Calendar, CheckCircle2 } from "lucide-react";
import { STAFFS, SALON_INFO } from "@/data/salonData";

export default function StaffSection() {
  return (
    <section id="staff" className="py-24 bg-gradient-to-b from-white via-pink-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#ff3366]" />
            <span>Top Nailists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            在籍ネイリスト
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            丁寧なカウンセリングと確かな技術で、理想の指先を叶えます。<br className="hidden sm:inline" />
            スタッフ指名料: <strong className="text-[#ff3366] font-bold">{SALON_INFO.nominationFee}</strong>
          </p>
        </div>

        {/* スタッフカード一覧（Instagramクリエイター風） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {STAFFS.map((staff) => (
            <div
              key={staff.id}
              className="jelly-glass rounded-[2.5rem] p-6 flex flex-col justify-between group overflow-hidden border border-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div>
                {/* 写真ポートレート */}
                <div className="relative h-80 rounded-3xl overflow-hidden mb-6 bg-pink-100">
                  <Image
                    src={staff.image}
                    alt={`${staff.name} (${staff.kana})`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* ネイル作品バッジ */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#ff3366] shadow-md flex items-center gap-1">
                    <span>💅 担当シグネチャーネイル</span>
                  </div>

                  {/* 経験年数バッジ */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-md">
                    {staff.experience}
                  </div>

                  {/* 写真下部のネームオーバーレイ */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-200">
                      {staff.role}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white drop-shadow">
                      {staff.name}
                      <span className="text-xs font-sans font-normal ml-2 text-pink-100">
                        {staff.kana}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* 得意技術タグ */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-[#a08587] uppercase tracking-wider mb-1.5">
                    SPECIALTY
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white text-[#ff3366] font-bold border border-pink-200/70 shadow-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* メッセージ */}
                <p className="text-xs text-[#5e4748] leading-relaxed mb-6 font-medium bg-white/60 p-3.5 rounded-2xl border border-pink-100/60">
                  &ldquo;{staff.message}&rdquo;
                </p>
              </div>

              {/* 指名予約ボタン */}
              <div className="pt-4 border-t border-pink-100/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[11px] text-[#8c7374] font-medium">指名料金</span>
                  <span className="font-extrabold text-[#ff3366]">{SALON_INFO.nominationFee}</span>
                </div>
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jelly-button w-full text-center py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{staff.name} を指名して予約</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
