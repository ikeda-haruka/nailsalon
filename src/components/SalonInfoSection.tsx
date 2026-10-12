"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar, Car, Armchair, Coffee, Dog, Baby, CreditCard, MapPin, Phone, Sparkles } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function SalonInfoSection() {
  return (
    <section id="salon-info" className="py-24 bg-gradient-to-b from-white via-lavender-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Salon Amenities & Info</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-plum-900 leading-[1.3] tracking-wide">
            サロン案内・設備
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            全席リクライニング仕様のくつろぎ空間。<br className="hidden sm:inline" />
            駐車場・カフェドリンク・ペット子連れOKなど充実のおもてなし。
          </p>
        </div>

        {/* 4つの主要スペックカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          
          {/* 営業時間・連休営業 */}
          <div className="pearl-glass rounded-3xl p-6 border border-lavender-200 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lavender-500 to-lavender-400 flex items-center justify-center text-white mb-4 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-light text-plum-400 uppercase tracking-widest mb-1 font-serif">
                OPEN HOURS
              </p>
              <h3 className="text-2xl font-serif font-normal text-plum-900 mb-1 tracking-wide">
                10:00 - 20:00
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                定休日: 不定休
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-lavender-100">
              <span className="text-[10px] font-normal text-plum-950 bg-gold-400 px-2.5 py-1 rounded-full inline-block shadow-xs font-serif tracking-wider">
                GW・お盆・SW休まず営業
              </span>
            </div>
          </div>

          {/* 設備 */}
          <div className="pearl-glass rounded-3xl p-6 border border-lavender-200 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-400 to-gold-500 flex items-center justify-center text-white mb-4 shadow-sm">
                <Armchair className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-light text-plum-400 uppercase tracking-widest mb-1 font-serif">
                SEATS & SPACE
              </p>
              <h3 className="text-2xl font-serif font-normal text-plum-900 mb-1 tracking-wide">
                ハンド2 / フット2
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                全席リクライニングチェア導入
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-lavender-100">
              <span className="text-[10px] font-light text-lavender-700 tracking-wide">
                長時間の施術でも疲れにくい設計
              </span>
            </div>
          </div>

          {/* 駐車場3台 */}
          <div className="pearl-glass rounded-3xl p-6 border border-lavender-200 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lavender-600 to-lavender-400 flex items-center justify-center text-white mb-4 shadow-sm">
                <Car className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-light text-plum-400 uppercase tracking-widest mb-1 font-serif">
                PARKING
              </p>
              <h3 className="text-2xl font-serif font-normal text-plum-900 mb-1 tracking-wide">
                専用駐車場 3台
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                敷地内無料・お車来店大歓迎
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-lavender-100">
              <span className="text-[10px] font-light text-lavender-700 tracking-wide">
                雨の日やお子様連れでも安心
              </span>
            </div>
          </div>

          {/* 同伴OK */}
          <div className="pearl-glass rounded-3xl p-6 border border-lavender-200 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-400 flex items-center justify-center text-white mb-4 shadow-sm">
                <Dog className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-light text-plum-400 uppercase tracking-widest mb-1 font-serif">
                SPECIAL CARE
              </p>
              <h3 className="text-2xl font-serif font-normal text-plum-900 mb-1 tracking-wide">
                ペット & お子様
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                同伴でのご来店大歓迎
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-lavender-100">
              <span className="text-[10px] font-light text-gold-700 tracking-wide">
                ベビーカー横付け・小型犬OK
              </span>
            </div>
          </div>

        </div>

        {/* 無料カフェドリンクバー詳細案内 */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-gold-50 via-lavender-50 to-white border border-lavender-200 shadow-lg mb-14">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gold-400 text-plum-950 flex items-center justify-center shrink-0 shadow-md">
              <Coffee className="w-7 h-7" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <span className="text-[10px] font-normal text-gold-700 uppercase tracking-widest bg-white px-3 py-1 rounded-full inline-block border border-gold-200 font-serif">
                COMPLIMENTARY DRINKS
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-plum-900 tracking-wide leading-relaxed">
                施術中にお楽しみいただける無料カフェドリンク（全6種）
              </h3>
              <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide">
                ホット/アイスコーヒー、ホット/アイスティー、緑茶、烏龍茶、ほうじ茶、カフェラテからお好きな一杯をどうぞ。
              </p>
            </div>
          </div>
        </div>

        {/* サロン基本情報テーブル ＆ アクセス */}
        <div className="pearl-glass rounded-[2.5rem] p-8 sm:p-12 border border-lavender-200 shadow-xl">
          <h3 className="text-xl font-serif font-normal text-plum-900 mb-6 flex items-center gap-2 tracking-wide">
            <MapPin className="w-5 h-5 text-lavender-600" />
            <span>サロン基本情報・アクセス</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4 font-light">
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">サロン名</span>
                <span className="text-plum-900 font-normal">{SALON_INFO.name} ({SALON_INFO.japaneseName})</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">所在地</span>
                <span className="text-plum-800">{SALON_INFO.address}</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">最寄り駅</span>
                <span className="text-plum-800">{SALON_INFO.access}</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">営業時間</span>
                <span className="text-plum-800 font-serif">{SALON_INFO.hours}</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">定休日</span>
                <span className="text-plum-800">不定休（GW・お盆・SWも休まず営業中）</span>
              </div>
            </div>

            <div className="space-y-4 font-light">
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">電話番号</span>
                <a href={`tel:${SALON_INFO.phone}`} className="text-lavender-700 hover:underline font-serif tracking-wide">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">設備</span>
                <span className="text-plum-800">{SALON_INFO.seats.details}（全席リクライニング）</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">駐車場</span>
                <span className="text-plum-800">{SALON_INFO.parking}</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">お支払い方法</span>
                <span className="text-plum-800">{SALON_INFO.payments}</span>
              </div>
              <div className="flex border-b border-lavender-100 pb-3">
                <span className="w-28 text-plum-400 shrink-0 font-serif">こだわり条件</span>
                <span className="text-plum-800">パラジェル認定 / フィルイン / ペット同伴可 / お子様同伴可</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
