"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar, Car, Armchair, Coffee, Dog, Baby, CreditCard, MapPin, Phone, Sparkles } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function SalonInfoSection() {
  return (
    <section id="salon-info" className="py-24 bg-[#fff8f9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon Amenities & Info</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            サロン案内・設備
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            全席リクライニング仕様のくつろぎ空間。<br className="hidden sm:inline" />
            駐車場・カフェドリンク・ペット子連れOKなど充実のおもてなし。
          </p>
        </div>

        {/* 4つの主要スペックカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          
          {/* 営業時間・連休営業 */}
          <div className="jelly-glass rounded-3xl p-6 border border-white flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff3366] to-[#ff85a1] flex items-center justify-center text-white mb-4 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-[#a08587] uppercase tracking-wider mb-1">
                OPEN HOURS
              </p>
              <h3 className="text-2xl font-serif font-black text-[#2c181b] mb-1">
                10:00 - 20:00
              </h3>
              <p className="text-xs text-[#5e4748] font-medium">
                定休日: 不定休
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100/80">
              <span className="text-[10px] font-black text-white bg-[#ff3366] px-2.5 py-1 rounded-full inline-block shadow-xs">
                GW・お盆・SW休まず営業
              </span>
            </div>
          </div>

          {/* 設備 */}
          <div className="jelly-glass rounded-3xl p-6 border border-white flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white mb-4 shadow-md">
                <Armchair className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-[#a08587] uppercase tracking-wider mb-1">
                SEATS & SPACE
              </p>
              <h3 className="text-2xl font-serif font-black text-[#2c181b] mb-1">
                ハンド2 / フット2
              </h3>
              <p className="text-xs text-[#5e4748] font-medium">
                全席リクライニングチェア導入
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100/80">
              <span className="text-[10px] font-bold text-[#ff3366]">
                長時間の施術でも疲れにくい設計
              </span>
            </div>
          </div>

          {/* 駐車場3台 */}
          <div className="jelly-glass rounded-3xl p-6 border border-white flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white mb-4 shadow-md">
                <Car className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-[#a08587] uppercase tracking-wider mb-1">
                PARKING
              </p>
              <h3 className="text-2xl font-serif font-black text-[#2c181b] mb-1">
                専用駐車場 3台
              </h3>
              <p className="text-xs text-[#5e4748] font-medium">
                敷地内無料・お車来店大歓迎
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100/80">
              <span className="text-[10px] font-bold text-[#ff3366]">
                雨の日やお子様連れでも安心
              </span>
            </div>
          </div>

          {/* 同伴OK */}
          <div className="jelly-glass rounded-3xl p-6 border border-white flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-400 to-pink-400 flex items-center justify-center text-white mb-4 shadow-md">
                <Dog className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-[#a08587] uppercase tracking-wider mb-1">
                WELCOME
              </p>
              <h3 className="text-2xl font-serif font-black text-[#2c181b] mb-1">
                ペット・子連れOK
              </h3>
              <p className="text-xs text-[#5e4748] font-medium">
                ベビーカー横付け対応
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100/80">
              <span className="text-[10px] font-bold text-[#ff3366]">
                愛犬・愛猫と一緒にご来店可能
              </span>
            </div>
          </div>

        </div>

        {/* カフェ風ドリンクメニューカード（全6種） */}
        <div className="jelly-glass rounded-[2.5rem] p-8 sm:p-10 border border-white shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-[#ff3366] text-xl">
                ☕️
              </div>
              <div>
                <h3 className="text-xl font-serif font-black text-[#2c181b]">
                  選べる無料カフェドリンク（全6種）
                </h3>
                <p className="text-xs text-[#8c7374] font-medium">
                  施術中にホッと一息つけるこだわりのお飲み物をご用意しております
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#ff3366] border border-pink-200">
              おかわり自由
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SALON_INFO.drinks.map((d, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/80 border border-pink-100 shadow-xs">
                <span className="text-[9px] font-black text-[#ff6584] uppercase tracking-wider block mb-0.5">
                  {d.en}
                </span>
                <h4 className="text-xs font-bold text-[#2c181b] mb-0.5">
                  {d.name}
                </h4>
                <p className="text-[10px] text-[#8c7374] font-medium">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* アクセス ＆ お電話 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 jelly-glass p-6 sm:p-8 rounded-3xl border border-white space-y-2">
            <h4 className="text-base font-serif font-black text-[#2c181b] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff3366]" />
              サロン所在地・アクセス
            </h4>
            <p className="text-xs sm:text-sm text-[#2c181b] font-bold">
              {SALON_INFO.name} ({SALON_INFO.japaneseName})
            </p>
            <p className="text-xs text-[#5e4748] font-medium">
              {SALON_INFO.address}<br />
              {SALON_INFO.access}（駐車場3台完備・お車でのご来店可能）
            </p>
          </div>

          <div className="md:col-span-4 jelly-glass p-6 sm:p-8 rounded-3xl border border-white text-center space-y-2">
            <p className="text-xs text-[#8c7374] font-bold">お電話でのご予約・当日空席確認</p>
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="text-2xl font-serif font-black text-[#ff3366] hover:scale-105 inline-block transition-transform"
            >
              {SALON_INFO.phone}
            </a>
            <p className="text-[10px] text-[#a08587]">10:00〜20:00 / 不定休（連休営業中）</p>
          </div>
        </div>

      </div>
    </section>
  );
}
