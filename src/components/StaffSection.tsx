"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Award, Calendar, CheckCircle2 } from "lucide-react";
import { STAFFS, SALON_INFO } from "@/data/salonData";

export default function StaffSection() {
  return (
    <section id="staff" className="py-24 bg-[#fffafb] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#e8436e]" />
            <span>Our Nail Artists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            丁寧なケアと確かな技術。<br className="sm:hidden" />
            在籍ネイリスト紹介
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            お客様一人ひとりの爪のコンディションやお好みに寄り添い、最高のおもてなしをご提供します。<br className="hidden sm:inline" />
            在籍スタッフは3名。指名予約も承っております（指名料金: {SALON_INFO.nominationFee}）。
          </p>
        </div>

        {/* スタッフカード一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {STAFFS.map((staff) => (
            <div
              key={staff.id}
              className="strawberry-card p-6 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* 写真コンテナ */}
                <div className="relative h-72 rounded-2xl overflow-hidden mb-6 bg-[#ffe5ec]">
                  <Image
                    src={staff.image}
                    alt={`${staff.name} (${staff.kana})`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 経験年数バッジ */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#e8436e] shadow-sm">
                    {staff.experience}
                  </div>
                  {/* 役職バッジ */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white">
                    {staff.role}
                  </div>
                </div>

                {/* ネイリスト名 */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-serif font-bold text-[#3a2b2c]">
                      {staff.name}
                    </h3>
                    <span className="text-xs text-[#8c7374] font-sans">
                      {staff.kana}
                    </span>
                  </div>
                </div>

                {/* 得意な技術・タグ */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-[#3a2b2c] mb-1.5">
                    ✨ 得意な施術・スタイル:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.specialty.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-[#fff0f3] text-[#cc2855] font-medium border border-[#ffd1dc]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* こだわり・スタイル */}
                <p className="text-xs text-[#5e4748] leading-relaxed mb-4 bg-[#fff9fa] p-3 rounded-xl border border-[#ffe3e9]">
                  {staff.favoriteStyle}
                </p>

                {/* メッセージ */}
                <p className="text-xs text-[#8c7374] leading-relaxed mb-6 italic">
                  &ldquo;{staff.message}&rdquo;
                </p>
              </div>

              {/* 指名予約ボタン */}
              <div className="pt-4 border-t border-[#ffe3e9] space-y-2">
                <div className="flex justify-between items-center text-[11px] text-[#8c7374]">
                  <span>スタッフ指名料金</span>
                  <span className="font-bold text-[#e8436e]">{SALON_INFO.nominationFee}</span>
                </div>
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="strawberry-button w-full text-center py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{staff.name} を指名して予約する</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 指名料金のご案内 */}
        <div className="p-6 rounded-2xl bg-white border border-[#ffe3e9] shadow-sm max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-bold text-[#3a2b2c] flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4 text-[#e8436e]" />
            指名予約について
          </p>
          <p className="text-xs text-[#5e4748] leading-relaxed">
            「ニュアンスや自爪育成なら池田」「マグネットやオフィスネイルなら高橋」「季節アートやフットなら水野」など、お好みのテイストに合わせてお気軽にご指名ください。
            指名なしのフリー予約でも全スタッフが丁寧にご対応いたします。
          </p>
        </div>

      </div>
    </section>
  );
}
